import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import PDFComponent, { PDFDocumentLoadingTask } from 'vue-pdf'
import { ClassRoomMaterialType } from 'src/generated'
import { formatMediaURI } from 'src/utils/rest'
import { QScrollArea } from 'quasar'

@Component({
  components: { 'pdf-component': PDFComponent }
})
export default class PDFReaderDialog extends Vue {
    $refs!: {
      scrollArea: QScrollArea,
      pages: PDFComponent[]
    }

    @Prop({ type: Boolean, required: true }) readonly shouldShow!: boolean;
    @Prop({ type: Object, required: true }) readonly material!: ClassRoomMaterialType;

    numPages = 0
    src: PDFDocumentLoadingTask | undefined = undefined
    currentPage = 0

    get showDialog () {
      return this.shouldShow
    }

    set showDialog (v) {
      this.$emit('updateShouldShow', v)
    }

    @Watch('shouldShow', { immediate: true })
    onShowUpdated (value: boolean) {
      if (value) {
        this.loadTask()
      }
    }

    loadTask () {
      const docSrc = formatMediaURI(this.material.path)
      this.src = PDFComponent.createLoadingTask(docSrc + '?')
      this.src.promise.then(pdf => {
        this.numPages = pdf.numPages
      })
        .catch(e => console.log(e))
    }

    scrollTo (c: number) {
      const page = this.$refs.pages[c]
      const rect = page.$el.getBoundingClientRect()
      this.$refs.scrollArea.setScrollPosition(rect.top + rect.height, 0)
    }

    mounted () {
      this.loadTask()
    }
}
