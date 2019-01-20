import { fromLookup } from '@digital-first/df-sharepoint'

import { RelatedCommitment } from '../related-commitment.model'

export const mapRelatedCommitment = (item): any => {
    const relatedTo = fromLookup(item.RelatedTo)
    // tslint:disable-next-line:no-console
    console.log(relatedTo)
    return {
      id: item.ID,
      title: relatedTo.title,
      commitment: fromLookup(item.Commitment),
      relatedTo: relatedTo
    }
  }

  export const mapRelatedCommitments = (commitments): RelatedCommitment[] =>
    commitments.map(mapRelatedCommitment)
