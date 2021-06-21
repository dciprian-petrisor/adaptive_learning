import { ClassRoomType, ClassRoomMembershipMemberType, AlUserType, ExpectedErrorType } from 'src/generated'
import { Vue, Component, Prop } from 'vue-property-decorator'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'
import { useAuthStore, useClassRoomStore } from 'src/pinia-store'
import { notifyApolloError } from 'src/utils/errors'
import { ApolloError } from '@apollo/client/errors'

const authStore = useAuthStore()
const classroomStore = useClassRoomStore()

@Component({
  components: { UserAvatar }
})
export default class ClassRoomMembersList extends Vue {
    @Prop({ type: Object, required: true }) readonly classroom!: ClassRoomType;

    shouldShowConfirmRemoveDialog = false;
    memberForRemoval?: AlUserType = undefined;
    get isTeacherOrOwner () {
      return this.classroom.myMembership?.memberType === ClassRoomMembershipMemberType.Teacher || this.classroom.myMembership?.memberType === ClassRoomMembershipMemberType.Owner
    }

    get teachers () {
      const members = this.classroom.classroomMembers?.edges
      if (members) {
        return members.filter(x => x?.node?.memberType === ClassRoomMembershipMemberType.Teacher || x?.node?.memberType === ClassRoomMembershipMemberType.Owner).map(x => x?.node)
      }

      return []
    }

    get students () {
      const members = this.classroom.classroomMembers?.edges
      if (members) {
        return members.filter(x => x?.node?.memberType === ClassRoomMembershipMemberType.Student).map(x => x?.node)
      }

      return []
    }

    isCurrentUser (user: AlUserType) {
      return user.username === authStore.user?.username
    }

    updateMembership (student: AlUserType, type: string) {
      classroomStore.updateMembershipType({ input: { id: this.classroom.id, userId: student.id, newMembershipType: type as ClassRoomMembershipMemberType } })
        .then((result) => {
          if (result) {
            this.$emit('membershipUpdated', result)
          }
        })
        .catch((err: ApolloError | ExpectedErrorType) => {
          notifyApolloError(this.$q, err)
        })
    }

    startRemoveMember (student: AlUserType) {
      this.memberForRemoval = student
      this.shouldShowConfirmRemoveDialog = true
    }

    endRemoveMember () {
      if (!this.memberForRemoval) {
        this.shouldShowConfirmRemoveDialog = false
        return
      }

      classroomStore.removeMemberFromClassRoom({ input: { id: this.classroom.id, userId: this.memberForRemoval.id } })
        .then((result) => {
          if (result.classroomMembers) {
            this.$emit('classroomMembersUpdated', result.classroomMembers)
          }
          this.$q.notify({ message: 'Member deleted succesfully!', type: 'positive' })
        })
        .catch((err: ApolloError | ExpectedErrorType) => {
          notifyApolloError(this.$q, err)
        }).finally(() => { this.shouldShowConfirmRemoveDialog = false })
    }
}
