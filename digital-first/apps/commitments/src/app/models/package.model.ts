export interface Package {
  id: number
  title?: string
  icon?: string
  colour?: string
}

export interface PackagesResult {
  portfolios: Package[]
}

export interface CommitmentPackagesResult {
  commitmentPackages: Package[]
}
