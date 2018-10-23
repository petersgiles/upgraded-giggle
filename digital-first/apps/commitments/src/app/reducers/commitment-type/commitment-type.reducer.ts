import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { CommitmentType } from './commitment-type.model'
import { CommitmentTypeActions, CommitmentTypeActionTypes } from './commitment-type.actions'

export interface State extends EntityState<CommitmentType> {
  // additional entities state properties
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<CommitmentType> = createEntityAdapter<CommitmentType>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  error: null
})

export function reducer(
  state = initialState,
  action: CommitmentTypeActions
): State {
  switch (action.type) {
    case CommitmentTypeActionTypes.AddCommitmentType: {
      return adapter.addOne(action.payload.commitmentType, state)
    }

    case CommitmentTypeActionTypes.UpsertCommitmentType: {
      return adapter.upsertOne(action.payload.commitmentType, state)
    }

    case CommitmentTypeActionTypes.AddCommitmentTypes: {
      return adapter.addMany(action.payload.commitmentTypes, state)
    }

    case CommitmentTypeActionTypes.UpsertCommitmentTypes: {
      return adapter.upsertMany(action.payload.commitmentTypes, state)
    }

    case CommitmentTypeActionTypes.UpdateCommitmentType: {
      return adapter.updateOne(action.payload.commitmentType, state)
    }

    case CommitmentTypeActionTypes.UpdateCommitmentTypes: {
      return adapter.updateMany(action.payload.commitmentTypes, state)
    }

    case CommitmentTypeActionTypes.DeleteCommitmentType: {
      return adapter.removeOne(action.payload.id, state)
    }

    case CommitmentTypeActionTypes.DeleteCommitmentTypes: {
      return adapter.removeMany(action.payload.ids, state)
    }

    case CommitmentTypeActionTypes.LoadCommitmentTypes: {
      return adapter.addAll(action.payload.data.commitmentTypes, {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error
      })
    }

    case CommitmentTypeActionTypes.ClearCommitmentTypes: {
      return adapter.removeAll(state)
    }

    case CommitmentTypeActionTypes.GetCommitmentTypes: {
      return {...state, loading: true, error: null}
    }

    case CommitmentTypeActionTypes.GetAllCommitmentTypes: {
      return {...state, loading: true, error: null}
    }

    case CommitmentTypeActionTypes.CommitmentTypesActionFailure: {
      return {...state, loading: false, error: action.payload.error}
    }

    case CommitmentTypeActionTypes.ClearCommitmentTypes: {
      return adapter.removeAll(state)
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
