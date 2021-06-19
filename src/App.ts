import { Vue, Component, Watch } from 'vue-property-decorator'
import { DecodedJWT, useAuthStore, AuthStateInterface } from 'src/pinia-store'
import jwtDecode from 'jwt-decode'
@Component({})
export default class App extends Vue {
  authStore = useAuthStore()
  // eslint-disable-next-line no-undef
  timeoutKey?: NodeJS.Timeout
  @Watch('authStore.$state', { immediate: true, deep: true })
  onStateChanged (val: AuthStateInterface): void {
    if (val !== undefined) {
      localStorage.clear()
      localStorage.setItem('piniaState', JSON.stringify(val))
      // dual policy -- save token to cookie as well
      // this allows media queries to be authenticated server side by copying the token from the cookie into the auth header, if there is none
      // since tags like <img/> do not pick up headers, but they do pick up cookies ;-)
      if (val.token) {
        document.cookie = `token=${val.token}; Path=/;`
      }
    }
    // set timeout for auto-refresh on expiration of token
    if (val.token) {
      const decoded: DecodedJWT = jwtDecode(val.token)
      const expDate = new Date(0)
      expDate.setUTCSeconds(decoded.exp)
      const refreshIn = expDate.getTime() - Date.now()
      if (this.timeoutKey) {
        clearTimeout(this.timeoutKey)
      }
      this.timeoutKey = setTimeout(() => {
        // try to refresh; we only care if an error happened
        this.authStore.tryRefreshToken().catch(async () => {
          await this.authStore.logOut(this.$router)
        })
      }, refreshIn)
    }
  }
}
