param(
    [string]$SiteUrl = $OctopusParameters["SiteUrl"],
    [string]$AppName = $OctopusParameters["AppName"],
    [switch]$jsOnly
)

if ($PSScriptRoot) {
    Set-Location $PSScriptRoot
}

Write-Host "Deploying to $SiteUrl"

$binPath = (Get-Item "scripts").FullName

& .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SiteAssets" -DocLibName "Site Assets" -binPath $binPath -SiteUrl $SiteUrl -jsOnly:$jsOnly.IsPresent
& .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SitePages" -DocLibName "Site Pages" -binPath $binPath -SiteUrl $SiteUrl -jsOnly:$jsOnly.IsPresent
& .\scripts\Deploy-Lists.ps1 -saveLocation "ListDefinitions/$AppName" -binPath $binPath -SiteUrl $SiteUrl
