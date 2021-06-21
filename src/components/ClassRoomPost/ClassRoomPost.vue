<template>
  <q-card bordered class="q-my-md" style="width: 60vw" v-if="post">
    <q-item class="justify-center items-center content-center" style="cursor: pointer">
      <q-item-section avatar>
        <user-avatar :user="author"> </user-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ authorName }}</q-item-label>
        <q-item-label caption> {{ when }} </q-item-label>
      </q-item-section>
    </q-item>

    <q-card-section class="q-mx-sm">
      <p v-html="text"></p>
    </q-card-section>

    <q-separator />
    <template v-if="comments && comments.edges">
      <div class="column items-end">
      <q-btn class="q-ma-sm" clickable rounded flat unelevated no-caps label="View older comments" @click="showMore" v-if="hasNextPage"></q-btn>
      </div>
      <template v-for="(c, index) in commentsOrdered">
        <div v-if="c && c.node" :key="index">
          <classroom-post-comment :comment="c.node" />
          <q-separator />
        </div>
      </template>
    </template>

    <q-card-section>
      <q-item>
        <q-input
          bottom-slots
          v-model="newComment"
          label="Write a comment"
          counter
          maxlength="300"
          style="width: 100%"
          v-on:keyup.enter="createComment"
        >
          <template v-slot:before>
            <user-avatar :user="user" />
          </template>

          <template v-slot:append>
            <q-icon
              v-if="newComment !== ''"
              name="close"
              @click="newComment = ''"
              class="cursor-pointer"
            />
          </template>

          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="createComment" :disable="!newComment"  />
          </template>
        </q-input>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script src="./ClassRoomPost.ts" lang="ts" />
<style src="./ClassRoomPost.sass" lang="sass" scoped />
