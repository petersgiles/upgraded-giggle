Param(
    [string] $applicationName = 'commitments-reader'
)
if ($PSScriptRoot) {
    Set-Location $PSScriptRoot
}

$pageOutputPath = "..\sharepoint\deploy\SitePages\$applicationName.aspx"
$pageInputPath = "..\sharepoint\$applicationName\$applicationName.aspx"
$pageContent = Get-Content -Path $pageInputPath
$indexContent = Get-Content -Path ..\sharepoint\deploy\SiteAssets\apps\$applicationName\index.html 

function Generate-Links($content, $template, $regex, $token) {
    $links = ""
    $foundMatch = $false
    $indexContent | Select-String -Pattern $regex -AllMatches | % {
        Write-host "Found"
        $foundMatch = $true
        $_.Matches | % {
            $links += $template -f $_.Groups[1]
        }
    }
    
    # if($foundMatch)
    # {
    #     Write-Host "Replacing"
        
    # }
    return $content -replace $token, $links

}

$pageContent = Generate-Links -content $pageContent -token "{{css}}" -regex '<link href="(.*?)" rel="stylesheet"' -template ('<link runat="server" rel="stylesheet" type="text/css" href="<% $SPUrl:~site/SiteAssets/apps/' + $applicationName + '/{0} %>" />')
#$pageContent = Generate-Links -content $pageContent -token "{{scripts}}" -regex '<script type="text/javascript" src="(.*?)"' -template ('<SharePoint:ScriptLink runat="server" name="~Site/SiteAssets/apps/' + $applicationName + '/{0}"/>')
$pageContent = Generate-Links -content $pageContent -token "{{scripts}}" -regex '<script src="(.*?)"' -template ('<SharePoint:ScriptLink runat="server" name="~Site/SiteAssets/apps/' + $applicationName + '/{0}"/>')

Write-Host $pageOutputPath
$pageContent > $pageOutputPath
