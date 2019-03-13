import { createSelector } from '@ngrx/store'

import * as fromCommitmentPackage from './commitment-package.reducer'
import { getAllPackageTypes } from '../commitment-lookup'

export const getCommitmentPackageState = state => state.commitmentPackage

export const getAllCommitmentPackages = createSelector(
    getCommitmentPackageState,
    fromCommitmentPackage.selectAll
)

export const getCommitmentPackagePanelExpanded = createSelector(
    getCommitmentPackageState,
    state => state.expanded
)

export const getRelatedCommitmentPackages = createSelector(
    getAllCommitmentPackages,
    getAllPackageTypes,
    (related, packages) => {

const relatedTags =  (related || []).map(r => ({
    id: r.id,
    group: 'Packages',
    icon: 'card_giftcard',
    caption: r.title,
    order: 1,
    colour: r.colour,
    selected: true
}))

const portfolioTags = (packages || []).map(r => ({
    id: r.id,
    group: 'Packages',
    icon: 'card_giftcard',
    caption: r.title,
    order: 1,
    colour: r.colour,
    selected: false
})).filter(p => !relatedTags.some(s => p.id === s.id))
        // tslint:disable-next-line:no-console
        console.log(relatedTags, portfolioTags)
        return [...relatedTags, ...portfolioTags]
    }
)