import { Vue, Component } from 'vue-property-decorator'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'
import { useAuthStore } from 'src/pinia-store'
@Component({
  components: { UserAvatar }
})
export default class MainLayout extends Vue {
  store = useAuthStore()
  left = false
  passwordResetDismissed = false;
  requiresVerficationDismissed = false;

  get showRequiresPasswordReset () {
    if (this.passwordResetDismissed) { return false }

    return this.store.user?.requiresPasswordReset || false
  }

  get showRequiresVerification () {
    if (this.requiresVerficationDismissed) { return false }
    return !this.store.user?.verified || false
  }

  async logOut () {
    return this.store.logOut(this.$router)
  }
}
