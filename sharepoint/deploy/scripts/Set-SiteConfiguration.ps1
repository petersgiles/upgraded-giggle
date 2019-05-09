Param(
    $binPath = "$PSScriptRoot",
    $appName = "commitments-reader",
    $configuration = @"
    {
        "sites":[ 
           {
                "siteUrl": "http://vm-dev-lbs13/sites/commitments-reader-tim/",
                "config": {
                    "header": {
                        "title": "Delivery Module",
                        "classification": "",
                        "bookType": "red",
                        "bookColour":"#e54430",
                        "logo": {
                           "image": "assets/crest.png",
                           "url": "/",
                           "title": "Return to home page"
                        },
                        "apps": [
                            {
                              "caption": "Dashboard",
                              "icon": "dashboard",
                              "url": "SitePages/deck.aspx/deck"
                            },  {
                              "caption": "Activity",
                              "icon": "timeline",
                              "url": "SitePages/index.aspx/recent"
                            },  {
                              "caption": "Alerts",
                              "icon": "notifications",
                              "url": "SitePages/index.aspx/notifications"
                            }, {
                              "caption": "Permissions",
                              "icon": "how_to_reg",
                              "url": "_layouts/15/user.aspx",
                              "target": "_blank"
                            },  {
                              "caption": "Admin",
                              "icon": "settings",
                              "url": "/SitePages/admin.aspx/admin"
                            }
                          ]
                    },
                    "bookType": "red"                    }
            }
        ]
    }
"@
)

. $PSScriptRoot\ClientContext-MixedAuth.ps1

Add-Type -Path "$binPath\Microsoft.SharePoint.Client.dll"
Add-Type -Path "$binPath\Microsoft.SharePoint.Client.Runtime.dll"

function UploadFile($fileName, $DestinationFolder, $fileContent, $context)
{
    $FileStream = [IO.MemoryStream]::new([Text.Encoding]::UTF8.GetBytes($fileContent))
    $FileCreationInfo = New-Object Microsoft.SharePoint.Client.FileCreationInformation
    $FileCreationInfo.Overwrite = $True
    $FileCreationInfo.ContentStream = $FileStream
    $FileCreationInfo.url = $fileName

    $Upload = $DestinationFolder.Files.Add($FileCreationInfo)
    if($Checkin)
    {
        $context.Load($Upload)
        $context.ExecuteQuery()
        if($Upload.CheckOutType -ne "none")
        {
            $Upload.CheckIn("Checked in by Administrator", [Microsoft.SharePoint.Client.CheckinType]::MajorCheckIn)
        }
    }
    $context.Load($Upload)
    $context.ExecuteQuery()
}

function Process-Web($siteConfig)
{
    Write-Host "Processing web $($siteConfig.siteUrl)"
    $context = New-Object Microsoft.SharePoint.Client.ClientContext($siteConfig.siteUrl)
    HandleMixedModeWebApplication $context $binPath
    $fileContent = ConvertTo-Json $siteConfig.config
    $fileName = "$appName.txt"
    $list = $context.Web.Lists.GetByTitle("AppConfig")
    $context.Load($list)
    $context.ExecuteQuery()
    UploadFile $fileName $list.RootFolder $fileContent $context
}

$sitesConfig = ConvertFrom-Json $configuration
foreach($sitesConfig in $sitesConfig.Sites)
{
    Process-Web $sitesConfig
}

