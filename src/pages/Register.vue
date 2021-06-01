<template>
  <q-page class="column justify-center content-center">
    <div class="col-grow logo-svg blue q-mt-xl" style="min-height: 200px"></div>
    <div class="col-grow">
      <register-form class="col-8 column"/>
      <essential-link class="q-mt-md" title="Already have an account? Login instead!" link="login"></essential-link>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import RegisterForm from 'components/RegisterForm.vue'
import EssentialLink from 'components/EssentialLink.vue'

@Component({
  components: { RegisterForm, EssentialLink }
})
export default class PageRegister extends Vue {
}
</script>

<style lang="sass" scoped>
@import 'src/css/app.sass'

</style>
