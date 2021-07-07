import { ClassRoomMaterialMaterialType } from 'src/generated'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class AnnoucementAttachment extends Vue {
    @Prop({ type: File, required: true }) readonly file!: File;
    @Prop({ type: String, required: true }) readonly value!: string;
    backingTypeValue = this.value
    materialTypes = Object.keys(ClassRoomMaterialMaterialType);

    get typeValue () {
      return this.backingTypeValue
    }

    set typeValue (v: string) {
      this.backingTypeValue = v
      this.$emit('change', v)
    }
}
