import { defineStore, DefineStoreOptions, GettersTree, Store } from 'pinia'
import * as GraphQLTypes from 'src/generated/graphql'
import { refreshToken, login, register, verifyAccount, updateIcon, updateAccountDetails, changePassword } from 'src/operations/mutations/users'
import { getCurrentUser } from 'src/operations/queries/users'
import { formatMediaURI } from 'src/utils/rest'
import VueRouter, { Route } from 'vue-router'
import deepcopy from 'deepcopy'
const STORE_NAME = 'auth'

export interface DecodedJWT {
  username: string;
  exp: number;
  origIat: number;
}

export interface AuthStateInterface {
  loggedIn: boolean;
  user: GraphQLTypes.AllowSelfAlUserType | undefined;
  token: string | undefined;
  refreshToken: string | undefined;
}

export interface AuthActionsInterface {
  changePassword(payload: GraphQLTypes.DoPasswordChangeMutationVariables): Promise<void>
  updateAccountDetails(payload: GraphQLTypes.DoUpdateAccountMutationVariables): Promise<void>
  updateIcon(payload: GraphQLTypes.DoUpdateIconMutationVariables): Promise<boolean>
  verifyAccount(payload: GraphQLTypes.DoVerifyAccountMutationVariables): Promise<boolean>
  register(payload: GraphQLTypes.DoRegisterMutationVariables): Promise<void>
  login(payload: GraphQLTypes.DoLoginMutationVariables): Promise<boolean>
  logOut(router: VueRouter): Promise<Route | void>
  loadUser(): Promise<void>
  tryRefreshToken(): Promise<boolean>
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
    async changePassword (payload: GraphQLTypes.DoPasswordChangeMutationVariables) {
      return changePassword(payload)
        .then((response) => {
          if (response.data?.passwordChange) {
            const passwordChange = response.data.passwordChange
            if (passwordChange.success && passwordChange.refreshToken && passwordChange.token && this.user) {
              const user = deepcopy(this.user)
              user.requiresPasswordReset = false
              this.$patch({
                refreshToken: passwordChange.refreshToken,
                token: passwordChange.token,
                user: user
              })
              return true
            } else {
              throw passwordChange.errors
            }
          }
          throw response.errors
        })
    },
    async updateAccountDetails (payload: GraphQLTypes.DoUpdateAccountMutationVariables) {
      return updateAccountDetails(payload)
        .then((response) => {
          if (response.data?.updateAccount) {
            const updateAccount = response.data.updateAccount
            if (updateAccount.success && this.user) {
              const user = deepcopy(this.user)
              if (payload.firstName) {
                user.firstName = payload.firstName
              }
              if (payload.lastName) {
                user.lastName = payload.lastName
              }
              this.user = user
              return true
            } else {
              throw updateAccount.errors
            }
          }
          throw response.errors
        })
    },
    async tryRefreshToken () {
      if (!this.refreshToken) {
        return Promise.reject()
      }

      return refreshToken({ token: this.refreshToken })
        .then(response => {
          if (response.data?.refreshToken) {
            const result = response.data.refreshToken
            if (result.success && result.refreshToken && result.token) {
              this.$patch({
                refreshToken: result.refreshToken,
                token: result.token
              })
              return true
            } else if (result.errors) {
              throw result.errors
            }
          }
          throw response.errors
        })
    },
    updateIcon (payload: GraphQLTypes.DoUpdateIconMutationVariables) {
      return updateIcon(payload)
        .then((response) => {
          if (response.data?.updateIcon) {
            const result = response.data.updateIcon
            if (result.success && result.icon && this.user) {
              this.user.icon = deepcopy(result.icon)
              // set the backend URL + media path returned from GraphQL
              if (this.user.icon?.path) {
                this.user.icon.path = formatMediaURI(this.user.icon.path)
              }
              return true
            }
          }
          throw response.errors
        })
    },
    verifyAccount (payload: GraphQLTypes.DoVerifyAccountMutationVariables) {
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
    register (payload: GraphQLTypes.DoRegisterMutationVariables) {
      return register(payload)
        .then(async (response) => {
          if (response.data?.register) {
            const registerResult = response.data.register
            if (registerResult.success && registerResult.refreshToken && registerResult.token) {
              this.$patch({
                loggedIn: true,
                refreshToken: registerResult.refreshToken,
                token: registerResult.token
              })
              return await this.loadUser()
            } else if (registerResult.errors) {
              throw registerResult.errors
            }
          }
          throw response.errors
        })
    },
    login (payload: GraphQLTypes.DoLoginMutationVariables) {
      return login(payload)
        .then(async (response) => {
          if (response.data?.tokenAuth) {
            const tokenAuth = response.data.tokenAuth
            if (tokenAuth.success && tokenAuth.refreshToken && tokenAuth.token && tokenAuth.user?.username) {
              this.$patch({
                loggedIn: true,
                refreshToken: tokenAuth.refreshToken,
                token: tokenAuth.token
              })
              return await this.loadUser()
            } else if (tokenAuth.errors) {
              throw tokenAuth.errors
            }
          }
          throw response.errors
        })
    },
    logOut (router: VueRouter) {
      // clear token cookie
      document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      this.$reset()
      if (router.currentRoute.name !== 'login') {
        return router.push({ name: 'login' })
      }
      return Promise.resolve()
    },
    async loadUser () {
      const response = await getCurrentUser()
      if (response.data?.me && isUserNode(response.data.me)) {
        this.user = deepcopy(response.data.me)
        // set the backend URL + media path returned from GraphQL
        if (this.user.icon?.path) {
          this.user.icon.path = formatMediaURI(this.user.icon.path)
        }
      }
    }
  }
} as DefineStoreOptions<typeof STORE_NAME, AuthStateInterface, GettersTree<AuthStateInterface>, AuthActionsInterface>)

function isUserNode (data: unknown): data is GraphQLTypes.AllowSelfAlUserType {
  return (data as GraphQLTypes.AllowSelfAlUserType).__typename !== undefined && (data as GraphQLTypes.AllowSelfAlUserType).__typename === 'AllowSelfALUserType'
}
