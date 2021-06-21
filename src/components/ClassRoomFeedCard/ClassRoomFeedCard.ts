import { ClassRoomType, ClassRoomMembershipMemberType, PrivateMediaType } from 'src/generated'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { copyToClipboard } from 'quasar'
import ClassRoomCoverPhotoDialog from '../ClassRoomCoverPhotoDialog/ClassRoomCoverPhotoDialog.vue'
import { formatMediaURI } from 'src/utils/rest'
import deepcopy from 'deepcopy'

@Component({
  components: { ClassRoomCoverPhotoDialog }
})
export default class ClassRoomFeedCard extends Vue {
    @Prop({ type: Object, required: true }) classroom!: ClassRoomType;
    showClassRoomCoverPhotoDialog = false;

    get classRoomCoverPhoto () {
      if (this.classroom.coverPhoto?.path) {
        return formatMediaURI(this.classroom.coverPhoto?.path)
      }
      return 'default-splash.jpg'
    }

    get isClassroomAdmin () {
      const membershipType = this.classroom.myMembership?.memberType
      if (!membershipType) {
        return false
      } else {
        return membershipType === ClassRoomMembershipMemberType.Owner || ClassRoomMembershipMemberType.Teacher
      }
    }

    onCoverPhotoUploadSuccess (newPath: PrivateMediaType) {
      const clone = deepcopy(this.classroom)
      if (this.classroom.coverPhoto) {
        clone.coverPhoto = newPath
        this.classroom = clone
      }
    }

    onCopyAccessCode () {
      if (!this.classroom.accessCode) {
        this.$q.notify({ message: 'Unable to retrieve the access code.', type: 'negative' })
        return
      }

      copyToClipboard(this.classroom.accessCode)
        .then(() => {
          this.$q.notify({ message: 'Copied to clipboard.', type: 'info' })
        })
        .catch(() => {
          this.$q.notify({ message: 'Unable to copy to clipboard.', type: 'negative' })
        })
    }
}
