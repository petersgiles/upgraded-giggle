import { createSelector } from '@ngrx/store'

import * as fromCommitmentTheme from './commitment-theme.reducer'
import { getAllThemeTypes } from '../commitment-lookup'

export const getCommitmentThemeState = (state) =>
  state.commitmentTheme

export const getAllCommitmentThemes = createSelector(
    getCommitmentThemeState,
    fromCommitmentTheme.selectAll
)

export const getCommitmentThemePanelExpanded = createSelector(
    getCommitmentThemeState,
    state => state.expanded
)

export const getRelatedCommitmentThemes = createSelector(
  getAllCommitmentThemes,
  getAllThemeTypes,
  (related, themes) => {

    console.log('themes =>', related, themes)
const relatedTags =  (related || []).map(r => ({
  id: r.id,
  group: 'Themes',
  icon: 'widgets',
  caption: r.title,
  order: 1,
  colour: r.colour,
  selected: true
}))

const themeTags = (themes || []).map(r => ({
  id: r.id,
  group: 'Themes',
  icon: 'widgets',
  caption: r.title,
  order: 1,
  colour: r.colour,
  selected: false
})).filter(p => !relatedTags.some(s => p.id === s.id))
      // tslint:disable-next-line:no-console
      console.log(relatedTags, themeTags)
      return [...relatedTags, ...themeTags]
  }
)