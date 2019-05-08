if ($PSScriptRoot) {
    Set-Location $PSScriptRoot
}

$pageOutputPath = "..\..\sharepoint\deploy\SitePages\policybriefs.aspx"
$pageInputPath = "..\..\sharepoint\policy-briefs\policybriefs.aspx"
$pageContent = Get-Content -Path $pageInputPath
$indexContent = Get-Content -Path ..\..\sharepoint\deploy\SiteAssets\apps\policy-briefs\index.html 

function Generate-Links($content, $template, $regex, $token) {
    $links = ""
    $indexContent | Select-String -Pattern $regex -AllMatches | % {
        $_.Matches | % {
            $links += $template -f $_.Groups[1]
        }
    }

    return $content -replace $token, $links
}

$pageContent = Generate-Links -content $pageContent -token "{{css}}" -regex '<link href="(.*?)" rel="stylesheet"' -template '<link runat="server" rel="stylesheet" type="text/css" href="<% $SPUrl:~site/SiteAssets/apps/policy-briefs/{0} %>" />'
$pageContent = Generate-Links -content $pageContent -token "{{scripts}}" -regex '<script type="text/javascript" src="(.*?)"' -template '<SharePoint:ScriptLink runat="server" name="~Site/SiteAssets/apps/policy-briefs/{0}"/>'

$pageContent > $pageOutputPath
