export interface RefinerType {
    id: number | string
    groupId: number
    title: string
    selected: boolean
    count?: number
}

export interface RefinerGroup {
    id: number
    title: string
    expanded: boolean
    custom?: boolean
    children: RefinerType[]
}