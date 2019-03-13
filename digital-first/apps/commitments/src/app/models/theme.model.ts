export interface Theme {
  id: number
  title?: string
  icon?: string
  colour?: string
}

export interface ThemesResult {
  portfolios: Theme[]
}

export interface CommitmentThemesResult {
  commitmentThemes: Theme[]
}
