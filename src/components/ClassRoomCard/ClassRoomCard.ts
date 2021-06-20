import { ClassRoomType } from 'src/generated'
import { formatMediaURI } from 'src/utils/rest'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ClassRoomCard extends Vue {
    @Prop({ type: Object, required: true }) readonly node!: ClassRoomType

    get classRoomCoverPhoto () {
      if (this.node.coverPhoto?.path) {
        return formatMediaURI(this.node.coverPhoto?.path)
      }
      return 'default-splash-large.jpg'
    }
}
