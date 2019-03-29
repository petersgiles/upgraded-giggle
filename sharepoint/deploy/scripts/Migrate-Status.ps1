Param(
    [string] $webUrl = "https://lbs.cloud9.cabnet/sites/commitments/",
    [string] $csvPath = "D:\Temp\CommitmentListExport.csv",
    [string] $operation = "Backup"  
    #[string] $operation = "Restore"  
)

Add-PSSnapIn *sharepoint*
function Backup-Status($commitmentList)
{
    $commitmentExport = @()
    foreach($commitmentItem in $commitmentList.Items)
    {
        $commitmentObj =  New-Object -TypeName PSObject -Property @{
        "Title" = $commitmentItem["Title"]
        "ID" = $commitmentItem["ID"]
        "Status" = $commitmentItem["Status"]
        }
        $commitmentExport += $commitmentObj
        Write-Host "Backing up item $commitmentObj"
    }

    $commitmentExport | Export-Csv -NoTypeInformation -NoClobber $csvPath 
}


function Restore-Status($commitmentList)
{
    $commitmentCsv = Import-Csv -LiteralPath $csvPath 
    foreach($commitment in $commitmentCsv)
    {   
        if($null -ne $commitment.Status -and $commitment.Status -ne "")
        {
            Write-Host "Restoring item $commitment"
            $commitmentItem = $commitmentList.GetItemById($commitment.ID)
            $commitmentItem["Status"] = $commitment.Status
            $commitmentItem.Update()
        }
    }
}


$web = Get-SPWeb $webUrl
$commitmentList = $web.Lists["Commitment"]

switch($operation) 
{
    "Backup" { 
        Write-Host "Backing up" 
        Backup-Status $commitmentList 
    }

    "Restore" {
        Write-Host "Restoring"
        Restore-Status $commitmentList 
    }
}
