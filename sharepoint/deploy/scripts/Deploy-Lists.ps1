Param(
    [string]$siteUrl = "https://lbs.cloud9.cabnet/sites/df/",
    [string]$saveLocation = "..\commitments\ListDefinitions",
    [string] $binPath = "C:\Users\atpakkianathan\source\Dsuite\DF-Client\sharepoint\deploy\scripts\"
)

function Get-ListsToProcess() {

    $listsToProcess = @("Commitment", "CommitmentComment", "CommitmentType", "Electorate", "PoliticalParty", "Portfolio")
    return $listsToProcess
}

function Does-ListExist($context, $listName) {
    $list = $context.Web.Lists.GetByTitle($listName)
    $context.Load($list)

    try {
        $context.ExecuteQuery()
        $listExists = $true
    }
    catch {
        $listExists = $false
    }
    return $listExists
}

function Get-ListsToProcess($saveLocation) {
    $listsToProcess = @()
    Get-ChildItem $saveLocation -File |% {$listsToProcess += ("$($_.BaseName)")}
    return $listsToProcess
}

Add-Type -Path "$binPath\Microsoft.SharePoint.Client.dll"
Add-Type -Path "$binPath\Microsoft.SharePoint.Client.Runtime.dll"

Write-Host "Deploying list schemas to $siteUrl"
$context = New-Object Microsoft.SharePoint.Client.ClientContext($siteUrl)
$listsAll = Get-ListsToProcess $saveLocation
$listsToProcess = @()
foreach ($listName in $listsAll) {
    $listExists = Does-ListExist $context $listName
    Write-Verbose "List $listName already exists"
    if (-not $listExists) {
        $listsToProcess += $listName
    }
}

. $PSScriptRoot\Blow-ListDefinitions.ps1 -webUrl $siteUrl -binPath $binPath -saveLocation $saveLocation -updateSubsites $false -isInitialBlow $false  -listsToProcess $listsToProcess
