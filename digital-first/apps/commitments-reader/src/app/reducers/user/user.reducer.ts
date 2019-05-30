import { createSelector } from '@ngrx/store'
import {
  getUserCurrentUserOperations,
  getUserCurrentUser,
  OPERATION_RIGHT_WRITE
} from '@digital-first/df-app-core'
import { OPERATION_PLANNER, OPERATION_PMO_HANDLING_ADVICE, OPERATION_PMC_HANDLING_ADVICE } from '../../services/app-data/app-operations'

export const getUserCurrentUserPlannerPermission = createSelector(
  getUserCurrentUser,
  getUserCurrentUserOperations,
  (user, operations) =>
    user && user.isSiteAdmin
      ? OPERATION_RIGHT_WRITE
      : operations[OPERATION_PLANNER]
)
export const getUserCurrentUserDisplayOrderPermission = createSelector(
  getUserCurrentUser,
  getUserCurrentUserOperations,
  (user, operations) =>
    user && user.isSiteAdmin
      ? OPERATION_RIGHT_WRITE
      : operations[OPERATION_PLANNER]
)



