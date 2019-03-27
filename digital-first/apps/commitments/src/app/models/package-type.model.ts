export interface PackageType {
  id: number
  title: string
  icon?: string
  colour?: string
  commitment?: string
  package?: string
}

export interface PackageTypesResult {
  packageTypes: PackageType[]
}

export interface CommitmentPackageResult {
  commitmentPackages: PackageType[]
}
