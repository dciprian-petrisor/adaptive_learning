import { ActionContext, ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { LoginStateInterface } from './state'
import gql from 'graphql-tag'
import graphqlClient from 'src/utils/graphql'

const actions: ActionTree<LoginStateInterface, StateInterface> = {
  async authenticate (context: ActionContext<LoginStateInterface, StateInterface>) {
    console.log('authenticating')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const response = await graphqlClient.mutate({
      mutation: gql`mutation {
        tokenAuth(username: $user, password: $password) {
          success,
          errors,
          unarchiving,
          token,
          refreshToken,
          unarchiving,
          user {
            id,
            username,
          }
        }
      }`,
      variables: {
        user: context.state.username,
        password: context.state.password
      }
    })

    console.log(response)
  }
}

export default actions
