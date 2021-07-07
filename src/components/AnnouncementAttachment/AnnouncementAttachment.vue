<template>
<q-card style="background-color: #23b3ea52">
  <q-icon name="attachment" size="sm" class="q-mx-sm"> </q-icon>
  <span :title="file.name" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width:40vw; display: inline-block" class="q-mx-sm">{{ file.name }}</span>
  <q-select
    :options="materialTypes"
    class="q-mx-sm"
    dense
    label="Material Type"
    v-model="typeValue"
    style="min-width: 150px; display: inline-block"
  >
  </q-select>
  <q-btn class="q-mx-sm float-right on-right" unelevated dense round icon="close" size="md" @click="$emit('removeAttachment', file)">
  </q-btn>
</q-card>
</template>

<script src="./AnnouncementAttachment.ts" lang="ts" />
<style src="./AnnouncementAttachment.sass" lang="sass" scoped />
