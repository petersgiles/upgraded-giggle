export interface DataTableHeader {
  caption: string
  type?: string
}

export interface DataTableCell {
  value: any
  type?: string
}

export interface DataTableRow {
  id?: string | number
  cells: DataTableCell[]
}

export interface DataTableConfig {
  title: string
  hasDeleteItemButton?: boolean
  headings?: DataTableHeader[]
  rows?: DataTableRow[]
}