import { Component } from 'vue-property-decorator'
import { useAuthStore } from 'src/pinia-store'
import { mixins } from 'vue-class-component'
import PasswordValidationMixin from 'src/mixins/PasswordValidationMixin'
import { notifyApolloError } from 'src/utils/errors'
import { ExpectedErrorType } from 'src/generated/extra'
import { ApolloError } from '@apollo/client/core'

@Component({})
export default class ProfilePasswordForm extends mixins(PasswordValidationMixin) {
    currentPassword = ''
    newPassword = ''
    confirmPassword = ''

    onSubmit () {
      const store = useAuthStore()
      store.changePassword({ oldPassword: this.currentPassword, newPassword1: this.newPassword, newPassword2: this.confirmPassword })
        .then(async () => {
          this.$q.notify({ message: 'Password updated sucessfully', type: 'positive' })
          await store.updateAccountDetails({ requiresPasswordReset: false, firstName: store.user?.firstName, hasCompletedQuiz: store.user?.hasCompletedQuiz, lastName: store.user?.lastName, learningMaterialPreference: store.user?.learningMaterialPreference })
        })
        .catch((err: ExpectedErrorType | ApolloError) => {
          notifyApolloError(this.$q, err)
        }).finally(() => {
          this.$emit('onFinished')
        })
    }
}
