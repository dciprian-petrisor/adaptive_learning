<template>
  <q-page class="column">
    <slot name="notifications" />
    <div class="row col-grow content-center justify-center q-mb-xl">
        <profile-card class="col-md-6 col-8" />
      </div>
  </q-page>
</template>

<script src="./Profile.ts" lang="ts" />
