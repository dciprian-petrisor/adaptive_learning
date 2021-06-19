<template>
     <q-dialog v-model="shouldShow" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure you want to leave this classroom?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Leave" color="primary" v-close-popup @click="leaveClassRoom" />
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script src='./LeaveClassRoomDialog.ts' lang="ts"/>
