/* eslint-disable @typescript-eslint/no-empty-interface */
import { defineStore, DefineStoreOptions, GettersTree, Store } from 'pinia'
// import * as GraphQLTypes from 'src/generated/graphql'

const STORE_NAME = 'error'

export interface ErrorStateInterface {
    error: string | undefined
}

export interface ErrorActionsInterface {
    reportError(error: string): void
}

export type ErrorStore = Store<typeof STORE_NAME, ErrorStateInterface, GettersTree<ErrorStateInterface>, ErrorActionsInterface>;

export const useErrorStore = defineStore({
  id: STORE_NAME,
  state: () => ({
    error: undefined
  }),
  actions: {
    reportError (error: string) {
      this.$patch({
        error: error
      })
    }
  }
} as DefineStoreOptions<typeof STORE_NAME, ErrorStateInterface, GettersTree<ErrorStateInterface>, ErrorActionsInterface>)
