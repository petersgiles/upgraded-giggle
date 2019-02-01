export interface DataTableHeader {
  caption: string
  type?: string
}

export interface DataTableCell {
  id?: any,
  value: any
  type?: string,
  data?: any
}

export interface DataTableRow {
  id?: string | number
  cells: DataTableCell[],
  data?: any
}

export interface DataTableConfig {
  title: string
  noDataMessage?: string
  headings?: DataTableHeader[]
  rows?: DataTableRow[]
}