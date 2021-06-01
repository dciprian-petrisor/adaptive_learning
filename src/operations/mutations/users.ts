import { gql } from '@apollo/client/core'
import apolloClient from 'src/utils/graphql'
import * as GraphQLTypes from 'src/generated/graphql'

export const DO_LOGIN = gql`
mutation DoLogin($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success,
      errors,
      token,
      refreshToken,
      unarchiving,
      user {
        id,
        username,
      }
    }
  }
`

export const DO_REGISTER = gql`
mutation DoRegister($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password1: String!, $password2: String!) {
  register(email: $email, username: $username, password1: $password1, password2: $password2, firstName: $firstName, lastName: $lastName) {
        success,
        errors,
        token,
        refreshToken
    }
}
`

export const DO_VERIFY_ACCOUNT = gql`
mutation DoVerifyAccount($token: String!) {
  verifyAccount(token: $token) {
    success,
    errors
  }
}
`

export const login = function (payload: GraphQLTypes.DoLoginMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoLoginMutation, GraphQLTypes.DoLoginMutationVariables>({
    mutation: DO_LOGIN,
    variables: payload
  })
}

export const register = function (payload: GraphQLTypes.DoRegisterMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoRegisterMutation, GraphQLTypes.DoRegisterMutationVariables>({
    mutation: DO_REGISTER,
    variables: payload
  })
}

export const verifyAccount = function (payload: GraphQLTypes.DoVerifyAccountMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoVerifyAccountMutation, GraphQLTypes.DoVerifyAccountMutationVariables>({
    mutation: DO_VERIFY_ACCOUNT,
    variables: payload
  })
}
