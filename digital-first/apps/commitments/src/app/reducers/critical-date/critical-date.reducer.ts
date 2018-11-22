import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { CriticalDate } from './critical-date.model'
import { CriticalDateActions, CriticalDateActionTypes } from './critical-date.actions'

export interface State extends EntityState<CriticalDate> {
  // additional entities state properties
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<CriticalDate> = createEntityAdapter<CriticalDate>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  error: null
})

export function reducer(
  state = initialState,
  action: CriticalDateActions
): State {
  switch (action.type) {
    case CriticalDateActionTypes.AddCriticalDate: {
      return adapter.addOne(action.payload.criticalDate, state)
    }

    case CriticalDateActionTypes.UpsertCriticalDate: {
      return adapter.upsertOne(action.payload.criticalDate, state)
    }

    case CriticalDateActionTypes.AddCriticalDates: {
      return adapter.addMany(action.payload.criticalDates, state)
    }

    case CriticalDateActionTypes.UpsertCriticalDates: {
      return adapter.upsertMany(action.payload.criticalDates, state)
    }

    case CriticalDateActionTypes.UpdateCriticalDate: {
      return adapter.updateOne(action.payload.criticalDate, state)
    }

    case CriticalDateActionTypes.UpdateCriticalDates: {
      return adapter.updateMany(action.payload.criticalDates, state)
    }

    case CriticalDateActionTypes.DeleteCriticalDate: {
      return adapter.removeOne(action.payload.id, state)
    }

    case CriticalDateActionTypes.DeleteCriticalDates: {
      return adapter.removeMany(action.payload.ids, state)
    }

    case CriticalDateActionTypes.LoadCriticalDates: {

      // tslint:disable-next-line:no-console
      console.log('LoadCriticalDates', action)

      return adapter.upsertMany(action.payload.data.criticalDates, {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error
      })
    }

    case CriticalDateActionTypes.ClearCriticalDates: {
      return adapter.removeAll(state)
    }

    case CriticalDateActionTypes.GetCriticalDates: {
      return { ...state, loading: true, error: null }
    }

    case CriticalDateActionTypes.GetAllCriticalDates: {
      return { ...state, loading: true, error: null }
    }

    case CriticalDateActionTypes.CriticalDatesActionFailure: {
      return { ...state, loading: false, error: action.payload.error }
    }

    default: {
      return state
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors()
