<template>
  <q-layout view="lHr lpR fFf">
    <q-header reveal elevated class="q-py-sm bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-weight-medium">
          <router-link
            :to="{ name: 'dashboard' }"
            style="text-decoration: none; color: inherit"
          >
            <div style="width: fit-content" v-ripple.center class="relative-position">
              <q-avatar size="xl">
                <q-img alt="Logo" height="100%" src="~assets/logo-blue-small.svg" />
              </q-avatar>
              Adaptive Learning
            </div>
          </router-link>
        </q-toolbar-title>

        <q-btn flat round dense>
          <user-avatar size="xl" />
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup :to="{ name: 'profile' }">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item @click="logOut" clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer overlay v-model="left" side="left" elevated>
      <q-scroll-area style="height: calc(100% - 150px)">
        <q-list padding>
          <q-item clickable v-ripple :to="{ name: 'dashboard' }">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section> Classes </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="event_available" />
            </q-item-section>
            <q-item-section> Calendar </q-item-section>
          </q-item>

          <q-separator />
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section> Settings </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container @click="left = false">
      <router-view>
        <template v-slot:notifications>
          <q-banner class="bg-secondary text-white" v-if="showRequiresPasswordReset">
            This account's password needs to be updated.
            <template v-slot:action>
              <q-btn
                flat
                color="white"
                label="Dismiss"
                @click="passwordResetDismissed = true"
              />
              <q-btn flat color="white" label="Reset password now" :to="{name: 'profile' }" />
            </template>
          </q-banner>
          <q-banner class="bg-secondary text-white" v-if="showRequiresVerification">
            This account has not been verified yet.
            <template v-slot:action>
              <q-btn
                flat
                color="white"
                label="Dismiss"
                @click="requiresVerficationDismissed = true"
              />
              <q-btn flat color="white" label="Resend activation e-mail" />
            </template>
          </q-banner>
        </template>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script src="./MainLayout.ts" lang="ts" />

<style src="./MainLayout.sass" lang="sass" scoped />
