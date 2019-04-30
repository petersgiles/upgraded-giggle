﻿Param(
    [string]$webUrl = "https://briefs.internal.pmc.gov.au/",
    [string]$saveLocation = "D:\Comments",
    [bool]$isInitialBlow = $true,
    [bool]$updateSubsites = $false,
    $listsToProcess,
    [string]$binPath = "C:\Program Files\Common Files\microsoft shared\Web Server Extensions\16\ISAPI"    
)

.$PSScriptRoot\ClientContext-MixedAuth.ps1
function TryGet-List([string]$title) {
    $list = $ctx.Web.Lists.GetByTitle($title)
    $ctx.Load($list)

    try {
        $ctx.ExecuteQuery()
        return $list
    }
    catch {
        # Swallow
    }    
}

function Apply-Properties([Object]$object, [Object[]]$properties) {
    $objectType = $object.GetType()
    $properties | ? { $_.Value } | % {
        $prop = $objectType.GetProperty($_.Name)
        if ($prop.CanWrite) {
            Write-Verbose "Setting property: $($_.Name)" 
            $prop.GetSetMethod().Invoke($object, $_.Value)
        }        
    }
}

function Import-ListDefinition([string]$jsonFilePath) {
    $listObject = Get-Content -LiteralPath $jsonFilePath | ConvertFrom-Json
    
    $list = TryGet-List -title $listObject.Title

    if (!$list) {
        $listCreationInfo = New-Object Microsoft.SharePoint.Client.ListCreationInformation
        $listCreationInfo.Title = $listObject.Title            
        $listCreationInfo.TemplateType = $listObject.BaseTemplate   
        $listCreationInfo.TemplateFeatureId = $listObject.TemplateFeatureId         

        $list = $ctx.Web.Lists.Add($listCreationInfo)
        $ctx.Load($list)
        $ctx.ExecuteQuery()
    }           

    $props = $listObject.PSObject.Properties | ? { $_.Name -ne "Fields" -and $_.Name -ne "EventReceivers" }
    Apply-Properties -object $list -properties $props    

    $list.Update()
    $ctx.ExecuteQuery()

    $listFields = $list.Fields
    $ctx.Load($listFields)
    $ctx.ExecuteQuery()

    $fields = $listObject.OtherFields    
    foreach ($field in $fields) {      
        $listField = $listFields | ? { $_.InternalName -eq $field.InternalName }        
        if (!$listField) {
            Write-Verbose "Adding field $($field.InternalName)"
            $listFields.AddFieldAsXml($field.SchemaXml, $false, [Microsoft.SharePoint.Client.AddFieldOptions]::DefaultValue) | Out-Null        
        }        
    }
    $list.Update()
    $ctx.ExecuteQuery()

    $listEventReceivers = $list.EventReceivers
    $ctx.Load($listEventReceivers)
    $ctx.ExecuteQuery()

    $eventReceivers = $listObject.EventReceivers
    foreach ($eventReceiver in $eventReceivers) {
        $listEventReceiver = $listEventReceivers | ? { $_.ReceiverName -eq $eventReceiver.ReceiverName }
        if (!$listEventReceiver) {
            Write-Verbose "Adding event reciever $($eventReceiver.ReceiverName)"
            $erCreationInfo = New-Object Microsoft.SharePoint.Client.EventReceiverDefinitionCreationInformation
            Apply-Properties -object $erCreationInfo -properties $eventReceiver.PSObject.Properties
            $outnull = $listEventReceivers.Add($erCreationInfo)
        }
    }
    $list.Update()
    $ctx.Load($listEventReceivers)
    $ctx.ExecuteQuery()

    #Remove extraneous receivers
    for ($i = $listEventReceivers.Count - 1; $i -gt -1; $i--) {
        $listEventReceiver = $listEventReceivers[$i]
        $eventReceiver = $eventReceivers | ? { $_.ReceiverName -eq $listEventReceiver.ReceiverName }
        if (!$eventReceiver) {
            $listEventReceiver.DeleteObject()
        }
    }

    $ctx.ExecuteQuery()
}

function Add-LookupFields([string]$jsonFilePath) {
    Write-Verbose "Adding lookup fields"
    $listObject = Get-Content -LiteralPath $jsonFilePath | ConvertFrom-Json
    $list = TryGet-List -title $listObject.Title
    if (!$list) {
        Write-Verbose "Could not find list"
        return
    }
    
    $listFields = $list.Fields
    $ctx.Load($listFields)
    $ctx.ExecuteQuery()

    $primaryLookupFields = $listObject.LookupFields | ? { !$_.PrimaryFieldId }
    foreach ($field in $primaryLookupFields) {      
        Write-Verbose "Adding: $($field.InternalName)" 
        $listField = $listFields | ? { $_.Id -eq $field.Id -or $_.InternalName -eq $field.InternalName}        
        
        if ($isInitialBlow -and $listField -and $listField.CanBeDeleted -and !$listField.Hidden) {
            Write-Verbose "Deleting Lookup field:$($field.InternalName)" 
            $listField.DeleteObject()
            $list.Update()
            $ctx.ExecuteQuery()

            $list = TryGet-List -title $listObject.Title
            $ctx.ExecuteQuery()

            Add-LookupField -ctx $ctx -list $list -field $field
        }
        elseif (!$listField) {
            Add-LookupField -ctx $ctx -list $list -field $field
        }      
    }    

    $ctx.Load($listFields)
    $ctx.ExecuteQuery()

    $secondaryLookupFields = $listObject.LookupFields | ? { $_.PrimaryFieldId }
    foreach ($field in $secondaryLookupFields) {
        Write-Verbose "Adding: $($field.InternalName)"
        $listField = $listFields | ? { $_.Id -eq $field.Id -or $_.InternalName -eq $field.InternalName}        

        $fieldName = $field.Title.Replace(":", "-")        
        if ($isInitialBlow -and $listField -and $listField.CanBeDeleted -and !$listField.Hidden) {
            Write-Verbose "Deleting Dependent Lookup field: $($field.InternalName)"          
            $listField.DeleteObject()
            $list.Update()
            $ctx.ExecuteQuery()

            $list = TryGet-List -title $listObject.Title
            $ctx.ExecuteQuery()

            Add-DependentLookupField -ctx $ctx -list $list -field $field
        }
        elseif (!$listField) {
            Add-DependentLookupField -ctx $ctx -list $list -field $field
        }   
    }
}

