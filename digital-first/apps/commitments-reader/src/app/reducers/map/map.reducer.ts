import { MapActions, MapActionTypes } from './map.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { DataTableColumn } from '../../models/data-table-column'

const portfolioIcons = {
  99: `Group.png`,
  1: `AgricultureAndWaterResources.png`,
  2: `AGs.png`,
  3: `CommunicationAndTheArts.png`,
  4: `Defence.png`,
  5: `EducationAndTraining.png`,
  6: `Environment.png`,
  7: `Finance.png`,
  8: `ForeignAffairsAndTrade.png`,
  9: `Health.png`,
  10: `HomeAffairs.png`,
  11: `HumanServices.png`,
  12: `Infrastructure.png`,
  13: `Jobs.png`,
  14: `PMC.png`,
  15: `SocialServices.png`,
  16: `Treasury.png`,
  17: `IndigenousAffairs.png`,
  19: `Industry.png`,
  20: `ParliamentaryBudgetOffice.png`,
  21: `OfficeForWomen.png`
}

export interface State {
  mapPoints: []
}

export const initialState: State = {
  mapPoints: []
}

export function reducer(state = initialState, action: MapActions): State {


  switch (action.type) {
    case MapActionTypes.LoadMapPoints:
      const mapPoints = action.payload.data.mapPoints.map(m => {
        const portfolio = m.commitmentMapPoints.reduce((acc, item) => {
          const id = item.commitment.portfolioLookupId
          if (acc) {
            if (acc === id) {
              return acc
            }
            return 99
          }
          return id
        }, null)

        return {
          ...m,
          iconUrl: portfolioIcons[portfolio]
        }
      })

      return {
        ...state,
        mapPoints: mapPoints
      }

    default:
      return state
  }
}

export const mapPointState = createFeatureSelector<State>('map')

export const selectRefinedMapPointsState = createSelector(
  mapPointState,
  (state: State) => state.mapPoints
)
