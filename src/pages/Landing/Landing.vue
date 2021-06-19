<template>
  <q-page class="row reverse-md q-pa-md justify-center" >
    <div class="column col-4 col-md-6 no-wrap justify-center">
      <div class="col-3 logo-svg"></div>
      <div class="col-auto self-center q-mt-xl text-h4 text-weight-thin text-center text-uppercase text-no-wrap">Adaptive Learning</div>
      <div class="col-auto self-center q-mt-xl text-subtitle1 text-weight-regular text-center q-mb-xl">The smart online learning platform.</div>
      <div class="column col-auto self-center">
      <q-btn ref='signUpBtn' class="q-mb-md" label="Sign Up" color="secondary" to="/register" />
      <q-btn ref='loginBtn' class="q-mb-md" label="Login" color="primary" to="login"/>
      </div>
    </div>
    <div class="row col-0 col-md-6 justify-center landing-splash-svg-container">
      <div class="col-grow landing-splash-svg"/>
    </div>
  </q-page>
</template>

<script src='./Landing.ts' lang='ts'/>
<style src='./Landing.sass' lang="sass" scoped/>
