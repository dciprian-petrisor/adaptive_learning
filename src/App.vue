<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { useAuthStore } from 'src/pinia-store'
@Component({})
export default class App extends Vue {
  authStore = useAuthStore()
  @Watch('authStore.$state', { immediate: true, deep: true })
  onStateChanged (val: unknown): void {
    if (val !== undefined) {
      // just update the localStorage otherwise
      sessionStorage.setItem('piniaState', JSON.stringify(val))
    }
  }
}
</script>
