import { Vue, Component, Watch } from 'vue-property-decorator'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'
import { useAuthStore, useClassRoomStore } from 'src/pinia-store'
import { ApolloError } from '@apollo/client/errors'
import { ClassRoomTypeEdge, ExpectedErrorType, PrivateMediaType } from 'src/generated'
import { notifyApolloError } from 'src/utils/errors'
import { formatMediaURI } from 'src/utils/rest'
const classroomStore = useClassRoomStore()
const store = useAuthStore()
@Component({
  components: { UserAvatar }
})
export default class MainLayout extends Vue {
  left = false
  passwordResetDismissed = false;
  requiresVerficationDismissed = false;
  classrooms: Array<ClassRoomTypeEdge> = [];

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

  navigateToClassroom (c: ClassRoomTypeEdge) {
    if (c.node) {
      return this.$router.push({ name: 'classroom', params: { id: c.node.id } })
    }
  }

  formatCoverPhotoPath (photo: PrivateMediaType) {
    return formatMediaURI(photo.path)
  }

  @Watch('left', { immediate: true })
  drawerShowUpdated (val: boolean) {
    if (!val) {
      return
    }
    classroomStore.getUserClassRooms({})
      .then(r => {
        if (r.myClassrooms?.edges) {
          this.classrooms = r.myClassrooms.edges as Array<ClassRoomTypeEdge>
        }
      })
      .catch((err: ApolloError | ExpectedErrorType) => {
        notifyApolloError(this.$q, err)
      })
  }
}
