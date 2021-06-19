<template>
  <q-page class="column">
    <q-infinite-scroll ref="infiniteScroll" @load="showMore" :disable="!hasNextPage" :offset="1">
      <slot name="notifications" />
      <div class="column content-center">
        <h6>Welcome, {{ firstName }}!</h6>
      </div>
      <div class="row wrap justify-md-start justify-center" style="padding: 0 7vw 0 7vw; margin: 0 0 0 5vw">
        <classroom-card
          v-for="(node, index) in classroomNodes"
          :key="index"
          :node="node"
          @navigateToClassroom="(id) => navigateToClassroom(id)"
          @leaveClassroom="(id) => leaveClassroom(node)"
        >
        </classroom-card>
      </div>
       <q-page-sticky position="bottom-left" :offset="[30, 30]" v-show="hasNextPage">
            <q-icon  name="arrow_drop_down"  size="lg" color="white" />
       </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-fab icon="add" direction="up" color="primary" vertical-actions-align="right">
          <q-fab-action
            @click="showCreateClassroomDialog = true"
            label-position="left"
            label-style="font-size:13px;"
            external-label
            color="secondary"
            icon="school"
            label="Create Classroom"
          />
          <q-fab-action
            @click="showJoinClassroomDialog = true"
            label-position="left"
            label-style="font-size:13px;"
            external-label
            color="secondary"
            icon="person_add"
            label="Join Classroom"
          />
        </q-fab>
      </q-page-sticky>
        <join-class-room-dialog
        :showDialog="showJoinClassroomDialog"
        @dialogShowChanged="v => showJoinClassroomDialog = v"
        @classroomJoined="onClassroomJoinedOrCreated"
      />
      <create-class-room-dialog
        :showDialog="showCreateClassroomDialog"
        @dialogShowChanged="v => showCreateClassroomDialog = v"
        @classroomCreated="onClassroomJoinedOrCreated"
      />
      <leave-class-room-dialog @classroomLeft="onClassRoomLeft" @showChanged="(v) => showLeaveClassRoomDialog = v" :show="showLeaveClassRoomDialog" :classroom="classroomToLeave"></leave-class-room-dialog>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script src="./Dashboard.ts" lang="ts" />
<style src="./Dashboard.sass" lang="sass" scoped />
