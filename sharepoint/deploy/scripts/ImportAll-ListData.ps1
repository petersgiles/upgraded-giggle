param (
    [string] $webUrl = "https://lbs.cloud9.cabnet/sites/df/",
    [string] $binPath = "C:\Users\atpakkianathan\source\Dsuite\DF-Client\sharepoint\deploy\scripts\",
    [string] $importPath = "..\..\commitments\Data"
)

$listsToImport = @("AnnouncementType", "CommitmentType", "CriticalDate", "Electorate", "PoliticalParty", "Portfolio", "WhoAnnouncedType" )

foreach($listName in $listsToImport)
{
    Write-Host "Importing list $listName"
    $dataFile = Join-Path $importPath "$listName.csv"
   . "$PSScriptRoot\Import-ListData.ps1" -webUrl $webUrl -listName $listName -binPath $binPath -dataFile $dataFile
}