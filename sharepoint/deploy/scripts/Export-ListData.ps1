param (
    [string] $webUrl = "http://vm-dev-lbs13/sites/commitments/",
   [string] $listName = "PackageType",
   [string] $binPath = "$PSScriptRoot",
   [string] $exportPath = "$PSScriptRoot\..\..\commitments\Data"
)


Add-Type -Path $binPath\Microsoft.SharePoint.Client.dll
Add-Type -Path $binPath\Microsoft.SharePoint.Client.Runtime.dll

. $PSScriptRoot\ClientContext-MixedAuth.ps1


function Get-ListFields($context, $list)
{
    $contentTypes = $list.ContentTypes
    $context.Load($contentTypes)
    $context.ExecuteQuery()
    $fieldsToProcess = @()
    foreach($contentType in $contentTypes)
    {
        if($contentType.Name -eq "Item")
        {
            $fields =  $contentType.Fields
            $context.Load($fields)
            $context.ExecuteQuery()
            foreach($field in $fields)
            {
                if($field.Title -ne 'Content Type')
                {
                    Write-Verbose $field.StaticName
                    $fieldsToProcess += $field.StaticName
                    
                }
            }
        }
    }

    return $fieldsToProcess
}


function Export-ListData($context, $listName)
{
    $list = $context.web.Lists.GetByTitle($listName)
    $fieldsToProcess = Get-ListFields $context $list

    $query = [Microsoft.SharePoint.Client.CamlQuery]::CreateAllItemsQuery()
    $items = $list.GetItems($query)

    $context.Load($items)
    $context.ExecuteQuery()

    $listData = New-Object System.Collections.ArrayList
    foreach($item in $items)
    {
        $listItemData = New-Object -TypeName PSObject
        foreach($fieldName in $fieldsToProcess)
        {
            $listItemData | Add-Member -MemberType NoteProperty -Name $fieldName -Value $item[$fieldName] 
        }

        $listData.Add($listItemData) | Out-Null
    }

    return $listData

}


$context = New-Object Microsoft.SharePoint.Client.ClientContext($webUrl)
HandleMixedModeWebApplication $context $binPath

$listData = Export-ListData $context $listName
$listData | Export-Csv -NoTypeInformation -Path "$exportPath\$listName.csv"