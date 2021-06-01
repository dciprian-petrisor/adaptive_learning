<template>
    <q-form
      @submit="onSubmit"
      class="column"
    >
      <q-input
        filled
        v-model="username"
        label="Your username"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your username']"
      />

      <q-input
        filled
        :type="isPwd ? 'password' : 'text'"
        v-model="password"
        label="Your password"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your password'
        ]"
      >
         <template v-slot:append>
       <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
        <q-btn label="Submit" type="submit" color="primary"/>
    </q-form>

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { useAuthStore } from 'src/pinia-store'
import { ExpectedErrorType } from 'src/generated'
const authStore = useAuthStore()

@Component({})
export default class LoginForm extends Vue {
  username = '';
  password = '';
  isPwd = true;
  onSubmit () {
    authStore.login({ username: this.username, password: this.password })
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
</script>
