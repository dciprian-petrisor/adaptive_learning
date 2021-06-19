import { Vue, Component } from 'vue-property-decorator'
import { useAuthStore } from 'src/pinia-store'
import { ExpectedErrorType } from 'src/generated'
import { ApolloError } from '@apollo/client/core'
import { notifyApolloError } from 'src/utils/errors'

@Component({})
export default class LoginForm extends Vue {
  authStore = useAuthStore();
  username = '';
  password = '';
  isPwd = true;
  isLoading = false;
  onSubmit () {
    this.isLoading = true
    return this.authStore.login({ username: this.username, password: this.password })
      .then(() => {
        this.$q.notify({ message: 'Logged in.', type: 'positive' })
        return this.$router.push({ name: 'dashboard' })
      })
      .catch((err: ExpectedErrorType | ApolloError) => {
        notifyApolloError(this.$q, err)
      })
      .finally(() => { this.isLoading = false })
  }
}
