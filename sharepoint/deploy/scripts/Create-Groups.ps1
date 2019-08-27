Param(
    [string]$siteUrl = "http://vm-dev-lbs13/sites/commitments-reader-tim/",
    [string]$configFile = "$PSScriptRoot\..\..\commitments-reader\Data\Groups-Config.psd1",
    [string]$binPath = "$PSScriptRoot"
)

.$PSSCriptRoot\ClientContext-MixedAuth.ps1

Add-Type -Path "$binPath\Microsoft.SharePoint.Client.dll"
Add-Type -Path "$binPath\Microsoft.SharePoint.Client.Runtime.dll"

function Create-Group
{
    param (
        $groupName,
        $groupDescription,
        $permissionLevel
    )
    $groups = $context.Web.SiteGroups
    $context.load($groups)
    $context.ExecuteQuery()
     
    $groupNames = $groups | Select -ExpandProperty Title
     
    if ($groupNames -notcontains $groupName)
    {
        $groupCreationInfo = New-Object Microsoft.SharePoint.Client.GroupCreationInformation
        $groupCreationInfo.Title = $groupName
        $groupCreationInfo.Description = $groupDescription
        $group = $context.Web.SiteGroups.Add($groupCreationInfo) 
        
        # Set Permissions
        $roleDefinition = $context.web.RoleDefinitions.GetByName($permissionLevel)
        $roleDefinitionBind = New-Object Microsoft.SharePoint.Client.RoleDefinitionBindingCollection($context)
        $roleDefinitionBind.Add($roleDefinition)
        $context.Load($context.Web.RoleAssignments.Add($group, $roleDefinitionBind))
        $context.ExecuteQuery() 
    }
}

function Create-Groups($context, $groupConfigs)
{
    foreach ($groupConfig in $groupConfigs.Groups)
    {
        Create-Group $groupConfig.GroupName $groupConfig.GroupDescription $groupConfig.PermissionLevel
    }
}

Write-Host "Deploying groups to $siteUrl"

$context = New-Object Microsoft.SharePoint.Client.ClientContext($siteUrl)
HandleMixedModeWebApplication $context $binPath


$groupConfig = Import-PowerShellDataFile $configFile

Create-Groups $context $groupConfig 