<template>
    <q-form
      ref="profilePasswordForm"
      @submit="onSubmit"
       class="q-gutter-md"
    >
      <q-input
        ref='currentPasswordInput'
        filled
        v-model="currentPassword"
        type="password"
        label="Type your current password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your current password']"
      />

       <q-input
        ref='newPasswordInput'
        filled
        type="password"
        v-model="newPassword"
        label="Type your new password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your new password',
        passwordRegexRule]"
      />

       <q-input
        ref='confirmPasswordInput'
        filled
        type="password"
        v-model="confirmPassword"
        label="Confirm your password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please confirm your password',
                val => val === newPassword || 'Your passwords do not match!']"
      />
      <div class="float-right">
        <q-btn ref="submitBtn" label="Save" type="submit" color="primary" class="q-mr-md" />
        <q-btn ref="cancelBtn" label="Cancel" @click="$emit('onFinished')" color="secondary" />
      </div>
    </q-form>

</template>

<script src='./ProfilePasswordForm.ts' lang='ts'/>
