export interface RefinerType {
    id: number | string
    groupId: number | string
    title: string
    selected: boolean
    count?: number
}

export interface RefinerGroup {
    id: number | string
    title: string
    expanded: boolean
    custom?: boolean
    count?: number
    children: RefinerType[]
}