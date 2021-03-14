import { MutationTree } from 'vuex'
import { LoginStateInterface } from './state'

const mutation: MutationTree<LoginStateInterface> = {
  updateUsername (state: LoginStateInterface, payload: string) {
    state.username = payload
  },
  updatePassword (state: LoginStateInterface, payload: string) {
    state.password = payload
  }
}

export default mutation
