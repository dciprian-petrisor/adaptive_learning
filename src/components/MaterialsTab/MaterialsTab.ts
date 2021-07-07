import { Vue, Component, Prop } from 'vue-property-decorator'
import MaterialCard from 'src/components/MaterialCard/MaterialCard.vue'
import { ClassRoomMaterialTypeConnection, ClassRoomType } from 'src/generated'
import { GET_CLASSROOM_MATERIALS } from 'src/operations/queries/classroom'
import deepcopy from 'deepcopy'

@Component({
  components: { MaterialCard },
  apollo: {
    classroomMaterials: {
      query: GET_CLASSROOM_MATERIALS,
      variables () {
        const _this = this as unknown as MaterialsTab
        const opts : {classroomId: string, first: number, after: string, orderBy: string, materialType?:string } = {
          classroomId: _this.classroom.id,
          first: 10,
          after: '',
          orderBy: '-datetime'
        }

        if (_this.materialType) {
          opts.materialType = _this.materialType
        }
        return opts
      },
      update: function (data: { classroomMaterials: ClassRoomMaterialTypeConnection }) {
        const _this = this as unknown as MaterialsTab
        if (data.classroomMaterials.pageInfo.endCursor) {
          _this.after = data.classroomMaterials.pageInfo.endCursor
          _this.hasNextPage = data.classroomMaterials.pageInfo.hasNextPage
        }
        return data.classroomMaterials
      }
    }
  }
})
export default class MaterialsTab extends Vue {
    @Prop({ type: Object, required: true }) readonly classroom!: ClassRoomType;
    @Prop({ type: String, required: false }) readonly materialType?: string;
    classroomMaterials!: ClassRoomMaterialTypeConnection;
    after = '';
    hasNextPage = false;

    async showMore (index: number, done: () => void) {
      await this.$apollo.queries.classroomMaterials.fetchMore({
        variables: {
          classroomId: this.classroom.id,
          first: 1,
          after: this.after,
          orderBy: '-datetime',
          materialType: this.materialType
        },
        updateQuery: (previousResult: {classroomMaterials: ClassRoomMaterialTypeConnection}, { fetchMoreResult }: { fetchMoreResult?: {classroomMaterials: ClassRoomMaterialTypeConnection}}) => {
          const newMaterials = fetchMoreResult?.classroomMaterials?.edges || []
          const hasNextPage = fetchMoreResult?.classroomMaterials.pageInfo.hasNextPage || false
          const pageInfo = fetchMoreResult?.classroomMaterials.pageInfo
          this.hasNextPage = hasNextPage
          this.after = fetchMoreResult?.classroomMaterials.pageInfo.endCursor || ''
          const clone = deepcopy(previousResult)
          if (clone && clone.classroomMaterials.pageInfo) {
            clone.classroomMaterials.edges = [...clone.classroomMaterials.edges, ...newMaterials]
            if (pageInfo) {
              clone.classroomMaterials.pageInfo = pageInfo
            }
            clone.classroomMaterials.pageInfo.hasNextPage = hasNextPage || false
          }

          return clone
        }
      })
      done()
    }
}
