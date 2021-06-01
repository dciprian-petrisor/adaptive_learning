import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/pinia-store'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

let storeHydrated = false

export default route(function ({ Vue }) {
  Vue.use(VueRouter)

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (!storeHydrated) {
      const piniaAuthState = sessionStorage.getItem('piniaState')
      // restore state if val is undefined and we have one in local storage
      if (piniaAuthState !== undefined && piniaAuthState != null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const localStorageState: any = JSON.parse(piniaAuthState)
        authStore.$patch(localStorageState)
      }
      storeHydrated = true
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (to.matched.some(record => record.meta.requiresAuth) && !authStore.loggedIn) {
      next({ path: 'login', query: { next: to.fullPath } })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (to.matched.some(record => record.meta.requiresNotAuth) && authStore.loggedIn) {
      // disallow going to pages that require the user not to be authenticated by keeping him on the same page
      next({ path: from.path })
    } else {
      next()
    }
  })
  return Router
})
