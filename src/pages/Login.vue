<template>
  <q-page class="row items-center justify-evenly">
    <login-form>

    </login-form>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LoginForm from 'components/LoginForm.vue'
@Component({
  components: { LoginForm }
})
export default class PageLogin extends Vue {
}
</script>
