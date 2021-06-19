import { ApolloClient, DefaultOptions, InMemoryCache, ApolloLink, concat } from '@apollo/client/core'
import { useAuthStore } from 'src/pinia-store'
import { createUploadLink } from 'apollo-upload-client'
import fetch from 'cross-fetch'

const GRAPHQL_BACKEND_URL = process.env.GRAPHQL_BACKEND_URL

const apiLink = createUploadLink({ uri: GRAPHQL_BACKEND_URL, fetch: fetch })

const authLink = new ApolloLink((operation, forward) => {
  const authStore = useAuthStore()
  if (authStore.loggedIn && authStore.token) {
    operation.setContext({
      headers: {
        Authorization: `JWT ${authStore.token}`
      },
      withCredentials: true
    })
  }
  return forward(operation)
})

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  }
}

export default new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions,
  link: concat(authLink, apiLink)
})
