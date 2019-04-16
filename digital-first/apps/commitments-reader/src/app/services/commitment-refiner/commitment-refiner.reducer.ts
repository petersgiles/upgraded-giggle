import { Injectable } from '@angular/core'
import {
  CommitmentPartsFragment,
  CommitmentMapPointGraph
} from '../../generated/graphql'
import { RefinerType, RefinerGroup } from '@digital-first/df-refiner'
import { environment } from '../../../environments/environment'
import {
  RefinerActionTypes,
  RefinerServiceActions
} from './commitment-refiner.actions'

const DEBUG = !environment.production

export interface DataTableColumn {
  prop: string
  name: string
}

export interface SelectedRefinerItem {
  groupId: number
  itemId: number
}

export interface RefinerState {
  selectedRefiners: SelectedRefinerItem[]
  expandedRefinerGroups: (string | number)[]
  textRefiner: string
  sortColumn: string
  sortDirection: string
  refinerGroups: RefinerGroup[]
  selectedMapPoint: any
  mapPoints: any[]
  commitmentMapPoints: CommitmentMapPointGraph[]
  mapPointsCommitments: CommitmentPartsFragment[]
  commitments: CommitmentPartsFragment[]
  columns: DataTableColumn[]
}
const sortArray: string[] = [null, 'ASC', 'DESC']

export const initialState: RefinerState = {
  refinerGroups: [],
  expandedRefinerGroups: [],
  selectedRefiners: [],
  textRefiner: null,
  sortColumn: null,
  sortDirection: null,
  selectedMapPoint: [],
  mapPoints: [],
  commitmentMapPoints: [],
  mapPointsCommitments: [],
  commitments: [],
  columns: [
    { prop: 'id', name: 'Id' },
    { prop: 'title', name: 'Title' },
    { prop: 'portfolio', name: 'Responsible Portfolio' },
    { prop: 'announcementType', name: 'Type of Commitment' },
    { prop: 'criticalDate', name: 'Critical Date' }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class RefinerReducer {
  public reduce = (
    state: RefinerState,
    action: RefinerServiceActions
  ): RefinerState => {
    if (DEBUG) {
      // tslint:disable-next-line:no-console
      console.log('reduce', action)
    }

    switch (action.type) {
      case RefinerActionTypes.LoadRefinerGroups: {
        return {
          ...state,
          refinerGroups: action.payload
        }
      }

      case RefinerActionTypes.LoadMapPointsCommitments: {
        return {
          ...state,
          commitmentMapPoints: action.payload
        }
      }

      case RefinerActionTypes.GetCommitmentMapPointAll: {
        return {
          ...state,
          commitmentMapPoints: action.payload
        }
      }

      case RefinerActionTypes.LoadRefinedCommitments: {
        return {
          ...state,
          commitments: action.payload
        }
      }

      case RefinerActionTypes.LoadRefinedMapPoints: {
        return {
          ...state,
          mapPoints: action.payload
        }
      }

      case RefinerActionTypes.SelectMapPoint: {
        return {
          ...state,
          selectedMapPoint: action.payload
        }
      }

      case RefinerActionTypes.SelectRefinerGroup: {
        const refinerGroups = [...state.refinerGroups]
        const group = refinerGroups.findIndex(p => p.id === action.payload.id)
        refinerGroups[group].expanded = !refinerGroups[group].expanded
        const expandedRefinerGroups = state.expandedRefinerGroups.filter(
          p => p !== action.payload.id
        )

        console.log(
          '👽',
          `id group ${group} expanded store`,
          expandedRefinerGroups
        )

        if (refinerGroups[group].expanded) {
          expandedRefinerGroups.push(action.payload.id)
        }
        console.log('👽', 'store : ', expandedRefinerGroups)

        return {
          ...state,
          expandedRefinerGroups: expandedRefinerGroups,
          refinerGroups: refinerGroups
        }
      }

      case RefinerActionTypes.SelectRefiner: {
        const item = action.payload
        const refinerGroups = [...state.refinerGroups]
        const group = refinerGroups.findIndex(p => p.id === item.groupId)
        refinerGroups[group].expanded = true
        const expandedRefinerGroups = state.expandedRefinerGroups.filter(
          p => p !== item.groupId
        )
        if (refinerGroups[group].expanded) {
          expandedRefinerGroups.push(item.groupId)
        }

        console.log(expandedRefinerGroups)

        const refiner = refinerGroups[group].children.findIndex(
          p => p.id === item.id
        )
        console.log('👽', 'group:', group, 'refiner', refiner)

        refinerGroups[group].children[refiner].selected = !refinerGroups[group]
          .children[refiner].selected

        console.log('store prior to filter', state.selectedRefiners)

        // if the item is not selected, then it has been unselected. Remove from store
        const selectedRefiners =
          item.selected === false
            ? state.selectedRefiners.filter(
                p => p.groupId !== item.groupId && p.itemId !== item.itemId
              )
            : state.selectedRefiners

        console.log('store after filter', selectedRefiners)

        // if the item is selected. Add to store
        if (refinerGroups[group].children[refiner].selected) {
          const selectedItem: SelectedRefinerItem = {
            groupId: item.groupId,
            itemId: item.id
          }
          selectedRefiners.push(selectedItem)
        }

        const retVal = {
          ...state,
          expandedRefinerGroups: expandedRefinerGroups,
          selectedRefiners: selectedRefiners,
          refinerGroups: refinerGroups
        }

        console.log(retVal)

        return retVal
      }
    }
    console.log('default case')
    return state
  }
}
