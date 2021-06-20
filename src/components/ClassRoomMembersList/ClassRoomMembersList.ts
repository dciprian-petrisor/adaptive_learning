import { AllowAuthenticatedClassRoomType, ClassRoomMembershipMemberType } from 'src/generated'
import { Vue, Component, Prop } from 'vue-property-decorator'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'

@Component({
  components: { UserAvatar }
})
export default class ClassRoomMembersList extends Vue {
    @Prop({ type: Object, required: true }) readonly classroom!: AllowAuthenticatedClassRoomType;

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
        return members.filter(x => x?.node?.memberType === ClassRoomMembershipMemberType.Student).map(x => x.node)
      }

      return []
    }
}
