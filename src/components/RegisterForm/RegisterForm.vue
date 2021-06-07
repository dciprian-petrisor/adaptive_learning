<template>

    <q-form
      ref="registerForm"
      @submit="onSubmit"
      class="column q-mt-xl"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      style="min-width:250px;"
    >
     <q-input
        ref="firstNameInput"
        filled
        v-model="firstName"
        label="Your first name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your first name']"
      />

      <q-input
        ref="lastNameInput"
        filled
        v-model="lastName"
        label="Your last name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your last name']"
      />

      <q-input
        ref="usernameInput"
        filled
        v-model="username"
        label="Your username"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your username',
            usernameRegexRule]"
      />

      <q-input
        ref="emailInput"
        filled
        v-model="email"
        label="Your email"
        type="email"
        lazy-rules
        :rules="[
         val => val && val.length > 0 || 'Please type your email',
        emailRegexRule]"
      />

      <q-input
        ref="passwordInput"
        filled
        type="password"
        v-model="password"
        label="Your password"
        lazy-rules
        v-bind:class="passwordFieldClasses"
        :rules="[
          val => val && val.length > 0 || 'Please type your password',
          passwordRegexRule
        ]"
      />

    <q-input
        ref="confirmPasswordInput"
        filled
        type="password"
        v-model="confirmPassword"
        label="Confirm password"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please confirm your password',
          val => val === password || 'Your passwords do not match!'
        ]"
      />
        <q-btn ref="submitBtn" label="Submit" type="submit" color="secondary" v-bind:loading="loading"/>
    </q-form>

</template>

<script src='./RegisterForm.ts' lang='ts'/>
