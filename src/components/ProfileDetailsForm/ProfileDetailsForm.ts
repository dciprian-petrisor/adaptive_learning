import { Vue, Component } from 'vue-property-decorator'
import { useAuthStore } from 'src/pinia-store'
import { notifyApolloError } from 'src/utils/errors'
import { ApolloError } from '@apollo/client/core'
import { ExpectedErrorType } from 'src/generated/extra'
const store = useAuthStore()
@Component({})
export default class ProfileDetailsForm extends Vue {
    updatedFirstName = ''
    updatedLastName = ''

    mounted () {
      this.updatedFirstName = store.user?.firstName || ''
      this.updatedLastName = store.user?.lastName || ''
    }

    onSubmit () {
      store.updateAccountDetails({ firstName: this.updatedFirstName, lastName: this.updatedLastName })
        .then(() => {
          this.$q.notify({ message: 'Account details updated successfully.', type: 'positive' })
        })
        .catch((err: ExpectedErrorType | ApolloError) => {
          notifyApolloError(this.$q, err)
        })
        .finally(() => {
          this.$emit('onFinished')
        })
    }
}
