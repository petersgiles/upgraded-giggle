[CmdletBinding()]
param(
    [String]$SiteURL,
    [Parameter(Mandatory = $True, Position = 4)]
    [String]$DocLibName,
    [Parameter(Mandatory = $True, Position = 5)]
    [String]$Folder,
    [Parameter(Mandatory = $False, Position = 6)]
    [Switch]$Checkin,
    [Parameter(Mandatory = $False, Position = 7)]
    [Switch]$O365,
    [string] $binPath,
    [switch] $jsOnly
)

. $PSScriptRoot\ClientContext-MixedAuth.ps1

Add-Type -Path $binPath\Microsoft.SharePoint.Client.dll
Add-Type -Path $binPath\Microsoft.SharePoint.Client.Runtime.dll

function Get-Files($Folder)
{
    $files = Get-ChildItem -Path $Folder | ? { $_.psIsContainer -eq $False -and -not $_.Name.StartsWith(".") }
    if ($jsOnly)
    {
        $files = $files | ? { $_ -match "(.js|.map)$" }
    }
    return $files
}

<#
    Upload File - This function performs the actual file upload
#>

function UploadFile($DestinationFolder, $File)
{
    #Get the datastream of the file, assign it to a variable
    $FileStream = New-Object IO.FileStream($File.FullName, [System.IO.FileMode]::Open)

    #Create an instance of a FileCreationInformation object
    $FileCreationInfo = New-Object Microsoft.SharePoint.Client.FileCreationInformation

    #Indicate whether or not you would like to overwrite files in the event of a conflict
    $FileCreationInfo.Overwrite = $True

    #Make the datastream of the file you wish to create equal to the datastream of the source file 
    $FileCreationInfo.ContentStream = $FileStream

    #Make the URL of the file equal to the $File variable which was passed to the function.  This will be equal to the source file name
    $FileCreationInfo.url = $File

    #Add the file to the destination folder which was passed to the function, using the FileCreationInformation supplied.  Assign this to a variable so that it can be loaded into context.
    $Upload = $DestinationFolder.Files.Add($FileCreationInfo)
    if ($Checkin)
    {
        $Context.Load($Upload)
        $Context.ExecuteQuery()
        if ($Upload.CheckOutType -ne "none")
        {
            $Upload.CheckIn("Checked in by Administrator", [Microsoft.SharePoint.Client.CheckinType]::MajorCheckIn)
        }
    }
    $Context.Load($Upload)
    $Context.ExecuteQuery()
}

<#
    Create Folder Function.
#>
function PopulateFolder($ListRootFolder, $FolderRelativePath)
{
    #split the FolderRelativePath passed into chunks (between the backslashes) so that we can check if the folder structure exists
    $PathChunks = $FolderRelativePath.substring(1).split("\")

    #Make sure we start with a fresh WorkingFolder for every folder passed to the function
    if ($WorkingFolder)
    {
        Remove-Variable WorkingFolder
    }

    #Start with the root folder of the list, load this into context
    $WorkingFolder = $ListRootFolder
    $Context.load($WorkingFolder)
    $Context.ExecuteQuery()

    #Load the folders of the current working folder into context
    $Context.load(($WorkingFolder.folders))
    $Context.executeQuery()

    #Set the FileSource folder equal to the absolute path of the folder that passed to the function
    $FileSource = $Folder + "\" + $FolderRelativePath
    
    #Loop through the folder chunks, ensuring that the correct folder hierarchy exists in the destination
    foreach ($Chunk in $PathChunks)
    {
        #Check to find out if a subfolder exists in the current folder that matches the patch chunk being evaluated
        if ($WorkingFolder.folders | ? { $_.name -eq $Chunk })
        {
            #Log the status to the PowerShell host window
            Write-Verbose "Folder $Chunk Exists in $($WorkingFolder.name)"

            #Since we will be evaluating other chunks in the path, set the working folder to the current folder and load this into context.
            $WorkingFolder = $WorkingFolder.folders | ? { $_.name -eq $Chunk }
            $Context.load($WorkingFolder)
            $Context.load($WorkingFolder.folders)
            $Context.ExecuteQuery()

        }
        else
        {
            #If the folder doesn't exist, Log a message indicating that the folder doesn't exist, and another message indicating that it is being created
            Write-Verbose "Folder $Chunk Does Not Exist in $($WorkingFolder.name)"
            Write-Verbose "Creating Folder $Chunk in $($WorkingFolder.name)"
            
            #Load the working folder into context and create a subfolder with a name equal to the chunk being evaluated, and load this into context
            $Context.load($WorkingFolder)
            $Context.load($WorkingFolder.folders)
            $Context.ExecuteQuery()
            $WorkingFolder = $WorkingFolder.folders.add($Chunk)
            $Context.load($WorkingFolder)
            $Context.load($WorkingFolder.folders)
            $Context.ExecuteQuery()
        }
    }

    #Folder is confirmed existing or created - now it's time to list all files in the source folder, and assign this to a variable
    $FilesInFolder = Get-Files -Folder $FileSource 
    
    #For each file in the source folder being evaluated, call the UploadFile function to upload the file to the appropriate location
    Foreach ($File in ($FilesInFolder))
    {
        #Notify the operator that the file is being uploaed to a specific location
        Write-Verbose "Uploading file $($file.Name) to $($WorkingFolder.name)"

        #Upload the file
        UploadFile $WorkingFolder $File

    }
}

<#
    Bind your context to the site collection
#>
$Context = New-Object Microsoft.SharePoint.Client.ClientContext($SiteURL)
HandleMixedModeWebApplication $Context $binPath
$List = $Context.Web.Lists.GetByTitle($DocLibName)
$Context.Load($List)
$Context.ExecuteQuery()

#Get a recursive list of all folders beneath the folder supplied by the operator
$AllFolders = Get-ChildItem -Recurse -Path $Folder | ? { $_.psIsContainer -eq $True }

#Get a list of all files that exist directly at the root of the folder supplied by the operator
$FilesInRoot = Get-Files -Folder $Folder

#Upload all files in the root of the folder supplied by the operator
Foreach ($File in ($FilesInRoot))
{
    #Notify the operator that the file is being uploaded to a specific location
    Write-Verbose "Uploading file $($File.Name) to $DocLibName"

    #Upload the file
    UploadFile($list.RootFolder) $File
}

$FolderFullPath = (Get-Item $Folder).FullName
#Loop through all folders (recursive) that exist within the folder supplied by the operator
foreach ($CurrentFolder in $AllFolders)
{
    #Set the FolderRelativePath by removing the path of the folder supplied by the operator from the fullname of the folder
    $FolderRelativePath = ($CurrentFolder.FullName).Substring($FolderFullPath.Length)
    
    #Call the PopulateFolder function for the current folder, which will ensure that the folder exists and upload all files in the folder to the appropriate location
    PopulateFolder ($list.RootFolder) $FolderRelativePath
}