export interface FilterType {
    id
    title
}

export interface FilterGroup {
    id: number
    title: string
    visible: boolean
    custom?: boolean
    children: FilterType[]
}