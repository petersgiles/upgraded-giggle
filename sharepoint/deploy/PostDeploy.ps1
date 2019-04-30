param(
    [string]$SiteUrls = "http://vm-dev-lbs13/sites/commitments-reader-tim",
    [string]$AppName = "commitments-reader",
    [switch]$jsOnly,
    [string]$SiteConfiguration,
    [string]$LoadReferenceData
)

if($OctopusParameters) {
    $SiteUrls = $OctopusParameters["SiteUrls"]
    $AppName = $OctopusParameters["AppName"]
    $LoadReferenceData = $OctopusParameters["LoadReferenceData"]
    $SiteConfiguration = $OctopusParameters["SiteConfiguration"]
}

if ($PSScriptRoot) {
    Set-Location $PSScriptRoot
}

$binPath = (Get-Item "scripts").FullName
$deploySites = $SiteUrls.Split(',')
Write-Host "Site Configuration : $SiteConfiguration"

foreach ($deploySiteUrl in $deploySites) {
    Write-Host "Deploying to URL $deploySiteUrl"
    & .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SiteAssets" -DocLibName "Site Assets" -binPath $binPath -SiteUrl $deploySiteUrl -jsOnly:$jsOnly.IsPresent
    & .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SitePages" -DocLibName "Site Pages" -binPath $binPath -SiteUrl $deploySiteUrl -jsOnly:$jsOnly.IsPresent
    & .\scripts\Deploy-Lists.ps1 -saveLocation "ListDefinitions/$AppName" -binPath $binPath -SiteUrl $deploySiteUrl
    
    if ($LoadReferenceData -eq 'True') {
        Write-Host "Loading reference data"
        & .\scripts\ImportAll-ListDataFromXml.ps1 -importLocation "ListData/$AppName" -binPath $binPath -SiteUrl $deploySiteUrl
     #   & .\scripts\Import-ReferenceData.ps1 -dataFolder "ListData/$AppName" -binPath $binPath -SiteUrl $deploySiteUrl
    }
}

if((-not $null -eq $SiteConfiguration))
{
    & .\scripts\Set-SiteConfiguration.ps1 - "ListData/$AppName" `
    -binPath $binPath `
    -SiteUrl $configuration `
    -appName $AppName `
    -configuration $SiteConfiguration
}
