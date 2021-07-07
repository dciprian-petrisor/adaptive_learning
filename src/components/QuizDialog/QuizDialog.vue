<template>
  <q-dialog
    v-model="shouldShowDialog"
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
  >
    <q-card class="bg-secondary text-white" style="width: 750px; max-width: 80vw">
      <q-card-section style="height: 100%">
        <q-stepper v-model="step" ref="stepper" class="bg-secondary" style="height: 100%">
          <q-step
            :name="1"
            title="Complete quiz"
            icon="quiz"
            :done="step > 1"
            style="height: 100%"
            color="grey-5"
            active-color="grey-3"
          >
            <q-card-section>
              <div class="text-h6 text-center">Determine your learning style!</div>
            </q-card-section>
            <q-card-section class="text-subtitle2">
              In order to offer good recommendations, please answer the questions below
              according to your experience.<br />
              If multiple answers fit, choose the one that fits best for you.
            </q-card-section>
            <q-separator class="q-mb-md" />
            <q-scroll-area style="max-height: 70vh; min-height: 50vh; height: 50vh">
              <q-card-section>
                <q-form class="q-mt-md">
                  <template v-for="(q, index) in questions">
                    <div class="q-mt-md" :key="index">
                      <span>{{ index + 1 }}. {{ q.text }}</span>
                      <q-option-group
                        type="radio"
                        :options="q.options"
                        v-model="q.answer"
                      />
                    </div>
                  </template>
                </q-form>
              </q-card-section>
            </q-scroll-area>
            <q-separator class="q-mt-lg" />
            <q-btn-group
              flat
              unelevated
              class="float-right q-mb-sm q-mr-sm"
              style="height: 30px"
            >
              <q-btn label="Skip" @click="skip"></q-btn>
              <q-btn label="Next" @click="next" :disable="!complete"></q-btn>
            </q-btn-group>
          </q-step>
          <q-step
            :name="2"
            title="Get results"
            icon="poll"
            :done="step > 2"
            color="grey-5"
          >
            <q-card-section>
              <div class="text-h6 text-center">Results</div>
            </q-card-section>
            <q-card-section class="text-subtitle2">
              Your answers to the quiz reveal the following patterns:
            </q-card-section>
            <ul>
              <li v-for="(t, index) in dimensionResults" :key="index" v-html="t.message"/>
            </ul>
            <q-separator />
            <q-btn
              class="float-right q-mb-sm q-mr-sm"
              unelevated
              flat
              label="Finish"
              @click="finish"
            ></q-btn>
          </q-step>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script src="./QuizDialog.ts" lang="ts" />
<style src="./QuizDialog.sass" lang="sass" />
