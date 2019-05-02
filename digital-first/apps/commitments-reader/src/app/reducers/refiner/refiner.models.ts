export interface DataTableColumn {
  prop: string
  name: string
}

export interface SelectedRefinerItem {
  groupId: number
  itemId: number
}

export interface CRMenu {
  id: number
  title: string
  expanded: boolean
  selected: boolean
  groupId: number
  children?: CRMenu[]
}
