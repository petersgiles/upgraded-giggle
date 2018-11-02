﻿param (
    [string] $webUrl = "http://vm-dev-lbs13/sites/commitments/",
    [string] $binPath = "C:\Users\atpakkianathan\source\Dsuite\DF-Client\sharepoint\deploy\scripts\",
    [string] $exportPath = "..\..\commitments\Data"
)

$listsToExport = @("AnnouncementType", "CommitmentType", "Electorate", "PoliticalParty", "Portfolio")

if(-not (Test-Path $exportPath))
{
    mkdir -p $exportPath
}

foreach($listName in $listsToExport)
{
    Write-Host "Export list $listName"
   .\Export-ListData.ps1 -webUrl $webUrl -listName $listName -binPath $binPath -exportPath $exportPath
}