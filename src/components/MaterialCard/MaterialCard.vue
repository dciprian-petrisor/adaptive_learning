<template>
  <q-card flat bordered>
    <span class="q-focus-helper"></span>
    <q-item
      v-ripple
      class="q-hoverable column"
      style="cursor: pointer"
      @click="expanded = !expanded"
      clickable
    >
      <div class="row">
        <q-item-section avatar style="padding: 0" class="col-auto q-mr-sm">
          <q-icon name="assignment" size="md" color="info" />
        </q-item-section>
        <q-item-section class="col" style="min-width: 30%">
          <div
            class="ellipsis"
            style="min-width: 30%; max-width: 80%"
            :title="materialName"
          >
            {{ materialName }}
          </div>
        </q-item-section>
        <q-item-section class="q-mt-sm col-auto">
          <q-item-label caption> {{ authorName }}</q-item-label>
          <q-item-label caption> {{ when }}</q-item-label>
        </q-item-section>
      </div>
    </q-item>
    <q-slide-transition>
      <div v-show="expanded && !isPdfMaterial">
        <q-separator />
        <q-card-section>
          <q-media-player
            v-if="isVideoMaterial"
            content-style="max-height:50vh;"
            type="video"
            mobile-mode
            :sources="[
              {
                src: materialUri,
              },
            ]"
          />
          <q-media-player
            v-else-if="isAudioMaterial"
            type="audio"
            mobile-mode
            :sources="[
              {
                src: materialUri,
              },
            ]"
          />
        </q-card-section>
      </div>
    </q-slide-transition>
    <pdf-reader-dialog :material="material" :shouldShow="expanded && isPdfMaterial" @updateShouldShow="(v) => expanded = v "/>
  </q-card>
</template>

<script src="./MaterialCard.ts" lang="ts" />
<style src="./MaterialCard.sass" lang="sass" scoped />