function Add-LookupField([Microsoft.SharePoint.Client.ClientContext]$ctx, [Microsoft.SharePoint.Client.List]$list, [Object]$field) {
    Write-Verbose "Adding Lookup field: $($field.InternalName)"
    $lookupList = $ctx.Web.Lists.GetByTitle($field.LookupList)
    $ctx.Load($lookupList)
    $ctx.ExecuteQuery()

    $field.SchemaXml = $field.SchemaXml -replace '(?<= List=\").*?(?=\")', $lookupList.Id   
    $listFields.AddFieldAsXml($field.SchemaXml, $false, [Microsoft.SharePoint.Client.AddFieldOptions]::DefaultValue) | Out-Null           

    $list.Update()
    $ctx.ExecuteQuery()  
}

function Add-DependentLookupField([Microsoft.SharePoint.Client.ClientContext]$ctx, [Object]$field) {
    Write-Verbose "Adding Dependent Lookup field: $($field.InternalName)" 
    $fieldName = $field.Title    
    $lookupFieldName = $field.Title.Split(":")[1]
    $primaryLookupFieldObject = $primaryLookupFields | ? { $_.Id -eq $field.PrimaryFieldId }
    $primaryLookupField = $listFields | ? { $_.InternalName -eq $primaryLookupFieldObject.InternalName }
    $listFields.AddDependentLookup($fieldName, $primaryLookupField, $lookupFieldName) | Out-Null

    $ctx.ExecuteQuery()    
}

function Ensure-Views([string]$jsonFilePath) {     
    $listObject = Get-Content -LiteralPath $jsonFilePath | ConvertFrom-Json
    $list = TryGet-List -title $listObject.Title
    if (!$list) {
        Write-Host "Could not find list"
        return
    }

    Write-Verbose "Adding views for:$($list.Title)" 
   
    $listViews = $list.Views
    $ctx.Load($listViews)
    $ctx.ExecuteQuery()

    $views = $listObject.Views
    $viewsThatExist = @()
    foreach ($view in $views) {
        try {
            $listView = $list.Views.GetByTitle($view.Title)
            $ctx.Load($listView)
            $ctx.ExecuteQuery()
            $viewsThatExist += $listView
        }
        catch {
            #swallow if no view exists
        }
    }
    
    foreach ($view in $views) {
        $listView = $viewsThatExist | ? { $_.Title -eq $view.Title }
        if ($listView) {
            Write-Verbose "Updating view:$($view.Title) " 
            $listView.Paged = $view.Paged
            $listView.ViewQuery = $view.ViewQuery
            $listView.RowLimit = $view.RowLimit
            $listView.DefaultView = $view.DefaultView

            $ctx.Load($listView.ViewFields)
            $ctx.ExecuteQuery()

            $listView.ViewFields.RemoveAll()
            foreach ($viewField in $view.ViewFields) {
                $listView.ViewFields.Add($viewField)
            }
            $listView.Update()
            $ctx.ExecuteQuery()
        }
        else {
            Write-Verbose "Creating view:$($view.Title)" 
            $viewCreationInfo = New-Object Microsoft.SharePoint.Client.ViewCreationInformation
            $viewCreationInfo.Paged = $view.Paged
            $viewCreationInfo.Query = $view.ViewQuery
            $viewCreationInfo.RowLimit = $view.RowLimit
            $viewCreationInfo.SetAsDefaultView = $view.DefaultView
            $viewCreationInfo.Title = $view.Title
            $viewCreationInfo.ViewFields = $view.ViewFields
            $viewCreationInfo.ViewTypeKind = $view.ViewType
            $listView = $listViews.Add($viewCreationInfo)
            $ctx.ExecuteQuery()
        }        
    }
}

function Blow([string]$webUrl, $listsToProcess) {
    $ctx = New-Object Microsoft.SharePoint.Client.ClientContext($webUrl)
    HandleMixedModeWebApplication $ctx $binPath
    
    $listsToProcess | % {
        $listName = $_
        Write-Host "Blowing $listName" 
        Import-ListDefinition -jsonFilePath (Join-Path $saveLocation "$listName.json")   
    }   
    $listsToProcess | % {
        $listName = $_
        $listFilePath = (Join-Path $saveLocation "$listName.json")   
        Add-LookupFields -jsonFilePath $listFilePath
        #Add views after lookups, to ensure all fields are available
        Ensure-Views -jsonFilePath $listFilePath
    }   
  
}


Add-Type -Path "$binPath\Microsoft.SharePoint.Client.dll"
Add-Type -Path "$binPath\Microsoft.SharePoint.Client.Runtime.dll"

Blow -webUrl $webUrl $listsToProcess