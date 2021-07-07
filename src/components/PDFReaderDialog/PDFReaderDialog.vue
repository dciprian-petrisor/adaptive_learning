<template>
  <q-dialog
    v-model="showDialog"
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
    full-width
    class="q-mb-xl"
  >
    <q-bar class="bg-dark" style="max-height: 30px !important">
      <q-space />
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip content-class="bg-white text-accent">Close</q-tooltip>
      </q-btn>
    </q-bar>
    <q-scroll-area
      ref="scrollArea"
      style="background: transparent; height: calc(100% - 24px)"
      :bar-style="{ background: 'black', opacity: '0.8' }"
      v-if="numPages && numPages !== 0"
    >
      <div class="bg-dark" style="height: auto;">
        <div class="pdf-container">
          <template v-for="i in numPages" >
            <div :key="i" >
              <pdf-component
                ref="pages"
                @link-clicked="c => scrollTo(c)"
                :src="src"
                :page="i"
                style="display: inline-block; width: 100%"
              />
              <div style="height: 25px" v-if="i !== numPages"></div>
            </div>
          </template>
        </div>
      </div>
    </q-scroll-area>
  </q-dialog>
</template>

<script src="./PDFReaderDialog.ts" lang="ts" />
<style src="./PDFReaderDialog.sass" lang="sass" scoped/>
