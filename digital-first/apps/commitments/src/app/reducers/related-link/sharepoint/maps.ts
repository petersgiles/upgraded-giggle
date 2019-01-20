import { fromLookup } from '@digital-first/df-sharepoint'
import { RelatedLink } from '../related-link.model'

export const mapRelatedLink = (item): any => ({
    id: item.ID,
    title: item.Url,
    commitment: fromLookup(item.Commitment),
    url: item.Url
  })

  export const mapRelatedLinks = (commitments): RelatedLink[] =>
    commitments.map(mapRelatedLink)
