import { createSelector } from '@ngrx/store'
import {
  getUserCurrentUserOperations,
  getUserCurrentUser,
  OPERATION_RIGHT_WRITE
} from '@digital-first/df-app-core'
import { OPERATION_PLANNER } from '../../services/app-data/app-operations'

export const getUserCurrentUserPlannerPermission = createSelector(
  getUserCurrentUser,
  getUserCurrentUserOperations,
  (user, operations) =>
    user && user.isSiteAdmin
      ? OPERATION_RIGHT_WRITE
      : operations[OPERATION_PLANNER]
)
