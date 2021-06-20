<template>
         <q-card
          flat
          bordered
          style="min-width: 300px; min-height:300px"
          class="col-3 q-ma-xl"
        >

            <q-img :src="classRoomCoverPhoto" style="height:200px">
              <div class="absolute-top text-subtitle2 text-center">{{ node.name }}</div>
            </q-img>
          <q-card-section>

            <q-card-actions align="right">
              <q-btn flat round color="blue" icon="folder_open" @click="()=> $emit('navigateToClassroom', node)" />
              <q-btn flat round color="red" icon="exit_to_app" @click="() => $emit('leaveClassroom', node)" />
            </q-card-actions>
          </q-card-section>
        </q-card>
</template>

<script src="./ClassRoomCard.ts" lang="ts" />
<style src="./ClassRoomCard.sass" lang="sass" scoped />
