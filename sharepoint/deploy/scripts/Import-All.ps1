param (
    [string] $webUrl = "https://lbs.cloud9.cabnet/sites/df/",
    [string] $binPath = "C:\Users\atpakkianathan\source\Dsuite\DF-Client\sharepoint\deploy\scripts\",
    [string] $importPath = "..\..\commitments\Data"
)

$listsToExport = @("AnnouncementType", "CommitmentType", "Electorate", "PoliticalParty", "Portfolio")

if(-not (Test-Path $exportPath))
{
    mkdir -p $exportPath
}

foreach($listName in $listsToExport)
{
    Write-Host "Importing list $listName"
    $dataFile = Join-Path $importPath "$listName.csv"
   .\Import-ListData.ps1 -webUrl $webUrl -listName $listName -binPath $binPath -dataFile $dataFile
}