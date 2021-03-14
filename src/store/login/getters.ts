import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { LoginStateInterface } from './state'

const getters: GetterTree<LoginStateInterface, StateInterface> = {
  username (context: LoginStateInterface) {
    return context.username
  },
  password (context: LoginStateInterface) {
    return context.password
  }
}

export default getters
