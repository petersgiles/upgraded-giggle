param(
    [string]$SiteUrl,
    [string]$AppName
)

if ($PSScriptRoot) {
    Set-Location $PSScriptRoot
}

Write-Output "Params $PSScriptRoot $SiteUrl $AppName " 

$binPath = (Get-Item "scripts").FullName

Write-Host "Deploying to URL $SiteUrl"
& .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SiteAssets" -DocLibName "Site Assets" -binPath $binPath -SiteUrl $SiteUrl 
& .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SitePages" -DocLibName "Site Pages" -binPath $binPath -SiteUrl $SiteUrl 
