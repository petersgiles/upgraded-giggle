export interface CRMenu {
  id: number
  title: string
  expanded: boolean
  selected: boolean
  group: string
  enableSlide: boolean
  singleSelection: boolean
  children?: CRMenu[]
  cascadGroups:string[]
  groupBy: string
}

export interface SelectedRefiner {
  group: string
  ids: any[]
}
