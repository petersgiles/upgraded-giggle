Param(
    [string] $webUrl = "http://vm-dev-lbs13/sites/commitments-reader",
    [string] $dataFolder = "$PSScriptRoot\..\..\ListData\commitments-reader",
    [string] $binPath = "$PSScriptRoot\.."
)

Add-Type -Path $binPath\Microsoft.SharePoint.Client.dll
Add-Type -Path $binPath\Microsoft.SharePoint.Client.Runtime.dll

. $PSScriptRoot\..\ClientContext-MixedAuth.ps1

function Load-ReferenceData($referenceList) {
    $dataFileLocation = "$dataFolder\$referenceList.json" 
    $data = Get-Content $dataFileLocation | ConvertFrom-Json
    return $data
}

function Get-Fields($row) {
    $fieldNames = @()
    $row | Get-Member -MemberType *Property | Select-Object Name | ForEach-Object {
        $fieldName = $_.Name
        Write-Host $fieldName
        $fieldNames += $fieldName
    }
    return $fieldNames
}

function Import-ListData($context, $listName, $listData) {
    Write-Host "Importing list data $listName -> $webUrl"
    
   $list = $context.Web.Lists.GetByTitle($listName)
    if ($listData.Count -gt 0) {
        $fieldNames = Get-Fields $listData[0]
    
        foreach ($row in $listData) {
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


$context = New-Object Microsoft.SharePoint.Client.ClientContext($webUrl)
# HandleMixedModeWebApplication $context $binPath

$listsToImport = @("CommitmentEventType")
foreach ($listToImport in $listsToImport) {
    Write-Host "Importing $listToImport"
    $listData = Load-ReferenceData $listToImport
    $listData
    Import-ListData $context $listToImport $listData
}