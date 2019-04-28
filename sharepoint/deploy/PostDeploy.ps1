param(
    [string]$SiteUrls = $OctopusParameters["SiteUrls"],
    [string]$AppName = $OctopusParameters["AppName"],
    [switch]$jsOnly,
    [string]$LoadReferenceData = $OctopusParameters["LoadReferenceData"]
    
)

if ($PSScriptRoot) {
    Set-Location $PSScriptRoot
}


$binPath = (Get-Item "scripts").FullName
$deploySites = $SiteUrls.Split(',')

foreach ($deploySiteUrl in $deploySites) {
    Write-Host "Deploying to URL $deploySiteUrl"
    & .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SiteAssets" -DocLibName "Site Assets" -binPath $binPath -SiteUrl $deploySiteUrl -jsOnly:$jsOnly.IsPresent
    & .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SitePages" -DocLibName "Site Pages" -binPath $binPath -SiteUrl $deploySiteUrl -jsOnly:$jsOnly.IsPresent
    & .\scripts\Deploy-Lists.ps1 -saveLocation "ListDefinitions/$AppName" -binPath $binPath -SiteUrl $deploySiteUrl
    
    if ($LoadReferenceData -eq 'True') {
        & .\scripts\Import-ReferenceData.ps1 -dataFolder "ListData/$AppName" -binPath $binPath -SiteUrl $deploySiteUrl
    }
}
