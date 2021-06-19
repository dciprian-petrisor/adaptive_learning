<template>
     <q-card>
            <q-img :src="classRoomCoverPhoto" style="height:370px">
              <div class="absolute-top text-h3 text-left" style="margin: 30px; background: none;">{{classroom.name}}</div>
              <div
                class="absolute-bottom text-left column"
                style="margin: 30px 50px 50px 30px; background: none;"
              >
                <span>Access code</span>
                <div>
                  <q-btn
                    flat
                    dense
                    unelevated
                    icon="content_copy"
                    clickable
                    v-ripple
                    size="md"
                    class="q-mr-sm"
                    label="Copy"
                    @click="onCopyAccessCode"
                  ></q-btn>
                </div>
              </div>
              <q-btn round flat icon="more_vert" class="absolute-top-right q-ma-md" v-if="isClassroomAdmin">
                <q-menu auto-close>
                  <q-list>
                    <q-item clickable @click="showClassRoomCoverPhotoDialog = true">
                      <q-item-section>Upload cover picture</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-img>
            <class-room-cover-photo-dialog
            :classroom="classroom"
            :show="showClassRoomCoverPhotoDialog"
      @updateShow="(v) => (showClassRoomCoverPhotoDialog = v)"/>
          </q-card>
</template>

<script src="./ClassRoomFeedCard.ts" lang="ts"/>
<style src="./ClassRoomFeedCard.sass" lang="sass" scoped/>
