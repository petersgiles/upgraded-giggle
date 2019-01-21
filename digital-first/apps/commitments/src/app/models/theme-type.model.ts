export interface ThemeType {
  id: number
  title: string
  icon?: string
  colour?: string
}

export interface ThemeTypesResult {
  themeTypes: ThemeType[]
}