import { Vue, Component } from 'vue-property-decorator'

// min 8, upper, lower, digit and special char
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
@Component({})
export default class PasswordValidationMixin extends Vue {
    passwordFieldClasses = '';

    passwordRegexRule (value: string) {
      if (passwordRegex.test(value)) {
        this.passwordFieldClasses = ''
        return true
      }
      this.passwordFieldClasses = 'q-mb-xl'
      return 'Minimum 8 characters, one uppercase & lowercase letters, a digit and special character'
    }
}
