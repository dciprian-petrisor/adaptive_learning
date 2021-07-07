import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Loading, QEditor } from 'quasar'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'
import AnnouncementAttachment from 'src/components/AnnouncementAttachment/AnnouncementAttachment.vue'
import { useAuthStore, useClassRoomStore } from 'src/pinia-store'
import { DateTime } from 'luxon'
import { ApolloError } from '@apollo/client/errors'
import { ClassRoomMaterialMaterialType, ClassRoomMembershipMemberType, ClassRoomType, ExpectedErrorType } from 'src/generated'
import { notifyApolloError } from 'src/utils/errors'
const store = useAuthStore()
const classroomStore = useClassRoomStore()
@Component({
  components: { UserAvatar, AnnouncementAttachment }
})
export default class AnnouncementCard extends Vue {
    @Prop({ type: Object, required: true }) readonly classroom!: ClassRoomType
    $refs!: {
        editor: QEditor,
        fileInput: HTMLInputElement
      }

    announcementOpened_= false
    announcement = ''
    files: File[] = []
    fileMaterialType = new Map<File, ClassRoomMaterialMaterialType>()

    get canPost () {
      return !(this.announcement.trim() !== '' && this.files.length === this.fileMaterialType.size)
    }

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

    get isClassroomAdmin () {
      const membershipType = this.classroom.myMembership?.memberType
      if (!membershipType) {
        return false
      } else {
        return membershipType === ClassRoomMembershipMemberType.Owner || membershipType === ClassRoomMembershipMemberType.Teacher
      }
    }

    get toolbarOptions () {
      const opts = [
        ['left', 'center', 'right', 'justify'],
        ['bold', 'italic', 'underline', 'strike']
      ]

      if (this.isClassroomAdmin) {
        opts.push(['attachments'])
      }
      return opts
    }

    get editorDefinitions () {
      if (this.isClassroomAdmin) {
        return {
          attachments: {
            tip: 'Attach files',
            icon: 'attachment',
            label: 'Attachments',
            handler: () => this.addAttachments()
          }
        }
      }

      return {}
    }

    addAttachments () {
      this.$refs.fileInput.click()
    }

    removeAttachment (f: File) {
      this.files = this.files.filter(x => x !== f)
      this.fileMaterialType.delete(f)
    }

    previewFiles (v: MouseEvent) {
      if (v.target instanceof HTMLInputElement && v.target.files) {
        const fls = Array.from(v.target.files)
        this.fileMaterialType.clear()
        fls.forEach(f => this.fileMaterialType.set(f, (f.type.startsWith('video') ? 'Visual' : 'Verbal') as ClassRoomMaterialMaterialType))
        this.files = fls
        v.target.value = ''
      }
    }

    postAnnouncement (e: MouseEvent) {
      e.stopPropagation()
      this.announcementOpened = false
      const mTypes = Array.from(this.fileMaterialType.values())
      const mimeTypes = this.files.map(x => x.type)
      Loading.show({ message: 'Creating post...' })
      classroomStore.createClassRoomPost({ input: { mimeTypes: mimeTypes, materialTypes: mTypes, files: this.files, datetime: DateTime.now(), text: this.announcement, classroomId: this.classroom.id } })
        .then(result => {
          this.$emit('announcementCreated', result)
        })
        .catch((e: ApolloError | ExpectedErrorType) => {
          notifyApolloError(this.$q, e)
        })
        .finally(() => {
          Loading.hide()
          this.announcement = ''
          this.files = []
          this.fileMaterialType.clear()
        })
    }

    @Watch('$refs.fileInput.files', { deep: true, immediate: true })
    onFileInputChanged (val: File[]) {
      this.files = val || []
    }

    updateAttachmentType (f: File, value: string) {
      this.fileMaterialType.set(f, value as ClassRoomMaterialMaterialType)
    }
}
