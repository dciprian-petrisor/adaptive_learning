<template>
  <q-page class="column">
    <q-infinite-scroll
      ref="infiniteScroll"
      @load="showMorePosts"
      :disable="!hasNextPagePosts || tab !== 'feed'"
      :offset="1"
    >
      <slot name="notifications" />
      <div class="column col content-center items-center q-pa-sm q-pa-md-lg" v-if="classroom">
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
          class="col-grow"
          style="max-width: 95vw; background-color: transparent; padding: 0; margin: 0"
        >
          <q-tab-panel name="feed" class="column col" style="padding: 15px 0 0 0">
            <class-room-feed-card
              :classroom="classroom"
              @coverPhotoUpload="onCoverPhotoUpload"
            />
            <div class="row justify-center">
              <announcement-card
                :classroom="classroom"
                @announcementCreated="onAnnouncementCreated"
              />
            </div>

            <div class="row justify-center">
              <class-room-post
                v-for="(post, index) in classRoomPosts"
                :key="index"
                :post="post"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="materials" style="padding: 15px 0 0 0" class="column q-mt-xl">
            <q-tabs v-model="materialsTab" class="text-info" dense narrow-indicator>
              <q-tab :ripple="false" name="recommended" icon="star" label="Recommended" />
              <q-tab :ripple="false" name="all" icon="style" label="All" />
            </q-tabs>

            <q-tab-panels
              v-model="materialsTab"
              animated
              swipeable
              vertical
              transition-prev="slide-down"
              transition-next="slide-up"
              class="col-grow"
              style="min-width: 85vw; background: transparent"
            >
              <q-tab-panel name="recommended">
                <materials-tab :classroom="classroom" :materialType="recommendedMaterialType" />
              </q-tab-panel>

              <q-tab-panel name="all">
                <materials-tab :classroom="classroom" />
              </q-tab-panel>
            </q-tab-panels>
          </q-tab-panel>

          <q-tab-panel name="members" class="column" style="padding: 15px 0 0 0">
            <class-room-members-list
              style="min-width: 75vw;"
              :classroom="classroom"
              @classroomMembersUpdated="classroomMembersUpdated"
              @membershipUpdated="membershipUpdated"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script src="./Classroom.ts" lang="ts" />
<style src="./Classroom.sass" lang="sass" scoped />
