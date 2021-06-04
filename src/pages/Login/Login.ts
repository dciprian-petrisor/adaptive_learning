import { Vue, Component } from 'vue-property-decorator'
import LoginForm from 'components/LoginForm/LoginForm.vue'
import EssentialLink from 'components/EssentialLink/EssentialLink.vue'
@Component({
  components: { LoginForm, EssentialLink }
})
export default class PageLogin extends Vue {
}
