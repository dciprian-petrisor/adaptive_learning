import { Vue, Component, Prop } from 'vue-property-decorator'
import { useAuthStore } from 'src/pinia-store'
import { ExpectedErrorType } from 'src/generated'
import { notifyApolloError } from 'src/utils/errors'
import { ApolloError } from '@apollo/client/errors'

@Component({})
export default class PageActivate extends Vue {
    @Prop({ type: String, required: true }) readonly token!: string;
    result = ''
    async mounted (): Promise<void> {
      const store = useAuthStore()
      await store.verifyAccount({ token: this.token })
        .then(() => { this.result = 'Success! Account verified!' })
        .catch((err: ExpectedErrorType|ApolloError) => {
          notifyApolloError(this.$q, err)
          this.result = 'Oops! Something went wrong while verifying the account!'
        })
    }
}
