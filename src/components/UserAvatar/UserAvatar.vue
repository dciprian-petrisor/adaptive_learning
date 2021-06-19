<template>
  <q-avatar v-if="avatarUri"  v-bind="$props">
    <q-img alt="Avatar" :src="avatarUri" />
  </q-avatar>
  <q-avatar v-else color="secondary" text-color="white" v-bind="$props">{{ nameInitials }}</q-avatar>
</template>

<script src="./UserAvatar.ts" lang="ts" />
<style src="./UserAvatar.sass" lang="sass" scoped/>
