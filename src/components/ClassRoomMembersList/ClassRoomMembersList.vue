<template>
  <q-card class="q-mt-sm">
    <q-card-section>
      <div>
        <span class="text-h5 text-weight-regular q-ml-sm">Teachers</span>
        <q-btn
          unelevated
          dense
          flat
          class="on-right float-right q-mr-sm"
          icon="person_add_alt_1"
        ></q-btn>
      </div>
    </q-card-section>
    <q-separator class="q-mx-lg" />
    <q-card-section>
      <q-list>
        <q-item clickable v-ripple v-for="teacher, index in teachers" :key="index" >
          <div v-if="teacher" style="display: inherit">
          <q-item-section avatar >
            <user-avatar :user="teacher.user"/>
          </q-item-section>
          <q-item-section>{{teacher.user.firstName}} {{teacher.user.lastName}}</q-item-section>
          </div>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section>
      <div>
        <span class="text-h5 text-weight-regular q-ml-sm">Students</span>
        <q-btn
          unelevated
          dense
          flat
          class="on-right float-right q-mr-sm"
          icon="person_add_alt_1"
        ></q-btn>
      </div>
    </q-card-section>
    <q-separator class="q-mx-lg" />
    <q-card-section>
      <q-list>
        <q-item clickable v-ripple v-for="student, index in students" :key="index" >
          <div v-if="student" style="display: inherit">
          <q-item-section avatar >
            <user-avatar :user="student.user"/>
          </q-item-section>
          <q-item-section>{{student.user.firstName}} {{student.user.lastName}}</q-item-section>
          </div>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script src="./ClassRoomMembersList.ts" lang="ts" />
<style src="./ClassRoomMembersList.sass" lang="sass" scoped />
