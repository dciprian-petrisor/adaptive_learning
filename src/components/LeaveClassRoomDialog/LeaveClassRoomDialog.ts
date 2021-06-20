import { ApolloError } from '@apollo/client/errors'
import { ClassRoomType } from 'src/generated'
import { ExpectedErrorType } from 'src/generated/extra'
import { useClassRoomStore } from 'src/pinia-store'
import { notifyApolloError } from 'src/utils/errors'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class LeaveClassRoomDialog extends Vue {
    @Prop({ type: Object, required: true }) readonly classroom?: ClassRoomType;
    @Prop({ type: Boolean, required: true }) readonly show!: boolean;

    get shouldShow () {
      return this.show
    }

    set shouldShow (v) {
      this.$emit('showChanged', v)
    }

    leaveClassRoom () {
      if (!this.classroom) { return }

      const store = useClassRoomStore()
      store.leaveClassRoom({ input: { id: this.classroom.id } })
        .then(() => {
          this.$q.notify({ message: 'Successfully left classroom.', type: 'positive' })
          this.$emit('classroomLeft')
        })
        .catch((err: ApolloError| ExpectedErrorType) => {
          notifyApolloError(this.$q, err)
        })
    }
}
