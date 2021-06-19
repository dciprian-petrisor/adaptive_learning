import { Component } from 'vue-property-decorator'
import { useAuthStore } from 'src/pinia-store'
import { QAvatar } from 'quasar'
@Component({})
export default class UserAvatar extends QAvatar {
    authStore = useAuthStore()

    get nameInitials () {
      const user = this.authStore.user
      if (!user) {
        return ''
      }

      if (!user.firstName && !user.lastName) {
        return ''
      }

      if (user.firstName) {
        return user.firstName[0].toUpperCase()
      }

      if (user.lastName) {
        return user.lastName[0].toUpperCase()
      }
    }

    get avatarUri () {
      return this.authStore.user?.icon?.path
    }
}
