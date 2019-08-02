export interface CRMenu {
  id: number
  title: string
  expanded: boolean
  selected: boolean
  group: string
  enableSlide: boolean
  children?: CRMenu[]
}
