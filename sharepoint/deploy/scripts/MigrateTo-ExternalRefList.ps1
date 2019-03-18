Param (
    [string] $webUrl = "http://vm-dev-lbs13/sites/commitments/"
)


asnp *sharepoint*


function Add-CommitmentRef($refList, $refItem, $fieldName)
{
    if($refItem -ne $null)
    {
        $refLookup = New-Object Microsoft.SharePoint.SPFieldLookupValue($refItem)
        $refId = $refLookup.LookupId
        $listItem = $refList.Items.Add()
        $listItem["Title"] = "$commitmentId $refId"
        $listItem["Commitment"] = $commitmentId
        $listItem["Primary"] = "Yes"
        $listItem[$fieldName] = $refId
        $listItem.Update()
    }
}

$web = Get-SPWeb $webUrl
$commitmentList = $web.Lists["Commitment"]
$packageList = $web.Lists["CommitmentPackage"]
$themeList = $web.Lists["CommitmentTheme"]

foreach($commitmentItem in $commitmentList.Items)
{
    $commitmentId = $commitmentItem.ID
   
    $commitmentTheme = $commitmentItem["ThemeType"]
    Add-CommitmentRef $themeList $commitmentTheme "Theme"

    $commitmentPackage = $commitmentItem["PackageType"]
    Add-CommitmentRef $packageList $commitmentPackage "Package"
}