import { Vue, Component, Prop } from 'vue-property-decorator'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'
import { ClassRoomPostCommentType } from 'src/generated'
import { DateTime } from 'luxon'

@Component({
  components: { UserAvatar }

})
export default class ClassRoomPostComment extends Vue {
    @Prop({ type: Object, required: true }) readonly comment!: ClassRoomPostCommentType;

    get author () {
      return this.comment.author
    }

    get authorName () {
      return this.comment.author.lastName + ' ' + this.comment.author.firstName
    }

    get when () {
      return DateTime.fromISO(this.comment.datetime.toString()).toRelative()
    }

    get text () {
      return this.comment.text
    }
}
