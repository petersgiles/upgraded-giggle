$inputPath = $PSScriptRoot
$outputPath = "$PSScriptRoot\.."

$commitments = Import-Csv "$inputPath\commitments.csv" -Encoding UTF8 -ErrorAction Stop
$criticalDateLookup = Import-Csv "$inputPath\critical-dates.csv" -Encoding UTF8 -ErrorAction Stop

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

$commitments | ConvertTo-Json | Out-File -Encoding utf8 $outputPath\commitments.json

$commitmentTypeRelationships | ConvertTo-Json | Out-File -Encoding utf8 $outputPath\commitmentCommitmentTypes.json
$portfolioRelationships | ConvertTo-Json | Out-File -Encoding utf8 $outputPath\commitmentPortfolios.json
$criticalDateRelationships | ConvertTo-Json | Out-File -Encoding utf8 $outputPath\commitmentCriticalDates.json

$commitmentTypes | ConvertTo-Json | Out-File -Encoding utf8 $outputPath\commitmentTypes.json
$portfolios | ConvertTo-Json | Out-File -Encoding utf8 $outputPath\portfolios.json
$criticalDates | ConvertTo-Json | Out-File -Encoding utf8 $outputPath\criticalDates.json
