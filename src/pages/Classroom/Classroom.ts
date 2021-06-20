import { Vue, Component, Prop } from 'vue-property-decorator'
import AnnouncementCard from 'src/components/AnnouncementCard/AnnouncementCard.vue'
import ClassRoomFeedCard from 'src/components/ClassRoomFeedCard/ClassRoomFeedCard.vue'
import { GET_CLASSROOM } from 'src/operations/queries/classroom'
import { ClassRoomMembershipTypeConnection, ClassRoomType } from 'src/generated'
import ClassRoomMembersList from 'src/components/ClassRoomMembersList/ClassRoomMembersList.vue'
import deepcopy from 'deepcopy'
@Component({
  props: {
    id: String
  },
  components: { AnnouncementCard, ClassRoomFeedCard, 'class-room-members-list': ClassRoomMembersList },
  apollo: {
    classroom: {
      query: GET_CLASSROOM,
      variables () {
        const _this = this as unknown as PageClassroom
        return { id: _this.id }
      }
    }
  }
})
export default class PageClassroom extends Vue {
    @Prop({ type: String, required: true }) readonly id!: string;
    classroom: ClassRoomType | unknown = {};
    tab = 'feed';

    classroomMembersUpdated (members: ClassRoomMembershipTypeConnection) {
      const cloned = deepcopy(this.classroom) as ClassRoomType
      cloned.classroomMembers = members
      this.classroom = cloned
    }
}
