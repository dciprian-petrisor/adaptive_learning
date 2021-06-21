<template>
<q-card-section>
      <q-item class="justify-center items-center content-center" style="cursor: pointer">
        <q-item-section avatar>
          <user-avatar :user="author" size="md" > </user-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            >{{ authorName }}
            <q-item-label caption>
              {{ when }}
            </q-item-label>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section> {{ text}} </q-item-section>
      </q-item>
    </q-card-section>
</template>

<script src="./ClassRoomPostComment.ts" lang="ts" />
<style src="./ClassRoomPostComment.sass" lang="sass" scoped />
