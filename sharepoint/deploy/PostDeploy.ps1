param(
    [string]$SiteUrl = $OctopusParameters["SiteUrl"],
    [switch]$jsOnly
)

if ($PSScriptRoot) {
    Set-Location $PSScriptRoot
}

Write-Host "Deploying to $SiteUrl"

$binPath = (Get-Item "scripts").FullName

& .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SiteAssets" -DocLibName "Site Assets" -binPath $binPath -SiteUrl $SiteUrl -jsOnly:$jsOnly.IsPresent
& .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SitePages" -DocLibName "Site Pages" -binPath $binPath -SiteUrl $SiteUrl -jsOnly:$jsOnly.IsPresent
