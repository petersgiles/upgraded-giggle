import { BookType } from '../../generated/graphql';

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
  logo?: Logo
  apps?: App[]
}

export interface Config {
  webId: string,
  header: Header
}

export const defaults: Config = {
    'webId': null,
    'header': {
        'title': 'Unconfigured Application',
        'classification': 'UNCLASSIFIED',
        'logo': {
           'image': 'assets/crest.png',
           'url': '/'
        },
        'apps': []
    }
}
