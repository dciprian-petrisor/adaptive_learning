import { Vue, Component } from 'vue-property-decorator'
import ProfileCard from 'src/components/ProfileCard/ProfileCard.vue'

@Component({
  components: { ProfileCard }
})
export default class PageProfile extends Vue {
}
