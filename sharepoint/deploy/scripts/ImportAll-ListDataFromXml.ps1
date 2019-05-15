Param(
    $SiteUrl = "http://vm-dev-lbs13/sites/commitments-reader-tim", 
    $importLocation = "$PSScriptRoot\..\..\commitments-reader\Data\",
    [string] $binPath = "$PSScriptRoot"

) 

Add-Type -Path $binPath\Microsoft.SharePoint.Client.dll
Add-Type -Path $binPath\Microsoft.SharePoint.Client.Runtime.dll
. $PSScriptRoot\ClientContext-MixedAuth.ps1

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Get-Module Get-StringHash | Remove-Module -Force
Import-Module "$here\Get-StringHash.psm1" -Force

Function Get-LookupValue($fieldData, $list, $context) {
    if (-not [System.Convert]::ToBoolean($fieldData.IsDependentLookup)) {
        if ($null -ne $fieldData.LookupList) {
            $lookupList = $context.Web.Lists.GetByTitle($fieldData.LookupList)

            $query = New-Object Microsoft.SharePoint.Client.CamlQuery

            $query.ViewXml = "<View><Query><Where><Eq><FieldRef Name='$($fieldData.LookupField)' /><Value Type='$($fieldData.LookupFieldType)'>$($fieldData.Value)</Value></Eq></Where></Query></View>"
    
            $listItems = $lookupList.GetItems($query)
            $context.Load($listItems)
            $context.ExecuteQuery()
            $listItem = $listItems[0]
            return $listItem.ID
        }
    }
}

Function Get-FieldData($fieldData, $list, $context) {
    switch ($fieldData.Type) {
        { ($_ -eq "Text") -or ($_ -eq "Number") -or ($_ -eq "Choice") -or ($_ -eq "Note") -or ($_ -eq "DateTime") } {
            return $fieldData.Value
        }
        "Lookup" {
            if ($fieldData.IsDependentLookup -eq "True") {
                return $null
            }
            #return $null
            return Get-LookupValue $fieldData $list $context
        }
    }
}


Function Populate-ListItem($context, $list, $listItem, $listItemData) {
    foreach ($fieldData in $listItemData.Field) {
        $fieldValue = Get-FieldData $fieldData $list $context
        if ($fieldValue) {
            $listItem[$fieldData.StaticName] = $fieldValue
            $listItem.Update()
        }
    }

    $listItem.Update()
    $context.ExecuteQuery()
}

function ComputeHash-ForItem ($listItem, $fields) {
    $stringToHash = New-Object System.Text.StringBuilder
    foreach ($field in $fields) {
        $fieldValue = $listItem[$field]
        $stringToHash.Append($fieldValue) | Out-Null
    }
    $computedStringToHash = $stringToHash.ToString()

    (Get-StringHash $computedStringToHash "MD5")
    $computedStringToHash
}

function ComputeHash-ForRow ($listItemData, $hashKeys) {
    $stringToHash = New-Object System.Text.StringBuilder
    $fieldsToHash = $listItemData.Field | ? { $_.StaticName -in $hashKeys }
    foreach ($fieldData in $fieldsToHash) {
        if (-not $null -eq $fieldData) {
            $fieldValue = Get-FieldData($fieldData)
            $stringToHash.Append($fieldValue) | Out-Null
        }
    }
    $computedStringToHash = $stringToHash.ToString()
    (Get-StringHash $computedStringToHash "MD5")
}

function ComputeHash-ExistingData($listItems, $hashKeys) {
    $listHash = @{ }
    foreach ($listItem in $listItems) {
        $hashValue, $stringHashed = ComputeHash-ForItem $listItem $hashKeys
        $listHash[$hashValue] = $listItem.Id
    }

    return $listHash
}

Function Populate-List($context, $importConfig, $list, $listData) {
    $query = [Microsoft.SharePoint.Client.CamlQuery]::CreateAllItemsQuery()
    $listItems = $list.GetItems($query)
    $context.Load($listItems)
    $context.ExecuteQuery()
    $hashFields = $importConfig.HashKeys

    $listHash = ComputeHash-ExistingData $listItems $hashFields
    foreach ($listItemData in $listData.ListItem) {
        $hashForRow = ComputeHash-ForRow $listItemData $hashFields
        if (-not $null -eq $listHash[$hashForRow]) {
            $listItem = $list.GetItemById($listHash[$hashForRow])
            $context.Load($listItem)
            $context.ExecuteQuery()
        }
        else {
            $itemCreationInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
            $listItem = $list.AddItem($itemCreationInfo)
        }           
        Populate-ListItem $context $list $listItem $listItemData 
    }
}

Function Populate-ListFromXml($context, $importConfig) {
    $listXmlPath = Join-Path $importLocation "$($listImport.Name).xml"

    if(-not (Test-Path $listXmlPath))
    {
        Write-Error("Import file $listXmlPath not found")
        return
    }
    $listData = [xml] (Get-Content $listXmlPath -Encoding UTF8)
    $spList = $context.Web.Lists.GetByTitle($listData.Web.List.Name)
    $context.Load($spList)
    $context.ExecuteQuery()

    Populate-List $context $importConfig $spList $listData.Web.List
}

Function Populate-ListsInWeb($context, $importLocation) {
    $listsToImport = Import-PowerShellDataFile $configurationFile
    foreach ($listImport in $listsToImport.Lists) {
        Write-Host "Importing data into list $($listImport.Name)"
        Populate-ListFromXml $context  $listImport
    }
}

$configurationFile = "$importLocation/Import-Config.psd1"

if(-not (Test-Path $configurationFile)) {
    return
}

if (-not ($MyInvocation.InvocationName -eq '.')) {
    $context = New-Object Microsoft.SharePoint.Client.ClientContext($SiteUrl)
    HandleMixedModeWebApplication $context $binPath
    Populate-ListsInWeb $context $importLocation    
}

