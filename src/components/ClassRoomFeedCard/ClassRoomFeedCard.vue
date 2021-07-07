<template>
     <q-card class="classroom-feed-card">
            <q-img :src="classRoomCoverPhoto" style="height:350px;" img-class="darkened-bg">
              <div class="absolute-top text-h3 text-left" style="margin-top: 50px; background: none; word-break: all">
                <span>{{classroom.name}}</span>
                <br/>
                <span class="text-subtitle2" style="margin: 2%;" >{{classroom.description}}</span>
                </div>
              <div v-if="isClassroomAdmin"
                class="absolute-bottom text-left column"
                style="margin: 1% ; background: none;"
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
              <q-btn round flat icon="more_vert" class="absolute-top-right q-ma-md"  v-if="isClassroomAdmin">
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
            @success="onCoverPhotoUploadSuccess"
            @updateShow="(v) => (showClassRoomCoverPhotoDialog = v)"/>
          </q-card>
</template>

<script src="./ClassRoomFeedCard.ts" lang="ts"/>
<style src="./ClassRoomFeedCard.sass" lang="sass" scoped/>
