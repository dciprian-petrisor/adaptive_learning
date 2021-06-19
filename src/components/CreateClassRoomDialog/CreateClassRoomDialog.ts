import { Vue, Component, Prop } from 'vue-property-decorator'
import { useClassRoomStore } from 'src/pinia-store'
import { notifyApolloError } from 'src/utils/errors'
import { ExpectedErrorType } from 'src/generated/extra'
import { ApolloError } from '@apollo/client/core'
@Component({})
export default class CreateClassRoomDialog extends Vue {
    @Prop({ type: Boolean, required: true, default: false }) readonly showDialog!: boolean;

    name = ''
    description = ''
    get shouldShowDialog () {
      return this.showDialog
    }

    set shouldShowDialog (value) {
      this.$emit('dialogShowChanged', value)
    }

    get canCreate () {
      return this.name.trim() && this.description.trim()
    }

    create () {
      const store = useClassRoomStore()
      store.createClassRoom({ input: { name: this.name, description: this.description } })
        .then((c) => {
          this.$emit('classroomCreated', c)
        }).catch((err: ExpectedErrorType | ApolloError) => {
          notifyApolloError(this.$q, err)
        })
    }
}
