import { createSelector } from '@ngrx/store'

import * as fromUser from './user.reducer'
import {
  OPERATION_DEFAULTS,
  OPERATION_RIGHT_READ,
  OPERATION_RIGHTS_PRECEDENT
} from '../../services/app-data.service'

export const getUserState = state => state.user

export const getUserCurrentUser = createSelector(
  getUserState,
  fromUser.getCurrentUser
)

export const getOperations = createSelector(
  getUserState,
  fromUser.getOperations
)

export const getDrawerOpen = createSelector(
  getUserState,
  fromUser.getDrawerOpen
)

export const getCurrentUserOperations = createSelector(
  getUserCurrentUser,
  getOperations,
  (user, operations) => {
    if (!user || !operations || !user.roles) {
      return {
        ...OPERATION_DEFAULTS
      }
    }

    const rights = Object.keys(OPERATION_DEFAULTS).reduce((acc: any, componentName: any) => {

        const operationsRights = user.roles.reduce((rightsAcc: any, group: any) => {
            const groupComponents = operations[group]
            if (groupComponents && groupComponents[componentName]) {
                rightsAcc.push(groupComponents[componentName])
            }
            return rightsAcc
        }, [])

        const orderedRights = operationsRights.sort((left: any, right: any) =>
            OPERATION_RIGHTS_PRECEDENT.indexOf(left) > OPERATION_RIGHTS_PRECEDENT.indexOf(right) ? 1 : -1)
        acc[componentName] = orderedRights[0]
        return acc
    }, {})

    const finalRights = Object.keys(rights).reduce((a, i) => {
        if (rights[i]) {
            a[i] =  rights[i]
        }
        return a
    }, {})

    return {
      ...OPERATION_DEFAULTS,
      ...finalRights
    }
  }
)

export const getCurrentUserProfile = createSelector(
  getUserCurrentUser,
  user => {
    const profile = {
      ...user,
      name: user ? user.name : 'Guest',
      background: 'red',
      displayType: 'circle',
      size: 35
    }

    return profile
  }
)
