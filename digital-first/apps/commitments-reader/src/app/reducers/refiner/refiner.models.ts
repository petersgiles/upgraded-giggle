export interface CRMenu {
  id: number
  title: string
  expanded: boolean
  selected: boolean
  groupId: number
  group: string,
  children?: CRMenu[]
}
