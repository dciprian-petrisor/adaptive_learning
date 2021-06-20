<template>
  <q-page class="column">
    <slot name="notifications" />
    <div class="column col content-center q-pa-lg" v-if="classroom">
      <q-tabs
        v-model="tab"
        dense
        narrow-indicator
        align="justify"
        class="text-secondary"
        active-color="primary"
      >
        <q-tab :ripple="false" name="feed" icon="forum" label="Feed" />
        <q-tab :ripple="false" name="materials" icon="description" label="Materials" />
        <q-tab :ripple="false" name="members" icon="people" label="Members" />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        swipeable
        class="col"
        style="width: 55vw; background-color: transparent; padding: 0; margin: 0"
      >
        <q-tab-panel name="feed" class="column col" style="padding: 15px 0 0 0">
          <class-room-feed-card :classroom="classroom"/>
          <div class="row justify-center">
            <announcement-card/>
          </div>
        </q-tab-panel>

        <q-tab-panel name="materials">
          <div class="text-h4 q-mb-md">Alarms</div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium
            cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi
            minima assumenda consectetur culpa fuga nulla ullam. In, libero.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium
            cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi
            minima assumenda consectetur culpa fuga nulla ullam. In, libero.
          </p>
        </q-tab-panel>

        <q-tab-panel name="members" class="column col" style="padding: 15px 0 0 0">
          <class-room-members-list :classroom="classroom"/>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script src="./Classroom.ts" lang="ts" />
<style src="./Classroom.sass" lang="sass" scoped />
