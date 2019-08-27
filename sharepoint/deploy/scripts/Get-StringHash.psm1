<#
.SYNOPSIS
    Creates a hash for a string
.DESCRIPTION
    Given a string a string and a valid hashing algorithm. It computes and returns the hash value as a string
.EXAMPLE
    PS C:\> Get-String -Data "Hello world" `
    -HashAlgorithm "MD5"
    Returns the hashed string of "Hello world"
.INPUTS
    Data - The input string which will be hashed
    HashAlgorithm - The Hash algorithm to use to compute the hash
.OUTPUTS
   The computed hash value 
#>
function Get-StringHash
{
    param (
        [string] $data,
        [string] $hashAlgorithm
    )

    $hashResult = New-Object System.Text.StringBuilder
    $inBytes = [System.Text.Encoding]::UTF8.GetBytes($data)
    [System.Security.Cryptography.HashAlgorithm]::Create($hashAlgorithm).ComputeHash($inBytes) | ForEach-Object {
        $hashResult.Append($_.ToString("x2")) | Out-Null
    }

    return $hashResult.ToString()
    
}

Export-ModuleMember -Function Get-StringHash


