

export const ROLE_OWNERS = 'ROLE_OWNERS'
export const ROLE_MEMBERS = 'ROLE_MEMBERS'
export const ROLE_VISITORS = 'ROLE_VISITORS'

export const OPERATION_DISCUSSION = 'discussion'

export const OPERATION_RIGHT_READ = 'read'
export const OPERATION_RIGHT_WRITE = 'write'
export const OPERATION_RIGHT_HIDE = 'hide'

export const OPERATION_RIGHTS_PRECEDENT = [OPERATION_RIGHT_HIDE, OPERATION_RIGHT_WRITE, OPERATION_RIGHT_READ]

export const OPERATION_DEFAULTS = {
  'discussion': OPERATION_RIGHT_WRITE, // Temporary Default
}