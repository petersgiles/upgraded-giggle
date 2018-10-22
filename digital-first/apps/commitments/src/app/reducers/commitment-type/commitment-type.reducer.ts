import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { CommitmentType } from './commitment-type.model'
import { CommitmentTypeActions, CommitmentTypeActionTypes } from './commitment-type.actions'

export interface State extends EntityState<CommitmentType> {
  // additional entities state properties
}

export const adapter: EntityAdapter<CommitmentType> = createEntityAdapter<CommitmentType>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
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
      return adapter.addAll(action.payload.commitmentTypes, state)
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
