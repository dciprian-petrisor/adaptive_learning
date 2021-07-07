import { Vue, Component } from 'vue-property-decorator'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'
import ProfilePictureDialog from 'src/components/ProfilePictureDialog/ProfilePictureDialog.vue'
import ProfileDetailsForm from 'src/components/ProfileDetailsForm/ProfileDetailsForm.vue'
import ProfilePasswordForm from 'src/components/ProfilePasswordForm/ProfilePasswordForm.vue'
import EssentialLink from 'src/components/EssentialLink/EssentialLink.vue'
import { useAuthStore } from 'src/pinia-store'
import QuizDialog from 'src/components/QuizDialog/QuizDialog.vue'

const store = useAuthStore()
@Component({
  components: { UserAvatar, ProfilePictureDialog, EssentialLink, ProfileDetailsForm, ProfilePasswordForm, QuizDialog }
})
export default class ProfileCard extends Vue {
  showProfilePictureDialog = false;
  showProfileForm = false;
  showChangePasswordForm = false;
  showQuiz = false;

  get user () {
    return store.user
  }
}
