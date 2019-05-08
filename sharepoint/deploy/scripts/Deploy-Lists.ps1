Param(
    [string]$siteUrl = "http://vm-dev-lbs13/sites/commitments-reader-tim/",
    [string]$saveLocation = "$PSScriptRoot\..\..\deck\ListDefinitions",
    [string]$binPath = "$PSScriptRoot",
    [bool]$forceListUpdate = $false
)

.$PSSCriptRoot\ClientContext-MixedAuth.ps1

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
    Get-ChildItem $saveLocation -File | % { $listsToProcess += ("$($_.BaseName)") }
    return $listsToProcess
}

Add-Type -Path "$binPath\Microsoft.SharePoint.Client.dll"
Add-Type -Path "$binPath\Microsoft.SharePoint.Client.Runtime.dll"

if(-not (Test-Path $saveLocation))
{
    return
}
Write-Host "Deploying list schemas to $siteUrl from $saveLocation"

$context = New-Object Microsoft.SharePoint.Client.ClientContext($siteUrl)
HandleMixedModeWebApplication $context $binPath

if((Test-Path $saveLocation)) {
    return
}

$listsAll = Get-ListsToProcess $saveLocation
if ($null -eq $listsAll) {
    return
}
$listsToProcess = @()
$listsToUpdate = @()
foreach ($listName in $listsAll) {
    $listExists = Does-ListExist $context $listName
    Write-Verbose "List $listName already exists"
    if (-not $listExists) {
        $listsToProcess += $listName
    }
    else {
        $listsToUpdate += $listName
    }

}

. $PSScriptRoot\Blow-ListDefinitions.ps1 -webUrl $siteUrl -binPath $binPath -saveLocation $saveLocation -updateSubsites $false -isInitialBlow $true  -listsToProcess $listsToProcess

if ($forceListUpdate) {
    . $PSScriptRoot\Blow-ListDefinitions.ps1 -webUrl $siteUrl -binPath $binPath -saveLocation $saveLocation -updateSubsites $false -isInitialBlow $false  -listsToProcess $listsToUpdate
}
