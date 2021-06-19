<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="shouldShowDialog"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-secondary text-white" style="width: 750px; max-width: 80vw">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-accent">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Join a classroom</div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-mt-md" @submit="join">
            <q-input
              v-model="accessCode"
              class="q-mb-md"
              type="text"
              label-color="white"
              no-error-icon
              filled
              label="Access code"
              lazy-rules
            />
          </q-form>
        </q-card-section>
        <q-btn-group flat unelevated class="float-right">
          <q-btn label="Join" @click="join"  :disable="!canJoin"></q-btn>
          <q-btn label="Cancel" @click="shouldShowDialog = false" v-close-popup></q-btn>
        </q-btn-group>
      </q-card>
    </q-dialog>
  </div>
</template>

<script src="./JoinClassRoomDialog.ts" lang="ts" />
<style scoped src="./JoinClassRoomDialog.sass" lang="sass" />
