import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { useAuthStore } from 'src/pinia-store'
import { ExpectedErrorType } from 'src/generated'
import { ApolloError } from '@apollo/client/errors'
import { notifyApolloError } from 'src/utils/errors'
import PasswordValidationMixin from 'src/mixins/PasswordValidationMixin'
// RFC 2822
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const usernameRegex = /^(?:[a-zA-Z]+?){3,}[a-zA-Z0-9 .-]*?$/
@Component({})
export default class RegisterForm extends mixins(PasswordValidationMixin) {
  authStore = useAuthStore();
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;

  onSubmit () {
    this.loading = true
    return this.authStore.register({ email: this.email, username: this.username, firstName: this.firstName, lastName: this.lastName, password1: this.password, password2: this.password })
      .then(() => {
        this.$q.notify({ message: 'Success!', type: 'positive' })
        return this.$router.push({ name: 'dashboard' })
      })
      .catch((err: ExpectedErrorType | ApolloError) => {
        notifyApolloError(this.$q, err)
      })
      .finally(() => { this.loading = false })
  }

  emailRegexRule (value: string) {
    if (emailRegex.test(value)) {
      return true
    }
    return 'Invalid email address'
  }

  usernameRegexRule (value: string) {
    if (usernameRegex.test(value)) {
      return true
    }

    return 'Invalid username'
  }
}
