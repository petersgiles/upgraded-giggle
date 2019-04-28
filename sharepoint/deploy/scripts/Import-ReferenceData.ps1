Param(
    [string] $SiteUrl = "http://vm-dev-lbs13/sites/commitments-reader",
    [string] $dataFolder = "$PSScriptRoot\..\..\commitments-reader\Data\",
    [string] $binPath = "$PSScriptRoot"
)

Add-Type -Path $binPath\Microsoft.SharePoint.Client.dll
Add-Type -Path $binPath\Microsoft.SharePoint.Client.Runtime.dll

. $PSScriptRoot\ClientContext-MixedAuth.ps1

$here = Split-Path -Parent $MyInvocation.MyCommand.Path

Get-Module Get-StringHash | Remove-Module -Force
Import-Module "$here\Get-StringHash.psm1" -Force

function Load-ReferenceData($referenceList) {
    $dataFileLocation = "$dataFolder\$referenceList.json" 
    $data = Get-Content $dataFileLocation | ConvertFrom-Json
    return $data
}

function ComputeHash-ForItem {
    param (
        $listItem,
        $fields
    )
    $stringToHash = New-Object System.Text.StringBuilder
    foreach ($field in $fields) {
        $fieldValue = $listItem[$field]
        $stringToHash.Append($fieldValue) | Out-Null
    }
    $computedStringToHash = $stringToHash.ToString()

    (Get-StringHash $computedStringToHash "MD5")
    $computedStringToHash
}

function ComputeHash-ForRow {
    param (
        $row,
        $fields
    )
    $stringToHash = New-Object System.Text.StringBuilder
    foreach ($field in $fields) {
        $fieldValue = $row."$field"
        $stringToHash.Append($fieldValue) | Out-Null
    }
    $computedStringToHash = $stringToHash.ToString()
    (Get-StringHash $computedStringToHash "MD5")
    $computedStringToHash
}

function ComputeHash-ExistingData($listItems) {
    $hashFields = @("Title")
    $listHash = @{ }
    foreach ($listItem in $listItems) {
        $hashValue, $stringHashed = ComputeHash-ForItem $listItem $hashFields
        $listHash[$hashValue] = $stringHashed
    }

    return $listHash
}

function Get-Fields($row) {
    $fieldNames = @()
    $row | Get-Member -MemberType *Property | Select-Object Name | ForEach-Object {
        $fieldName = $_.Name
        $fieldNames += $fieldName
    }
    return $fieldNames
}

function Import-ListData($context, $listImportConfig, $listData) {
    $listName = $listImportConfig.Name
    $fieldsKey = $listImportConfig.Keys
    Write-Host "Importing list data $listName -> $SiteUrl"
    
    $list = $context.Web.Lists.GetByTitle($listName)
    $query = [Microsoft.SharePoint.Client.CamlQuery]::CreateAllItemsQuery(100)
    $listItems = $list.GetItems($query)
    $context.Load($listItems)
    $context.ExecuteQuery()
    $listHash = ComputeHash-ExistingData $listItems

    if ($listData.Count -gt 0) {
        $fieldNames = Get-Fields $listData[0]
        
        foreach ($row in $listData) {
            $rowHash, $valueThatWasHashed = ComputeHash-ForRow $row $fieldsKey
            if (-not $null -eq $listHash[$rowHash]) {
                Write-Host $row, "Already exists"
                continue
            }

            Write-Host "Adding $row"
            $itemCreationInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation

            $spItem = $list.AddItem($itemCreationInfo)
            foreach ($fieldName in $fieldNames) {
                $spItem["$fieldName"] = $row."$fieldName".ToString() 
            }
            $spItem.Update() 
            $context.ExecuteQuery()
        }
    }
    
}

$context = New-Object Microsoft.SharePoint.Client.ClientContext($SiteUrl)
HandleMixedModeWebApplication $context $binPath
$listsImportConfig = Import-PowerShellDataFile "$dataFolder/Import-Config.psd1"
foreach ($listToImport in $listsImportConfig.Lists) {
    $listData = Load-ReferenceData $listToImport.Name
    Import-ListData $context $listToImport $listData
}