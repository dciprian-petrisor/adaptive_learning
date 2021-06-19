import { Vue, Component, Prop } from 'vue-property-decorator'
import { useClassRoomStore } from 'src/pinia-store'
import { notifyApolloError } from 'src/utils/errors'
import { ExpectedErrorType } from 'src/generated/extra'
import { ApolloError } from '@apollo/client/core'
@Component({})
export default class JoinClassRoomDialog extends Vue {
    @Prop({ type: Boolean, required: true, default: false }) readonly showDialog!: boolean;

    accessCode = ''

    get shouldShowDialog () {
      return this.showDialog
    }

    set shouldShowDialog (value) {
      this.$emit('dialogShowChanged', value)
    }

    get canJoin () {
      return this.accessCode.trim()
    }

    join () {
      const store = useClassRoomStore()
      store.joinClassRoom({ input: { accessCode: this.accessCode } })
        .then((c) => {
          this.$emit('classroomJoined', c)
        }).catch((err: ExpectedErrorType | ApolloError) => {
          notifyApolloError(this.$q, err)
        })
    }
}
