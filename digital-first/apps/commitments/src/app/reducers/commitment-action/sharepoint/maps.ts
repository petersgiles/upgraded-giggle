import { CommitmentAction } from '../commitment-action.model'
import { fromLookup, idFromLookup } from '@digital-first/df-sharepoint'

export const mapCommitmentAction = (item): CommitmentAction => ({
    id: item.ID,
    title: item.Title,
    description: item.Description,
    commitment: idFromLookup(item.Commitment),
    portfolio: fromLookup(item.Portfolio),
})

export const mapCommitmentActions = (list) => list.map(mapCommitmentAction)
