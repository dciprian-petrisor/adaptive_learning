import { defineStore, DefineStoreOptions, GettersTree, Store } from 'pinia'
import * as GraphQLTypes from 'src/generated/graphql'
import { login, register, verifyAccount } from 'src/operations/mutations/users'
import { getCurrentUser } from 'src/operations/queries/users'
import { ExpectedErrorType } from 'src/generated/extra'
const STORE_NAME = 'auth'

export interface AuthStateInterface {
    loggedIn: boolean;
    user: GraphQLTypes.UserNode | undefined;
    token: string | undefined;
    refreshToken: string | undefined;
}

export interface AuthActionsInterface {
    verifyAccount (payload: GraphQLTypes.DoVerifyAccountMutationVariables): Promise<boolean>
    register (payload: GraphQLTypes.DoRegisterMutationVariables): Promise<boolean>
    login (payload: GraphQLTypes.DoLoginMutationVariables): Promise<boolean>
    loadUser (): Promise<void>
}

export type AuthStore = Store<typeof STORE_NAME, AuthStateInterface, GettersTree<AuthStateInterface>, AuthActionsInterface>;

export const useAuthStore = defineStore({
  id: STORE_NAME,
  state: () => ({
    loggedIn: false,
    user: undefined,
    token: undefined,
    refreshToken: undefined
  }),
  actions: {
    async verifyAccount (payload: GraphQLTypes.DoVerifyAccountMutationVariables) {
      return verifyAccount(payload)
        .then((response) => {
          if (response.data?.verifyAccount) {
            const result = response.data.verifyAccount
            if (result.success) {
              return true
            } else if (result.errors) {
              throw result.errors
            }
          } else {
            throw response.errors
          }
        })
    },
    async register (payload: GraphQLTypes.DoRegisterMutationVariables) {
      return register(payload)
        .then(async (response) => {
          if (response.data?.register?.success) {
            const registerResult = response.data.register
            if (registerResult.refreshToken && registerResult.token) {
              this.$patch({
                loggedIn: true,
                refreshToken: registerResult.refreshToken,
                token: registerResult.token
              })
              return await this.loadUser()
            }
          } else if (response.data?.register?.errors) {
            const errors: ExpectedErrorType = response.data.register.errors
            throw errors
          }
        })
    },
    async login (payload: GraphQLTypes.DoLoginMutationVariables) {
      return login(payload)
        .then(async (response) => {
          if (response.data?.tokenAuth?.success) {
            const tokenAuth = response.data.tokenAuth
            if (tokenAuth.refreshToken && tokenAuth.token && tokenAuth.user?.username) {
              this.$patch({
                loggedIn: true,
                refreshToken: tokenAuth.refreshToken,
                token: tokenAuth.token
              })
              return await this.loadUser()
            }
          } else if (response.data?.tokenAuth?.errors) {
            const errors: ExpectedErrorType = response.data.tokenAuth.errors
            throw errors
          }
        })
    },
    async loadUser () {
      const response = await getCurrentUser()
      if (response.data?.me && isUserNode(response.data?.me)) {
        this.user = response.data.me
      }
    }
  }
} as DefineStoreOptions<typeof STORE_NAME, AuthStateInterface, GettersTree<AuthStateInterface>, AuthActionsInterface>)

function isUserNode (data: unknown): data is GraphQLTypes.UserNode {
  return (data as GraphQLTypes.UserNode).__typename !== undefined && (data as GraphQLTypes.UserNode).__typename === 'UserNode'
}
