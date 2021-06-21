<template>
  <q-card bordered class="q-my-md card-shadow" style="width: 60vw">
    <q-item
      class="justify-center items-center content-center"
      clickable
      style="cursor: pointer"
      @click="announcementOpened = true"
      v-if="!announcementOpened"
    >
      <q-item-section avatar>
        <user-avatar :user="user"> </user-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label caption header>Make an announcement</q-item-label>
      </q-item-section>
    </q-item>
    <q-item style="padding: 0" v-else>
      <div style="width: 100%">
        <q-editor
          @blur="
            (e) => {
              e.stopPropagation()
            }
          "
          ref="editor"
          placeholder="Make an announcement"
          v-model="announcement"
          style="width: 100%"
          :definitions="{
            upload: {
              tip: 'Upload an attachment',
              icon: 'cloud_upload',
              label: 'Upload',
              handler: uploadAttachment,
            },
          }"
          :toolbar="[
            ['left', 'center', 'right', 'justify'],
            ['bold', 'italic', 'underline', 'strike'],
            ['upload'],
          ]"
        />
        <q-btn
          flat
          unelevated
          class="float-right q-my-sm q-mr-sm"
          label="Post"
          @click="postAnnouncement"
        />
        <q-btn
          flat
          unelevated
          class="float-right q-my-sm q-mr-sm"
          label="Cancel"
          @click="
            (e) => {
              e.stopPropagation()
              announcementOpened = false
            }
          "
        />
      </div>
    </q-item>
  </q-card>
</template>

<script src="./AnnouncementCard.ts" lang="ts" />
<style src="./AnnouncementCard.sass" lang="sass" scoped />
