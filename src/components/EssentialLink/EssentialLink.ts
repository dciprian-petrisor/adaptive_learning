import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class EssentialLink extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: String, default: '' }) readonly caption!: string;
  @Prop({ type: String, default: '' }) readonly to!: string;
  @Prop({ type: String, default: '' }) readonly icon!: string;

  async onClicked () {
    return await this.$router.push({ name: this.to })
  }
}
