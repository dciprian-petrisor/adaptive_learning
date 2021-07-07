<template>
  <q-card bordered class="q-my-md classroom-post-card" v-if="post">
    <q-item class="justify-center items-center content-center" style="cursor: pointer">
      <q-item-section avatar>
        <user-avatar :user="author"> </user-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ authorName }}</q-item-label>
        <q-item-label caption> {{ when }} </q-item-label>
      </q-item-section>

      <q-item-section
        v-if="post.hasAttachments"
        class="float-right on-right"
        style="max-width: fit-content"
      >
        <div class="row">
          <q-btn
            class="text-right"
            flat
            dense
            :icon-right="materialsExpanded ? 'expand_less' : 'expand_more'"
            @click="materialsExpanded = !materialsExpanded"
          >
            <q-item-label caption v-if="post.hasAttachments" class="q-my-sm">
              View Materials</q-item-label
            >
          </q-btn>
        </div>
      </q-item-section>
    </q-item>

    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-card-section class="q-mt-sm q-mb-sm" v-if="materialsExpanded">
        <q-card-section
          v-for="(attachment, index) in post.postAttachments"
          :key="index"
          style="padding: 5px"
        >
          <q-form method="get" :action="formatDownloadLink(attachment.path)">
            <q-btn style="background-color: #23b3ea52;" class="material-download-btn" type="submit" unelevated dense>
              <div
                style="min-width: 30%; max-width: 80vw"
                class="ellipsis"
                :title="attachment.originalFileName"
              >
                <q-icon name="download" />
                {{ attachment.originalFileName }}
              </div>
            </q-btn>
          </q-form>
        </q-card-section>
        <q-separator />
      </q-card-section>
    </transition>
    <q-card-section class="q-mx-sm">
      <p v-html="text" style="overflow-wrap: anywhere"></p>
    </q-card-section>

    <q-separator inset />
    <template v-if="comments && comments.edges">
      <div class="column items-center items-md-end q-mb-xl q-mb-md-sm" style="height: 0">
        <q-btn
          class="q-ma-sm"
          style="z-index: 1"
          clickable
          rounded
          flat
          unelevated
          no-caps
          label="View older comments"
          @click="showMore"
          v-if="hasNextPage"
        ></q-btn>
      </div>
      <template v-for="(c, index) in commentsOrdered">
        <div v-if="c && c.node" :key="index">
          <classroom-post-comment :comment="c.node" />
          <q-separator inset />
        </div>
      </template>
    </template>

    <q-card-section>
      <q-item style="padding: 0">
        <q-input
          bottom-slots
          v-model="newComment"
          label="Write a comment"
          counter
          maxlength="300"
          style="width: 100%; min-width: 60%"
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
            <q-btn
              round
              dense
              flat
              icon="send"
              @click="createComment"
              :disable="!newComment"
            />
          </template>
        </q-input>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script src="./ClassRoomPost.ts" lang="ts" />
<style src="./ClassRoomPost.sass" lang="sass" scoped />
