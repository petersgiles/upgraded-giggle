export interface DataResult<T> {
    data: T
    loading: any
    error?: any
  }
export interface Contact {
    id: number
    name: string
    email?: string
    phone?: string
}

export interface Comment {
    id: number
    parent: string
    commitment: string
    text: string
    author: Contact
    created: string
}

export interface Location {
    id: number
    title: string
}

export interface Party {
    id: number
    title: string
    icon: string
    colour: string
}
export interface AnnouncementType {
    id: number
    title: string
    icon: string
    colour: string
}
export interface Portfolio {
    id: number
    title: string
    icon: string
    colour: string
}

export interface Commitment {
    id: number
    title: string,
    party: Party,
    description: string,
    cost: string,
    location: Location,
    type: AnnouncementType,
    date: any,
    announcedby: string,
    portfolio: Portfolio,
    contacts: string
    discussion?: Comment[]
}