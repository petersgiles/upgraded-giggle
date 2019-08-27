param(
    [string]$SiteUrls,
    [string]$AppName,
    [switch]$jsOnly,
    [string]$SiteConfiguration,
    [string]$LoadReferenceData
)

if ($PSScriptRoot)
{
    Set-Location $PSScriptRoot
}

if ($OctopusParameters)
{
    $SiteUrls = $OctopusParameters["SiteUrls"]
    $AppName = $OctopusParameters["AppName"]
    $LoadReferenceData = $OctopusParameters["LoadReferenceData"]
    $SiteConfiguration = $OctopusParameters["SiteConfiguration"]
    $ForceSchemaUpdate = $OctopusParameters["ForceSchemaUpdate"]
}
else
{
    $localConfigFile = ".\devSiteName.txt"

    if (-not (Test-Path $localConfigFile))
    {
        Read-Host "Please type your dev site name, e.g. Pete, Kim, Tim, Ning: " | Set-Content -Path $localConfigFile
    }
    $baseDevUrl = $SiteUrls.TrimEnd('/')
    $SiteUrls = "$baseDevUrl/$(Get-Content $localConfigFile)"
}


$binPath = (Get-Item "scripts").FullName
$deploySiteUrls = $SiteUrls.Split(',')
Write-Verbose "Site Configuration : $SiteConfiguration"
Write-Output "SiteUrls : $SiteUrls"

if ($null -eq $ForceSchemaUpdate -or $ForceSchemaUpdate -ne "True")
{
    $boolForceUpdateSchema = $false
}
else
{
    $boolForceUpdateSchema = $true
}

foreach ($deploySiteUrl in $deploySiteUrls)
{
    Write-Output "Deploying to URL $deploySiteUrl"
    & .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SiteAssets" -DocLibName "Site Assets" -binPath $binPath -SiteUrl $deploySiteUrl -jsOnly:$jsOnly.IsPresent

    & .\scripts\BulkUploadSharePointCSOM.ps1 -Folder "SitePages" -DocLibName "Site Pages" -binPath $binPath -SiteUrl $deploySiteUrl -jsOnly:$jsOnly.IsPresent

    & .\scripts\Deploy-Lists.ps1 -saveLocation "ListDefinitions" -binPath $binPath -siteUrl $deploySiteUrl -forceListUpdate $boolForceUpdateSchema
    
    if ($LoadReferenceData -eq 'True')
    {
        Write-Output "Loading reference data"
        & .\scripts\ImportAll-ListDataFromXml.ps1 -importLocation "ListData" -binPath $binPath -SiteUrl $deploySiteUrl
    }
}

if ((-not $null -eq $SiteConfiguration))
{
    & .\scripts\Set-SiteConfiguration.ps1 `
        -binPath $binPath `
        -appName $AppName `
        -configuration $SiteConfiguration
}
