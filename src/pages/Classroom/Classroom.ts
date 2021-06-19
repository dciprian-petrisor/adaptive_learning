import { Vue, Component, Prop } from 'vue-property-decorator'
import AnnouncementCard from 'src/components/AnnouncementCard/AnnouncementCard.vue'
import ClassRoomFeedCard from 'src/components/ClassRoomFeedCard/ClassRoomFeedCard.vue'
import { GET_CLASSROOM } from 'src/operations/queries/classroom'
import { AllowAuthenticatedClassRoomType } from 'src/generated'

@Component({
  props: {
    id: String
  },
  components: { AnnouncementCard, ClassRoomFeedCard },
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
    classroom!: AllowAuthenticatedClassRoomType;
    tab = 'feed';
}
