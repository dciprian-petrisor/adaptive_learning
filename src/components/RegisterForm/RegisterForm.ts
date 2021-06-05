import { Vue, Component } from 'vue-property-decorator'
import { useAuthStore } from 'src/pinia-store'
import { ExpectedErrorType } from 'src/generated'
// RFC 2822
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
// min 8, upper, lower, digit and special char
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
const usernameRegex = /^(?:[a-zA-Z]+?){3,}[a-zA-Z0-9 .-]*?$/
@Component({})
export default class RegisterForm extends Vue {
  authStore = useAuthStore();
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  passwordFieldClasses = '';
  loading = false;

  onSubmit () {
    this.loading = true
    return this.authStore.register({ email: this.email, username: this.username, firstName: this.firstName, lastName: this.lastName, password1: this.password, password2: this.password })
      .then(() => {
        this.$q.notify({ message: 'Success!', type: 'positive' })
        return this.$router.push({ name: 'dashboard' })
      })
      .catch((err: ExpectedErrorType) => {
        for (const key of Object.keys(err)) {
          const errors = err[key]
          for (const error of errors) {
            this.$q.notify({ message: error.message, type: 'negative' })
          }
        }
      })
      .finally(() => { this.loading = false })
  }

  passwordRegexRule (value: string) {
    if (passwordRegex.test(value)) {
      this.passwordFieldClasses = ''
      return true
    }
    this.passwordFieldClasses = 'q-mb-xl'
    return 'Minimum 8 characters, one uppercase & lowercase letters, a digit and special character'
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
