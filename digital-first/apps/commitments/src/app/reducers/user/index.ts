import { createSelector } from '@ngrx/store'

import * as fromUser from './user.reducer'

export const getUserState = state => state.commitmentEdit

export const getUserCurrentUserPanels = createSelector(
    getUserState,
    fromUser.getCurrentUser
)