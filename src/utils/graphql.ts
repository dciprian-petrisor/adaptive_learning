import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, concat } from '@apollo/client/core'
import { useAuthStore, AuthStore } from 'src/pinia-store'

let authStore: AuthStore

const apiLink = new HttpLink({ uri: 'http://localhost/graphql/' })

const authLink = new ApolloLink((operation, forward) => {
  if (!authStore) {
    authStore = useAuthStore()
  }
  if (authStore.loggedIn && authStore.token) {
    operation.setContext({
      headers: {
        Authorization: `JWT ${authStore.token}`
      }
    })
  }
  return forward(operation)
})

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authLink, apiLink)
})
