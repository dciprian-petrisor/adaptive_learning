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
          <div class="text-h6">Create a new classroom</div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-mt-md" @submit="create">
            <q-input
              v-model="name"
              class="q-mb-md"
              type="text"
              label-color="white"
              no-error-icon
              filled
              label="Name"
              lazy-rules
            />
            <q-input
              v-model="description"
              class="q-mb-md"
              type="text"
              label-color="white"
              no-error-icon
              filled
              label="Description"
              lazy-rules
            />
          </q-form>
        </q-card-section>
        <q-btn-group flat unelevated class="float-right">
          <q-btn label="Create" @click="create"  :disable="!canCreate"></q-btn>
          <q-btn label="Cancel" @click="shouldShowDialog = false"></q-btn>
        </q-btn-group>
      </q-card>
    </q-dialog>
  </div>
</template>

<script src="./CreateClassRoomDialog.ts" lang="ts" />
<style scoped src="./CreateClassRoomDialog.sass" lang="sass" />
