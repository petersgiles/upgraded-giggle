import { CommitmentAction } from '../commitment-action.model'
import { fromLookup, idFromLookup } from '@digital-first/df-sharepoint'

export const mapCommitmentAction = (item): CommitmentAction => ({
    id: item.ID,
    title: item.Title,
    description: item.Description,
    costing: item.Costing,
    commitment: idFromLookup(item.Commitment),
    portfolio: fromLookup(item.Portfolio),
    revenueType: item.RevenueType,
})

export const mapCommitmentActions = (list) => list.map(mapCommitmentAction)
