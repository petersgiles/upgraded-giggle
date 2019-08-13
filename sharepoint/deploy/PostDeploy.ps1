param(
    [string]$SiteUrls,
    [string]$AppName,
    [switch]$jsOnly,
    [string]$SiteConfiguration,
    [string]$LoadReferenceData
)
$devSiteName=""
if($OctopusParameters) {
    $SiteUrls = $OctopusParameters["SiteUrls"]
    $AppName = $OctopusParameters["AppName"]
    $LoadReferenceData = $OctopusParameters["LoadReferenceData"]
    $SiteConfiguration = $OctopusParameters["SiteConfiguration"]
    $ForceSchemaUpdate = $OctopusParameters["ForceSchemaUpdate"]
}
else{
    $devSiteName=Read-Host "Please type your dev site name, e.g. Pete, Kim, Tim, Ning: "
}
if ($PSScriptRoot) {
    Set-Location $PSScriptRoot
}

$binPath = (Get-Item "scripts").FullName
$deploySites = $SiteUrls.Split(',')
Write-Host "Site Configuration : $SiteConfiguration"

if ($null -eq $ForceSchemaUpdate -or $ForceSchemaUpdate -ne "True") {
    $boolForceUpdateSchema = $false
}
else {
    $boolForceUpdateSchema = $true
}

foreach ($deploySiteUrl in $deploySites) {
    if($devSiteName -ne "")
    {
        if($devSiteName[-1] -eq '/'){
            $deploySiteUrl=$deploySiteUrl+$devSiteName
        }
        else{
            $deploySiteUrl=$deploySiteUrl+"/"+$devSiteName
        }
    }
    Write-Host "Deploying to URL $deploySiteUrl"
    & .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SiteAssets" -DocLibName "Site Assets" -binPath $binPath -SiteUrl $deploySiteUrl -jsOnly:$jsOnly.IsPresent
    & .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SitePages" -DocLibName "Site Pages" -binPath $binPath -SiteUrl $deploySiteUrl -jsOnly:$jsOnly.IsPresent
    & .\scripts\Deploy-Lists.ps1 -saveLocation "ListDefinitions/$AppName" -binPath $binPath -siteUrl $deploySiteUrl -forceListUpdate $boolForceUpdateSchema
    
    if ($LoadReferenceData -eq 'True') {
        Write-Host "Loading reference data"
        & .\scripts\ImportAll-ListDataFromXml.ps1 -importLocation "ListData/$AppName" -binPath $binPath -SiteUrl $deploySiteUrl
    }
}

if ((-not $null -eq $SiteConfiguration)) {
    & .\scripts\Set-SiteConfiguration.ps1 `
        -binPath $binPath `
        -appName $AppName `
        -configuration $SiteConfiguration
}
