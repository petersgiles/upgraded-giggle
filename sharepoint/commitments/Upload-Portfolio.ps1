param (
   [string]$webUrl ="http://vm-dev-lbs13/sites/commitments",
   [string]$dataFile = ".\Portfolios.csv"
)

if ( (Get-PSSnapin -Name Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue) -eq $null ) 
{ 
   Add-PsSnapin Microsoft.SharePoint.PowerShell 
} 
$host.Runspace.ThreadOptions = "ReuseThread"

#Open SharePoint List 
$spWeb = Get-SPWeb  $webUrl
$spData = $spWeb.Lists["Portfolio"]


# Get Data from Inventory CSV File 
$FileExists = (Test-Path $dataFile -PathType Leaf) 
if ($FileExists) { 
   "Loading $dataFile for processing..." 
   $tblData = Import-CSV $dataFile 
} else { 
   "$dataFile not found - stopping import!" 
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