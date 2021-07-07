<template>
  <q-card class="q-mt-sm">
    <q-card-section>
      <div>
        <span class="text-h5 text-weight-regular q-ml-sm">Teachers</span>
      </div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <q-list>
        <template v-for="(teacher, index) in teachers">
          <q-item clickable v-ripple v-if="teacher" v-bind:key="index">
            <q-item-section avatar>
              <user-avatar :user="teacher.user" />
            </q-item-section>
            <q-item-section
              >{{ teacher.user.firstName }} {{ teacher.user.lastName }}</q-item-section
            >
            <q-item-section
              v-if="isTeacherOrOwner"
              class="float-right on-right"
              style="max-width: 30px"
            >
              <q-btn
                dense
                flat
                unelevated
                icon="settings"
                v-if="!isCurrentUser(teacher.user)"
              >
                <q-menu auto-close>
                  <q-list>
                    <q-item clickable @click="updateMembership(teacher.user, 'STUDENT')">
                      <q-item-section>Demote to Student</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-card-section>
    <q-card-section>
      <div>
        <span class="text-h5 text-weight-regular q-ml-sm">Students</span>
      </div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <q-list>
        <template v-for="(student, index) in students">
          <q-item clickable v-ripple :key="index" v-if="student">
            <q-item-section avatar>
              <user-avatar :user="student.user" />
            </q-item-section>
            <q-item-section
              >{{ student.user.firstName }} {{ student.user.lastName }}</q-item-section
            >
            <q-item-section
              v-if="isTeacherOrOwner"
              class="float-right on-right"
              style="max-width: 30px"
            >
              <q-btn dense flat unelevated icon="settings">
                <q-menu auto-close>
                  <q-list>
                    <q-item clickable @click="updateMembership(student.user, 'TEACHER')">
                      <q-item-section>Promote to Teacher</q-item-section>
                    </q-item>
                    <q-item clickable @click="startRemoveMember(student.user)">
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
      <q-card-section v-if="students.length === 0">
        No students have been added yet.
      </q-card-section>
    </q-card-section>
    <q-dialog v-model="shouldShowConfirmRemoveDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure you want to remove this member?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Remove"
            color="primary"
            v-close-popup
            @click="endRemoveMember"
          />
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="memberForRemoval = null"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script src="./ClassRoomMembersList.ts" lang="ts" />
<style src="./ClassRoomMembersList.sass" lang="sass" scoped />
