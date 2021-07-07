<template>
  <q-scroll-area style="height: 65vh; background: transparent; min-width:80vw">
    <q-infinite-scroll ref="infiniteScroll" @load="showMore" :disable="!hasNextPage" v-if="classroomMaterials">
      <div v-for="(m, index) in classroomMaterials.edges" :key="index">
        <material-card v-if="m && m.node" :material="m.node" class="q-my-md" style="min-height:65px" />
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
    <div v-if="!classroomMaterials || !classroomMaterials.edges || !classroomMaterials.edges.length">No materials available.</div>
  </q-scroll-area>
</template>

<script src="./MaterialsTab.ts" lang="ts" />
<style src="./MaterialsTab.sass" lang="sass" scoped />
