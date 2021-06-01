<template>

    <q-form
      @submit="onSubmit"
      class="column q-mt-xl"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      style="min-width:250px;"
    >
     <q-input
        filled
        v-model="firstName"
        label="Your first name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your first name']"
      />

      <q-input
        filled
        v-model="lastName"
        label="Your last name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your last name']"
      />

      <q-input
        filled
        v-model="username"
        label="Your username"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your username',
            usernameRegexRule]"
      />

      <q-input
        filled
        v-model="email"
        label="Your email"
        type="email"
        lazy-rules
        :rules="[
         val => val && val.length > 0 || 'Please type your email',
        emailRegexRule]"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Your password"
        lazy-rules
        v-bind:class="passwordFieldClasses"
        :rules="[
          val => val && val.length > 0 || 'Please type your password',
          passwordRegexRule
        ]"
      />

    <q-input
        filled
        type="password"
        v-model="confirmPassword"
        label="Confirm password"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please confirm your password',
          val => val === password || 'Your passwords do not match!'
        ]"
      />
        <q-btn label="Submit" type="submit" color="secondary" v-bind:loading="loading"/>
    </q-form>

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { useAuthStore } from 'src/pinia-store'
import { ExpectedErrorType } from 'src/generated'
const authStore = useAuthStore()
// RFC 2822
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
// min 8, upper, lower, digit and special char
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
const usernameRegex = /^(?:[a-zA-Z]+?){3,}[a-zA-Z0-9 .-]*?$/
@Component({})
export default class RegisterForm extends Vue {
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
    authStore.register({ email: this.email, username: this.username, firstName: this.firstName, lastName: this.lastName, password1: this.password, password2: this.password })
      .then(async () => {
        this.$q.notify({ message: 'Success!', type: 'positive' })
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
</script>
