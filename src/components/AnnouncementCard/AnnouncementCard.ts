import { Vue, Component, Prop } from 'vue-property-decorator'
import { QEditor } from 'quasar'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'
import { useAuthStore, useClassRoomStore } from 'src/pinia-store'
import { DateTime } from 'luxon'
import { ApolloError } from '@apollo/client/errors'
import { ClassRoomType, ExpectedErrorType } from 'src/generated'
import { notifyApolloError } from 'src/utils/errors'
const store = useAuthStore()
const classroomStore = useClassRoomStore()
@Component({
  components: { UserAvatar }
})
export default class AnnouncementCard extends Vue {
    @Prop({ type: Object, required: true }) readonly classroom!: ClassRoomType
    $refs!: {
        editor: QEditor
      }

    announcementOpened_= false
    announcement = ''

    get user () {
      return store.user
    }

    get announcementOpened () {
      return this.announcementOpened_
    }

    set announcementOpened (v) {
      this.announcementOpened_ = v
      if (v === true) { this.$nextTick(() => this.$refs.editor.focus()) }
    }

    uploadAttachment () {
      console.log('uploading')
    }

    postAnnouncement (e: MouseEvent) {
      e.stopPropagation()
      this.announcementOpened = false
      classroomStore.createClassRoomPost({ input: { datetime: DateTime.now(), text: this.announcement, classroomId: this.classroom.id } })
        .then(result => {
          this.$emit('announcementCreated', result)
        })
        .catch((e: ApolloError | ExpectedErrorType) => {
          notifyApolloError(this.$q, e)
        })
      // TODO post announcement
    }
}
