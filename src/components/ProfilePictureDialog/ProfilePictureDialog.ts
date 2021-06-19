import { Vue, Component, Prop } from 'vue-property-decorator'
import FileType from 'file-type'
import { useAuthStore } from 'src/pinia-store'
import { notifyApolloError } from 'src/utils/errors'
import GraphQLUploader from 'src/components/GraphQLUploader/GraphQLUploader.vue'
// false positive... vscode finds it fine, eslint doesn't for some reason
// eslint-disable-next-line import/named
import { CropperInterface } from 'vue-advanced-cropper'

const isCropper = function (obj: unknown): obj is CropperInterface {
  return (obj as CropperInterface).getResult !== undefined
}

@Component({
  components: { 'graphql-uploader': GraphQLUploader }
})
export default class ProfilePictureDialog extends Vue {
    @Prop({ type: Boolean, default: false, required: true }) readonly show!: boolean;
    filesList: File[] = []
    loadedPictureBase64 = ''
    mimeType = 'unknown'
    step = 1

    get shouldShow () {
      return this.show
    }

    set shouldShow (v) {
      this.$emit('updateShow', v)
    }

    get canContinue () {
      return !this.filesList.length
    }

    addFile (f: File[]) {
      this.filesList.push(...f)
    }

    removeFile (f: File[]) {
      this.filesList = this.filesList.filter(x => !f.includes(x))
    }

    onUploadContinue () {
      if (!this.filesList.length) {
        return
      }
      const f = this.filesList[0]
      const reader = new FileReader()
      reader.onloadend = async (evt) => {
        if (evt.target?.result && evt.target.result && evt.target.result instanceof ArrayBuffer) {
          const ftype = await FileType.fromBuffer(evt.target.result)
          if (ftype?.mime) {
            this.mimeType = ftype?.mime
          }
          this.loadedPictureBase64 = Buffer.from(evt.target.result as never, 'binary').toString('base64')
          this.step = 2
        }
      }
      reader.readAsArrayBuffer(f)
    }

    onCropBack () {
      this.step = 1
      this.filesList = []
    }

    uploadProfilePicture () {
      if (this.$refs.cropper && isCropper(this.$refs.cropper) && this.filesList.length) {
        const result = this.$refs.cropper.getResult()
        result.canvas.toBlob(blob => {
          const file = this.filesList[0]
          const cropped = new File([blob as never], this.filesList[0].name, { lastModified: file.lastModified, type: file.type })
          const store = useAuthStore()
          store.updateIcon({ file: cropped })
            .then(() => {
              this.$q.notify({ message: 'Icon updated.', type: 'positive' })
              this.$emit('updateShow', false)
              this.step = 1
              this.filesList = []
            })
            .catch(err => {
              notifyApolloError(this.$q, err)
            })
        })
      }
    }
}
