import { DateTime } from 'luxon'
import { ClassRoomMaterialType } from 'src/generated'
import { Vue, Component, Prop } from 'vue-property-decorator'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'
import PDFReaderDialog from 'src/components/PDFReaderDialog/PDFReaderDialog.vue'
import { formatMediaURI } from 'src/utils/rest'

@Component({
  components: { UserAvatar, 'pdf-reader-dialog': PDFReaderDialog }
})
export default class MaterialCard extends Vue {
    @Prop({ type: Object, required: true }) readonly material!: ClassRoomMaterialType;
    expanded = false;

    get materialUri () {
      return formatMediaURI(this.material.path)
    }

    get isPdfMaterial () {
      return this.material.mimeType === 'application/pdf' || false
    }

    get isAudioMaterial () {
      return this.material.mimeType.startsWith('audio/') || false
    }

    get isVideoMaterial () {
      return this.material.mimeType.startsWith('video/') || false
    }

    get materialName () {
      return this.material.originalFileName
    }

    get author () {
      return this.material.author
    }

    get authorName () {
      return this.material.author.lastName + ' ' + this.material.author.firstName
    }

    get when () {
      return DateTime.fromISO(this.material.datetime.toString()).toRelative()
    }
}
