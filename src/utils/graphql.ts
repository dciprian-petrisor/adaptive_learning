import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:/graphql/',
    headers: {
      'Access-Control-Allow-Origin': true
    },
    fetchOptions: {
      mode: 'no-cors'
    }
  }),
  cache: new InMemoryCache()
})
