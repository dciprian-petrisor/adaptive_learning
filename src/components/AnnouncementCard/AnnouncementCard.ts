import { Vue, Component } from 'vue-property-decorator'
import { QEditor } from 'quasar'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'

@Component({
  components: { UserAvatar }
})
export default class AnnouncementCard extends Vue {
    $refs!: {
        editor: QEditor
      }

    announcementOpened_= false
    announcement = ''

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
      // TODO post announcement
    }
}
