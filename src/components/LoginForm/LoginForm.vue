<template>
    <q-form
      ref="loginForm"
      @submit="onSubmit"
      class="column"
    >
      <q-input
        ref='usernameInput'
        filled
        v-model="username"
        label="Your username"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your username']"
      />

      <q-input
        ref="passwordInput"
        filled
        :type="isPwd ? 'password' : 'text'"
        v-model="password"
        label="Your password"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your password'
        ]"
      >
         <template v-slot:append>
       <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
        <q-btn label="Submit" type="submit" color="primary" />
    </q-form>

</template>

<script src='./LoginForm.ts' lang='ts'/>
