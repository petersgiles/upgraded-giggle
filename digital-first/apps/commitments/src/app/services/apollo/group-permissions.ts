import gql from 'graphql-tag'

export const GET_GROUP_PERMISSIONS = gql`
{
  groupPermissions {
    id
    rights
    component
    group
  }
}

`