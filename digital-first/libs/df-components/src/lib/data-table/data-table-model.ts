export interface DataTableHeader {
  caption: string
  type?: string
}

export interface DataTableCell {
  value: any
  type?: string
}

export interface DataTableRow {
  cells: DataTableCell[]
}

export interface DataTableConfig {
  title: string
  headings?: DataTableHeader[]
  rows?: DataTableRow[]
}