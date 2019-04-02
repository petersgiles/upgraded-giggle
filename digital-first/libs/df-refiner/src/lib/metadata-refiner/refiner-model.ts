export interface RefinerType {
    id: number | string
    title: string
    groupId?: number | string
    selected?: boolean
    count?: number
}

export interface RefinerGroup {
    id: number | string
    title: string
    expanded?: boolean
    custom?: boolean
    count?: number
    children?: RefinerType[]
}