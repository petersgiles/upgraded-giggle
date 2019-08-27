param (
    [string] $webUrl = "http://vm-dev-lbs13/sites/commitments/",
    [string] $binPath = "$PSScriptRoot",
    [string] $exportPath = "$PSScriptRoot\..\..\commitments\Data"
)

$listsToExport = @("AnnouncementType", "CommitmentType", "CriticalDate", "Electorate", "PoliticalParty", "Portfolio", "WhoAnnouncedType", "PackageType")

if (-not (Test-Path $exportPath))
{
    mkdir -p $exportPath
}

foreach ($listName in $listsToExport)
{
    Write-Host "Export list $listName"
    . "$PSScriptRoot\Export-ListData.ps1" -webUrl $webUrl -listName $listName -binPath $binPath -exportPath $exportPath
}