Param(
    [string]$webUrl = "http://vm-dev-lbs13/sites/commitments-reader-ning/",
    [string]$saveLocation = "$PSSCRIPTROOT\..\..\commitments-reader\ListDefinitions"
)

$binPath = "$PSScriptRoot" 
. $PSSCriptRoot\ClientContext-MixedAuth.ps1 -binPath 

$listPropertiesToSuck = @(
    'AllowContentTypes',
    'BaseTemplate',
    'BaseType',
    'ContentTypesEnabled',
    'DraftVersionVisibility',
    'EnableAttachments',
    'EnableFolderCreation',
    'EnableMinorVersions',
    'EnableModeration',
    'EnableVersioning',
    'EntityTypeName',
    'ForceCheckout',
    'HasExternalDataSource',
    'Hidden',
    'IrmEnabled',
    'IrmExpire',
    'IrmReject',
    'IsApplicationList',
    'IsCatalog',
    'IsPrivate',
    'IsSiteAssetsLibrary',
    'NoCrawl',
    'OnQuickLaunch',
    'ServerTemplateCanCreateFolders',
    'Title',
    'ValidationFormula',
    'ValidationMessage',
    'TemplateFeatureId'
)

$viewPropertiesToSuck = @(
    'Paged',
    'ViewQuery',
    'RowLimit',
    'DefaultView',
    'Title',
    'ViewFields',
    'ViewType'
)

function Save-ListDefinition([string]$listTitle) { 
    $listObject = Objectify-ListProperties -listTitle $listTitle
    if ($listObject.Hidden -or $list.IsCatalog -or $list.IsSiteAssetsLibrary) {
        return
    }

    $outputPath = [string]::Format("{0}\{1}.json", $saveLocation.TrimEnd('\'), $listTitle)
    Write-Host "Exporting the list $listTitle to $outputPath"
    ConvertTo-Json -InputObject $listObject -Depth 3 -Compress > $outputPath
}

function Objectify-Properties([Object]$inputObject, [string[]]$propNames) {    
    $props = $inputObject.GetType().GetProperties()
    if ($propNames) {
        $props = $props | Where-Object { $propNames.Contains($_.Name) }
    }
    
    $outputObject = New-Object PSObject
    $props | ForEach-Object {
        try {
            $name = $_.Name
            $value = $_.GetGetMethod().Invoke($inputObject, $null)
            $outputObject | Add-Member -MemberType NoteProperty -Name $name -Value $value    
        }
        catch {
            #Ignore non-initialised properties
        }
    }

    return $outputObject
}
Function Replace-FieldInSchema($schemaString, $propertyName, $propertyValue) {
    $schemanAsXml = [xml] $schemaString
    if($schemanAsXml.Field.HasAttribute($propertyName))
    {        
        $schemanAsXml.Field.$propertyName = $propertyValue
    
    }
    return $schemanAsXml.Field.OuterXml
    
}

function Objectify-ListProperties([string]$listTitle) {
    Write-Host "List: $listTitle"
    $list = $ctx.Web.Lists.GetByTitle($listTitle)
    $fields = $list.Fields
    $listEnumeratorventReceivers = $list.EventReceivers

    $ctx.Load($list)
    $ctx.Load($list.Views)
    $ctx.Load($fields)
    $ctx.Load($listEnumeratorventReceivers)    
    $ctx.ExecuteQuery()

    $views = @()
    foreach ($view in $list.Views) {
        $ctx.Load($view)
        $ctx.Load($view.ViewFields)
        $views += $view
    }

    $ctx.ExecuteQuery()

    #$props = $list.GetType().GetProperties() | ? { $listPropertiesToSuck.Contains($_.Name) }
    $listObject = Objectify-Properties -inputObject $list -propNames $listPropertiesToSuck
    
    $lookupFieldsCollection = @()
    $otherFieldsCollection = @()    
    $fields | ForEach-Object {                  
        #$props = $_.GetType().GetProperties()
        $fieldObject = Objectify-Properties -inputObject $_

        # Rewrite List id to List path
        $lookupListId = [Guid]::Empty
         if ($fieldObject.TypeAsString -eq "User" -or $fieldObject.TypeAsString -eq "UserMulti") {
            $fieldObject.SchemaXml = Replace-FieldInSchema $fieldObject.SchemaXml "List" "UserInfo"
            $otherFieldsCollection += $fieldObject
        }
        elseif (![string]::IsNullOrEmpty($fieldObject.LookupList) -and [Guid]::TryParse($fieldObject.LookupList.Trim("{}"), [ref]$lookupListId)) {            

            $lookupList = $ctx.Web.Lists.GetById($lookupListId)
            $ctx.Load($lookupList)
            $ctx.ExecuteQuery()            
            
            $fieldObject.LookupList = $lookupList.Title 
            $fieldObject.SchemaXml = $fieldObject.SchemaXml -replace '(?<= List=\").*?(?=\")', $lookupList.Title       

            $lookupFieldsCollection += $fieldObject
        }   
        else {
            $otherFieldsCollection += $fieldObject
        }                     
    }

    $listObject | Add-Member -MemberType NoteProperty -Name OtherFields -Value $otherFieldsCollection
    $listObject | Add-Member -MemberType NoteProperty -Name LookupFields -Value $lookupFieldsCollection
    $listObject | Add-Member -MemberType NoteProperty -Name EventReceivers -Value $listEnumeratorventReceivers

    $viewCollection = @()
    foreach ($view in $views) {
        $viewCollection += Objectify-Properties -inputObject $view -propNames $viewPropertiesToSuck
    }    

    $listObject | Add-Member -MemberType NoteProperty -Name Views -Value $viewCollection

    return $listObject
}

function Get-ExcludedLists()
{
    return @("Site Assets", "Site Pages", "Wiki", "Style Library", "Videos", "MicroFeed", "Form Templates")
}

Add-Type -Path (Join-Path $binPath "Microsoft.SharePoint.Client.dll")
Add-Type -Path (Join-Path $binPath "Microsoft.SharePoint.Client.Runtime.dll") 

$ctx = New-Object Microsoft.SharePoint.Client.ClientContext($webUrl)
HandleMixedModeWebApplication $ctx $binPath

$web = $ctx.Web
$lists = $web.Lists
$ctx.Load($web)
$ctx.Load($lists)
$ctx.ExecuteQuery()

if (!(Test-Path -Path $saveLocation)) {
    Write-Host "Save Location not found. Creating..."
    New-Item -Path $saveLocation -ItemType Directory
}

$excludeList = Get-ExcludedLists
Write-Host $excludeList

$listEnumerator = $lists.GetEnumerator()
Write-Host "Saving..."
while ($listEnumerator.MoveNext()) {
    $listTitle = $listEnumerator.Current.Title    
    if($excludeList.Contains($listTitle))
    {
        continue
    }
    Save-ListDefinition -listTitle $listTitle
}