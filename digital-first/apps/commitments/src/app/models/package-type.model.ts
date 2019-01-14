export interface PackageType {
  id: number
  title: string
  icon?: string
  colour?: string
}

export interface PackageTypesResult {
  packageTypes: PackageType[]
}