export interface Party {
  id: number
  title: string
  icon?: string
  colour?: string
}

export interface PartysResult {
  parties: Party[]
}