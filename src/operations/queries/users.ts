import { gql } from '@apollo/client/core'
import apolloClient from 'src/utils/graphql'
import * as GraphQLTypes from 'src/generated/graphql'

export const GET_CURRENT_USER = gql`
query GetCurrentUser {
    me {
    hasCompletedQuiz,
    lastLogin,
    username,
    firstName,
    lastName,
    email,
    isActive,
    icon {
      originalFileName,
      path
    },
    requiresPasswordReset,
    learningMaterialPreference,
    isAdmin,
    verified,
    secondaryEmail
  }
}
`

export const getCurrentUser = function () {
  return apolloClient.query<GraphQLTypes.GetCurrentUserQuery, GraphQLTypes.GetCurrentUserQueryVariables>({
    query: GraphQLTypes.GetCurrentUser
  })
}
