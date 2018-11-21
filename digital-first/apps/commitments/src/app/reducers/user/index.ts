import { createSelector } from '@ngrx/store'

import * as fromUser from './user.reducer'

export const getUserState = state => state.user

export const getUserCurrentUser = createSelector(
    getUserState,
    fromUser.getCurrentUser
)

export const getCurrentUserProfile = createSelector(
    getUserCurrentUser,
    (user) => {

        const profile =   {
            ...user,
            name: user ? user.name : 'Guest',
            background: 'red',
            displayType: 'circle',
            size: 35,
        }

        return profile
    }

)