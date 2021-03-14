<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
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
        type="password"
        v-model="password"
        label="Your password"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your password'
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class LoginForm extends Vue {
  async onSubmit () {
    console.log('submitting')
    await this.$store.dispatch('login/authenticate')
  }

  get username (): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return this.$store.getters['login/username']
  }

  set username (value: string) {
    this.$store.commit('login/updateUsername', value)
  }

  get password (): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return this.$store.getters['login/password']
  }

  set password (value: string) {
    this.$store.commit('login/updatePassword', value)
  }
}
</script>
