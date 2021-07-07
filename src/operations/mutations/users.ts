import { gql } from '@apollo/client/core'
import apolloClient from 'src/utils/graphql'
import * as GraphQLTypes from 'src/generated/graphql'

export const DO_PASSWORD_CHANGE = gql`
mutation DoPasswordChange($oldPassword: String!, $newPassword1: String!, $newPassword2: String!) {
  passwordChange(oldPassword: $oldPassword, newPassword1: $newPassword1, newPassword2: $newPassword2) {
    success,
    errors,
    refreshToken,
    token
  }
}
`

export const DO_UPDATE_ACCOUNT_DETAILS = gql`
mutation DoUpdateAccount($firstName: String, $lastName: String, $requiresPasswordReset: Boolean, $hasCompletedQuiz: Boolean, $learningMaterialPreference: String) {
 updateAccount(firstName: $firstName, lastName: $lastName, requiresPasswordReset: $requiresPasswordReset, hasCompletedQuiz: $hasCompletedQuiz, learningMaterialPreference: $learningMaterialPreference){
    success,
    errors
  }
}
`

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
        errors
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

export const DO_VERIFY_TOKEN = gql`
mutation DoVerifyToken($token: String!) {
  verifyToken(token: $token) {
    payload,
    success,
    errors
  }
}
`

export const DO_REFRESH_TOKEN = gql`
mutation DoRefreshToken($token: String!) {
  refreshToken(refreshToken: $token) {
    token,
    payload,
    success,
    errors,
    refreshToken
  }
}
`

export const DO_UPDATE_ICON = gql`
mutation DoUpdateIcon($file: Upload!) {
  updateIcon(file: $file) {
    success,
    icon {
      originalFileName,
      path
    }
  }
}
`

export const changePassword = function (payload: GraphQLTypes.DoPasswordChangeMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoPasswordChangeMutation, GraphQLTypes.DoPasswordChangeMutationVariables>({
    mutation: DO_PASSWORD_CHANGE,
    variables: payload
  })
}

export const updateAccountDetails = function (payload: GraphQLTypes.DoUpdateAccountMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoUpdateAccountMutation, GraphQLTypes.DoUpdateAccountMutationVariables>({
    mutation: DO_UPDATE_ACCOUNT_DETAILS,
    variables: payload
  })
}

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

export const updateIcon = function (payload: GraphQLTypes.DoUpdateIconMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoUpdateIconMutation, GraphQLTypes.DoUpdateIconMutationVariables>({
    mutation: DO_UPDATE_ICON,
    variables: payload
  })
}

export const verifyToken = function (payload: GraphQLTypes.DoVerifyTokenMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoVerifyTokenMutation, GraphQLTypes.DoVerifyTokenMutationVariables>({
    mutation: DO_VERIFY_TOKEN,
    variables: payload
  })
}

export const refreshToken = function (payload: GraphQLTypes.DoRefreshTokenMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoRefreshTokenMutation, GraphQLTypes.DoRefreshTokenMutationVariables>({
    mutation: DO_REFRESH_TOKEN,
    variables: payload
  })
}
