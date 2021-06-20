import { Vue, Component } from 'vue-property-decorator'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'
import { useAuthStore } from 'src/pinia-store'
const store = useAuthStore()
@Component({
  components: { UserAvatar }
})
export default class MainLayout extends Vue {
  left = false
  passwordResetDismissed = false;
  requiresVerficationDismissed = false;

  get user () {
    return store.user
  }

  get showRequiresPasswordReset () {
    if (this.passwordResetDismissed) { return false }

    return store.user?.requiresPasswordReset || false
  }

  get showRequiresVerification () {
    if (this.requiresVerficationDismissed) { return false }
    return !store.user?.verified || false
  }

  async logOut () {
    return store.logOut(this.$router)
  }
}
