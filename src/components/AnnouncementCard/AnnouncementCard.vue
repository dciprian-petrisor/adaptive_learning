<template>
  <q-card bordered class="q-my-md card-shadow announcement-card">
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
        <div class="column q-ma-sm" v-if="files.length !== 0">
          <span class="text-center text-subtitle2 q-ma-sm"> Attachments </span>
          <announcement-attachment
           class="q-ma-sm q-py-sm"
            v-for="f in files"
            :key="f.name + f.lastModified + f.size + f.type"
            :value="fileMaterialType.get(f)"
            :file="f"
            @change="(e) => updateAttachmentType(f, e)"
            @removeAttachment="removeAttachment"
            >
          </announcement-attachment>
        </div>
        <q-editor
          @blur="
            (e) => {
              e.stopPropagation()
            }
          "
          ref="editor"
          placeholder="Make an announcement"
          v-model="announcement"
          :content-style="{ 'overflow-wrap': 'anywhere' }"
          style="width: 100%"
          :definitions="editorDefinitions"
          :toolbar="toolbarOptions"
        />
        <q-btn
          flat
          unelevated
          class="float-right q-my-sm q-mr-sm"
          label="Post"
          :disable="canPost"
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
    <input ref="fileInput" type="file" accept="application/pdf,video/mp4,audio/mp3" @change="previewFiles" multiple hidden />
  </q-card>
</template>

<script src="./AnnouncementCard.ts" lang="ts" />
<style src="./AnnouncementCard.sass" lang="sass" scoped />
