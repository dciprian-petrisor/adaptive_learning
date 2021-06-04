import { Vue, Component } from 'vue-property-decorator'
import { useAuthStore } from 'src/pinia-store'
import { ExpectedErrorType } from 'src/generated'

@Component({})
export default class LoginForm extends Vue {
  authStore = useAuthStore();
  username = '';
  password = '';
  isPwd = true;
  onSubmit () {
    this.authStore.login({ username: this.username, password: this.password })
      .then(async () => {
        this.$q.notify({ message: 'Logged in.', type: 'positive' })
        await this.$router.push({ name: 'dashboard' })
      })
      .catch((err: ExpectedErrorType) => {
        for (const key of Object.keys(err)) {
          const errors = err[key]
          for (const error of errors) {
            this.$q.notify({ message: error.message, type: 'negative' })
          }
        }
      })
  }
}
