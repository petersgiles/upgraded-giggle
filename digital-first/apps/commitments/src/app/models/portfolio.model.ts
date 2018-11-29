export interface Portfolio {
  id: number
  title?: string
  icon?: string
  colour?: string
}

export interface PortfoliosResult {
  portfolios: Portfolio[]
}