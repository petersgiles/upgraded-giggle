import * as users from './users'
import * as notifications from './notifications'

export * from './briefdivisions'
export * from './briefs'
export * from './briefstatuses'
export * from './comments'
export * from './policies'
export * from './recommendations'
export * from './recommendationresponses'
export * from './recommendeddirections'
export * from './subpolicies'
export * from './users'
export * from './commitments'
export * from './protectivemarkings'

export const user_notifications = notifications.notifications.map(n => {
  const name = users.lotsofUsers.find(l => l.id == n.user_id)

  return { ...n, name: `${name.first_name} ${name.last_name}` }
})
