<template>
<q-page class="column justify-center content-center">
    <div class="col-grow logo-svg q-mt-xl" style="min-height: 200px"></div>
    <div class="col-grow">
      <login-form class="col-8 column"/>
      <essential-link class="q-mt-md" title="No account? Register instead!" link="register"></essential-link>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LoginForm from 'components/LoginForm.vue'
import EssentialLink from 'components/EssentialLink.vue'
@Component({
  components: { LoginForm, EssentialLink }
})
export default class PageLogin extends Vue {
}
</script>
