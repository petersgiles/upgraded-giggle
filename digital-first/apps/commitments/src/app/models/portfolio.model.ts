export interface Portfolio {
  id: number
  title?: string
  icon?: string
  colour?: string
  type?: string[]
  commitment?: string
  portfolio?: string
}

export interface PortfoliosResult {
  portfolios: Portfolio[]
}

export interface CommitmentPortfoliosResult {
  commitmentPortfolios: Portfolio[]
}