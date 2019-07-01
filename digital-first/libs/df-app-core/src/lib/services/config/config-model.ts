export enum BookType {
  None = 'None',
  Blue = 'Blue',
  Red = 'Red'
}

export interface Logo {
  image: string
  url: string
  title?: string
}

export interface App {
  caption: string
  icon: string
  url: string
  target?: string
}

export interface Header {
  title?: string
  classification?: string
  bookType?: BookType
  bookColour?: string
  backgroundColour?: string
  logo?: Logo
  apps?: App[]
}

export interface Config {
  webId: string
  siteId: string
  header: Header
}

export const defaults: Config = {
  webId: null,
  siteId: null,
  header: {
    title: 'Unconfigured Application',
    backgroundColour: '#455a64',
    classification: 'UNCLASSIFIED',
    logo: {
      image: 'assets/crest.png',
      url: '/'
    },
    apps: []
  }
}
