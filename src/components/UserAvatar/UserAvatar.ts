import { Component, Prop } from 'vue-property-decorator'
import { QAvatar } from 'quasar'
import { AlUserType } from 'src/generated'
import { formatMediaURI } from 'src/utils/rest'
@Component({})
export default class UserAvatar extends QAvatar {
    @Prop({ type: Object, required: true }) readonly user!: AlUserType;

    get nameInitials () {
      if (!this.user) {
        return ''
      }

      if (!this.user.firstName && !this.user.lastName) {
        return ''
      }

      if (this.user.firstName) {
        return this.user.firstName[0].toUpperCase()
      }

      if (this.user.lastName) {
        return this.user.lastName[0].toUpperCase()
      }
    }

    get avatarUri () {
      if (this.user?.icon?.path) {
        return formatMediaURI(this.user?.icon?.path)
      }
      return ''
    }
}
