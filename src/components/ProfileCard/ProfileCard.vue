<template>
  <q-card flat bordered class="q-my-sm" style="min-width: 45vw">
    <q-card-section>
      <div class="text-h4">Profile</div>
    </q-card-section>
    <q-card-section>
      <div class="text-subtitle2 q-mb-sm">Profile Picture</div>
      <q-btn dense flat class="q-px-sm q-ml-sm" @click="showProfilePictureDialog = true">
        <user-avatar class="q-mr-md" size="xl" />
        <div>Change</div>
      </q-btn>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="text-h6">Account Details</div>
    </q-card-section>
    <q-card-section >
      <div>
        In order to change your account details, <q-btn
          color="primary"
          no-caps
          flat
          unelevated
          size="md"
          padding="xs"
          @click="showChangePasswordForm=false; showProfileForm=true;"
          >click here.</q-btn
        >
      </div>
      <transition enter-active-class="animated fadeIn">
      <profile-details-form class="q-my-xl" v-if="showProfileForm" @onFinished="showProfileForm = false"></profile-details-form>
      </transition>
    </q-card-section>

    <q-card-section>
      <div >
        In order to change your password, <q-btn
          style="display: inline"
          color="primary"
          no-caps
          flat
          unelevated
          size="md"
          padding="xs"
          @click="showProfileForm=false; showChangePasswordForm=true;"
          >click here.</q-btn
        >
      </div>
      <transition enter-active-class="animated fadeIn">
      <profile-password-form class="q-my-xl" v-if="showChangePasswordForm" @onFinished="showChangePasswordForm = false"></profile-password-form>
      </transition>
    </q-card-section>

    <profile-picture-dialog
      :show="showProfilePictureDialog"
      @updateShow="(v) => (showProfilePictureDialog = v)"
    />
  </q-card>
</template>

<style src="./ProfileCard.sass" lang="sass" scoped />
<script src="./ProfileCard.ts" lang="ts" />
