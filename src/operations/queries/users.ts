import { gql } from '@apollo/client/core'
import apolloClient from 'src/utils/graphql'
import * as GraphQLTypes from 'src/generated/graphql'

export const GET_ALL_USERS = gql`
query GetAllUsers {
    users {
        edges {
            node {
                username,
                archived,
                verified,
                email,
                secondaryEmail,
            }
        }
    }
}
`

export const GET_CURRENT_USER = gql`
query GetCurrentUser {
    me {
        username,
        archived,
        verified,
        email,
        secondaryEmail,
    }
}
`

export const getCurrentUser = function () {
  return apolloClient.query<GraphQLTypes.GetCurrentUserQuery, GraphQLTypes.GetCurrentUserQueryVariables>({
    query: GraphQLTypes.GetCurrentUser
  })
}
