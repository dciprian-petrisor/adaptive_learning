import { Vue, Component } from 'vue-property-decorator'
import RegisterForm from 'components/RegisterForm/RegisterForm.vue'
import EssentialLink from 'components/EssentialLink/EssentialLink.vue'

@Component({
  components: { RegisterForm, EssentialLink }
})
export default class PageRegister extends Vue {
}
