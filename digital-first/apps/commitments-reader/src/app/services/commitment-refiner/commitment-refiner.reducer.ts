import { Injectable } from '@angular/core'
import { CommitmentPartsFragment } from '../../generated/graphql'
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

export interface RefinerState {
  expandedRefinerGroups: (string | number)[]
  selectedRefiners: RefinerType[]
  textRefiner: string
  sortColumn: string
  sortDirection: string
  refinerGroups: RefinerGroup[]
  selectedMapPoint: any
  mapPoints: any[]
  commitments: CommitmentPartsFragment[]
  columns: DataTableColumn[]
}
const sortArray: string[] = [null, 'ASC', 'DESC']

export const initialState: RefinerState = {
  expandedRefinerGroups: [],
  refinerGroups: [],
  selectedRefiners: [],
  textRefiner: null,
  sortColumn: null,
  sortDirection: null,
  selectedMapPoint: [],
  mapPoints: [],
  commitments: [],
  columns: [
    { prop: 'id', name: 'Id' },
    { prop: 'title', name: 'Title' },
    { prop: 'portfolio', name: 'Responsible Portfolio' },
    { prop: 'type', name: 'Type of Commitment' },
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

      case RefinerActionTypes.SelectRefinerGroup: {
        const refinerGroups = [...state.refinerGroups]
        const group = refinerGroups.findIndex(p => p.id === action.payload.id)
        refinerGroups[group].expanded = !refinerGroups[group].expanded

        return {
          ...state,
          refinerGroups: refinerGroups
        }
      }

      case RefinerActionTypes.SelectRefiner: {
        const item = action.payload
        const refinerGroups = [...state.refinerGroups]
        const group = refinerGroups.findIndex(p => p.id === item.groupId)
        refinerGroups[group].expanded = true
        const refiner = refinerGroups[group].children.findIndex(
          p => p.id === item.id
        )

        refinerGroups[group].children[refiner].selected = !refinerGroups[group]
          .children[refiner].selected

        return {
          ...state,
          refinerGroups: refinerGroups
        }
      }
    }

    return state
  }
}
