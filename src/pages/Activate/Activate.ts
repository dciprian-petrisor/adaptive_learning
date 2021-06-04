import { Vue, Component, Prop } from 'vue-property-decorator'
import { useAuthStore } from 'src/pinia-store'
import { GraphQLError } from 'graphql'
import { ExpectedErrorType } from 'src/generated'

const isExpectedErrorType = function (errors: unknown): errors is ExpectedErrorType {
  return (errors as ExpectedErrorType).nonFieldErrors !== undefined
}

@Component({})
export default class PageActivate extends Vue {
    @Prop({ type: String, required: true }) readonly token!: string;
    result = ''
    async mounted (): Promise<void> {
      const store = useAuthStore()
      await store.verifyAccount({ token: this.token })
        .then(() => { this.result = 'Success! Account verified!' })
        .catch((err: GraphQLError|ExpectedErrorType) => {
          if (err instanceof GraphQLError) {
            this.$q.notify({ message: err.message, type: 'negative' })
          } else if (isExpectedErrorType(err)) {
            for (const key of Object.keys(err)) {
              const errors = err[key]
              for (const error of errors) {
                this.$q.notify({ message: error.message, type: 'negative' })
              }
            }
          }
          this.result = 'Oops! Something went wrong while verifying the account!'
        })
    }
}
