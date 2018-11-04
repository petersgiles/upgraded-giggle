param (
   [string]$webUrl ="https://lbs.cloud9.cabnet/sites/df",
   [string]$dataFile = "..\..\commitments\Data\Portfolio.csv",
   [string]$listName = "Portfolio",
   [string] $binPath = "C:\Users\atpakkianathan\source\Dsuite\DF-Client\sharepoint\deploy\scripts\"
)

Add-Type -Path $binPath\Microsoft.SharePoint.Client.dll
Add-Type -Path $binPath\Microsoft.SharePoint.Client.Runtime.dll

. $PSScriptRoot\ClientContext-MixedAuth.ps1


function Get-DataFromCsv()
{
    # Get Data from Inventory CSV File 
    $FileExists = (Test-Path $dataFile -PathType Leaf) 
    if ($FileExists) { 
       Write-Host "Loading $dataFile for processing..." 
       $tblData = Import-CSV $dataFile 
    } else { 
       Write-Host "$dataFile not found - stopping import!" 
       exit 
    }

    return $tblData
}


function Get-Fields($row)
{
    $headings = $row | Get-Member -MemberType NoteProperty | Select Name
    return $headings
}


function Import-ListData($context, $listName, $tableData, $fields)
{  Write-Host "Importing list $listName"
   $list = $context.Web.Lists.GetByTitle($listName)
   
   foreach ($row in $tableData) 
    {
       Write-Verbose "Adding entry for $($row.Title.ToString()) "
       $itemCreateInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
       $spItem = $list.AddItem($itemCreateInfo)
       foreach($field in $fields)
       {
         $spItem["$($field.Name)"] = $row."$($field.Name)".ToString() 
       }

       $spItem.Update() 
       $context.ExecuteQuery()
    }

}

$tableData = Get-DataFromCsv $dataFile
$fields = Get-Fields $tableData[0]

$context = New-Object Microsoft.SharePoint.Client.ClientContext($webUrl)
HandleMixedModeWebApplication $context $binPath
Import-ListData $context $listName $tableData $fields