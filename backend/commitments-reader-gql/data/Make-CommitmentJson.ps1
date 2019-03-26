$commitments = Import-Csv "$PSScriptRoot\commitments.csv" -Encoding UTF8 -ErrorAction Stop
$criticalDateLookup = Import-Csv "$PSScriptRoot\critical-dates.csv" -Encoding UTF8 -ErrorAction Stop

# Commitment Types
$commitmentTypes = $commitments | Select-Object -Unique -Property CommitmentType | % {
    [PSCustomObject] @{
        Id = New-Guid
        Name = $_.CommitmentType
    }
}

# Portfolios
$portfolios = $commitments | Select-Object -Unique -Property Portfolio | % {
    [PSCustomObject] @{
        Id = New-Guid
        Name = $_.Portfolio
    }
}


# Critical Dates
$criticalDates = $criticalDateLookup | % {
    [PSCustomObject] @{
        Id = New-Guid
        Name = $_.Title
    }
}

# Relationships
$commitmentTypeRelationships = @()
$portfolioRelationships = @()
$criticalDateRelationships = @()

foreach ($commitment in $commitments) {
    $commitment.CriticalDate = ($criticalDateLookup | ? { $_.Id -eq $commitment.CriticalDate }).Title
    $commitment.Id = New-Guid

    $commitmentTypeRelationships += (
        [PSCustomObject] @{
            CommitmentId = $commitment.ID
            CommitmentTypeId = ($commitmentTypes | ? { $commitment.CommitmentType -eq $_.Name }).Id         
        }
    )

    $portfolioRelationships += (
        [PSCustomObject] @{
            CommitmentId = $commitment.ID
            CommitmentTypeId = ($portfolios | ? { $commitment.Portfolio -eq $_.Name }).Id
        }
    )

    $criticalDateRelationships += (
        [PSCustomObject] @{
            CommitmentId = $commitment.ID
            CriticalDateId = ($criticalDates | ? { $commitment.CriticalDate -eq $_.Name }).Id
        }
    )
    
}

$commitments | ConvertTo-Json | Out-File -Encoding utf8 $PSScriptRoot\commitments.json

$commitmentTypeRelationships | ConvertTo-Json | Out-File -Encoding utf8 $PSScriptRoot\commitmentCommitmentTypes.json
$portfolioRelationships | ConvertTo-Json | Out-File -Encoding utf8 $PSScriptRoot\commitmentPortfolios.json
$criticalDateRelationships | ConvertTo-Json | Out-File -Encoding utf8 $PSScriptRoot\commitmentCriticalDates.json

$commitmentTypes | ConvertTo-Json | Out-File -Encoding utf8 $PSScriptRoot\commitmentTypes.json
$portfolios | ConvertTo-Json | Out-File -Encoding utf8 $PSScriptRoot\portfolios.json
$criticalDates | ConvertTo-Json | Out-File -Encoding utf8 $PSScriptRoot\criticalDates.json
