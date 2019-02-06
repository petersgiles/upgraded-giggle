
export const DATA_TABLE_SORT_DIRECTION_ASC = 'ASC'
export const DATA_TABLE_SORT_DIRECTION_DESC = 'DESC'
export type DATA_TABLE_SORT_DIRECTION = 'ASC' | 'DESC' | null
export interface DataTableHeader {
  id?: any
  caption: string
  type?: string
  sort?: DATA_TABLE_SORT_DIRECTION
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
