if ( (Get-PSSnapin -Name Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue) -eq $null ) 
{ 
   Add-PsSnapin Microsoft.SharePoint.PowerShell 
} 
$host.Runspace.ThreadOptions = "ReuseThread"

#Open SharePoint List 
$SPServer="http://vm-dev-lbs13/sites/commitments"
$spWeb = Get-SPWeb $SPServer 
$spData = $spWeb.Lists["Electorate"]

$InvFile=".\Electorates.csv" 
# Get Data from Inventory CSV File 
$FileExists = (Test-Path $InvFile -PathType Leaf) 
if ($FileExists) { 
   "Loading $InvFile for processing..." 
   $tblData = Import-CSV $InvFile 
} else { 
   "$InvFile not found - stopping import!" 
   exit 
}

# Loop through Applications add each one to SharePoint

"Uploading data to SharePoint...."

foreach ($row in $tblData) 
{ 
   "Adding entry for " + $row."Title".ToString() + ", " + $row."State".ToString() + ", " + $row."Area".ToString() 
   $spItem = $spData.AddItem() 
   $spItem["Title"] = $row."Title".ToString() 
   $spItem["State"] = $row."State".ToString() 
   $spItem["Area"] = $row."Area".ToString() 
   $spItem.Update() 
}

"---------------" 
"Upload Complete"

# $spWeb.Dispose()