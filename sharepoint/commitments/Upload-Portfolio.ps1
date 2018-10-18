if ( (Get-PSSnapin -Name Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue) -eq $null ) 
{ 
   Add-PsSnapin Microsoft.SharePoint.PowerShell 
} 
$host.Runspace.ThreadOptions = "ReuseThread"

#Open SharePoint List 
$SPServer="http://vm-dev-lbs13/sites/commitments"
$spWeb = Get-SPWeb $SPServer 
$spData = $spWeb.Lists["Portfolio"]

$InvFile=".\Portfolio.csv" 
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
   "Adding entry for " + $row."Guid".ToString() + ", " + $row."Title".ToString() + ", " + $row."Description".ToString() 
   $spItem = $spData.AddItem() 
   $spItem["Guid"] = $row."Guid".ToString() 
   $spItem["Title"] = $row."Title".ToString() 
   $spItem["Description"] = $row."Description".ToString() 
   $spItem["SortOrder"] = $row."SortOrder".ToString() 
   $spItem["Colour"] = $row."Colour".ToString() 
   $spItem["Icon"] = $row."Icon".ToString() 
   $spItem.Update() 
}

"---------------" 
"Upload Complete"

# $spWeb.Dispose()