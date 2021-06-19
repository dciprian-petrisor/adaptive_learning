import { QUploaderBase } from 'quasar'
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'

@Component({})
export default class GraphQLUploader extends mixins(QUploaderBase) {
    @Prop({ type: Array, required: true }) readonly filesList!: File[];
    @Prop({ type: Function, default: null, required: false }) readonly uploadAction!: (x: File) => void;

    uploading = false;
    busy = false;

    constructor () {
      super()
      if (this.filesList.length) {
        this.addFiles(this.filesList)
      }
      this.$on('added', (f: File[]) => this.$emit('fileAdded', f))
      this.$on('removed', (f: File[]) => { this.$emit('fileRemoved', f) })
    }

    get isUploading (): boolean {
      return this.uploading
    }

    get isBusy (): boolean {
      return this.busy
    }

    reloadFiles () {
      this.reset()
      this.addFiles(this.filesList)
    }

    abort () {
      // no-op
    }

    upload () {
      if (!this.uploadAction) {
        return
      }
      try {
        this.uploading = true
        for (const f of this.filesList) {
          this.uploadAction(f)
        }
      } finally {
        this.uploading = false
      }
    }
}
