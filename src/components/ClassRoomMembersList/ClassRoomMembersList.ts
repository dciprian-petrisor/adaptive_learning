import { ClassRoomType, ClassRoomMembershipMemberType, AlUserType, ExpectedErrorType } from 'src/generated'
import { Vue, Component, Prop } from 'vue-property-decorator'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'
import { useClassRoomStore } from 'src/pinia-store'
import { notifyApolloError } from 'src/utils/errors'
import { ApolloError } from '@apollo/client/errors'

const store = useClassRoomStore()

@Component({
  components: { UserAvatar }
})
export default class ClassRoomMembersList extends Vue {
    @Prop({ type: Object, required: true }) readonly classroom!: ClassRoomType;

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

    removeMember (student: AlUserType) {
      store.removeMemberFromClassRoom({ input: { id: this.classroom.id, userId: student.id } })
        .then((result) => {
          if (result.classroomMembers) {
            this.$emit('classroomMembersUpdated', result.classroomMembers)
          }
          this.$q.notify({ message: 'Member deleted succesfully!', type: 'positive' })
        })
        .catch((err: ApolloError | ExpectedErrorType) => {
          notifyApolloError(this.$q, err)
        })
    }
}
