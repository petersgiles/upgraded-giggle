import { fromLookup } from '@df/sharepoint'
import { RelatedLink } from '../related-link.model'

export const mapRelatedLink = (item): any => ({
    id: item.ID,
    title: item.Title,
    commitment: fromLookup(item.Commitment),
    url: item.Url
  })

  export const mapRelatedLinks = (commitments): RelatedLink[] =>
    commitments.map(mapRelatedLink)
