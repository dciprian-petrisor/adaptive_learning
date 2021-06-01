import Vue from 'vue'
import { createPinia, PiniaPlugin } from 'pinia'
import { boot } from 'quasar/wrappers'

Vue.use(PiniaPlugin)

export default boot(({ app }) => {
  const pinia = createPinia()
  app.pinia = pinia
})
