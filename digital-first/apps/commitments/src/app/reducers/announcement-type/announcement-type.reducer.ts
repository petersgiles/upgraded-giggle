import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { AnnouncementType } from './announcement-type.model'
import { AnnouncementTypeActions, AnnouncementTypeActionTypes } from './announcement-type.actions'

export interface State extends EntityState<AnnouncementType> {
  // additional entities state properties
}

export const adapter: EntityAdapter<AnnouncementType> = createEntityAdapter<AnnouncementType>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
})

export function reducer(
  state = initialState,
  action: AnnouncementTypeActions
): State {
  switch (action.type) {
    case AnnouncementTypeActionTypes.AddAnnouncementType: {
      return adapter.addOne(action.payload.announcementType, state)
    }

    case AnnouncementTypeActionTypes.UpsertAnnouncementType: {
      return adapter.upsertOne(action.payload.announcementType, state)
    }

    case AnnouncementTypeActionTypes.AddAnnouncementTypes: {
      return adapter.addMany(action.payload.announcementTypes, state)
    }

    case AnnouncementTypeActionTypes.UpsertAnnouncementTypes: {
      return adapter.upsertMany(action.payload.announcementTypes, state)
    }

    case AnnouncementTypeActionTypes.UpdateAnnouncementType: {
      return adapter.updateOne(action.payload.announcementType, state)
    }

    case AnnouncementTypeActionTypes.UpdateAnnouncementTypes: {
      return adapter.updateMany(action.payload.announcementTypes, state)
    }

    case AnnouncementTypeActionTypes.DeleteAnnouncementType: {
      return adapter.removeOne(action.payload.id, state)
    }

    case AnnouncementTypeActionTypes.DeleteAnnouncementTypes: {
      return adapter.removeMany(action.payload.ids, state)
    }

    case AnnouncementTypeActionTypes.LoadAnnouncementTypes: {
      return adapter.addAll(action.payload.announcementTypes, state)
    }

    case AnnouncementTypeActionTypes.ClearAnnouncementTypes: {
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
