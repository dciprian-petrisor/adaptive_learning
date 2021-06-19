<template>
  <q-page class="column justify-center content-center">
    <div class="col-grow logo-svg blue q-mt-xl" style="min-height: 200px"></div>
    <div class="col-grow">
      <register-form ref="registerFormComponent" class="col-8 column"/>
      <essential-link class="q-mt-md" title="Already have an account? Login instead!" to="login"></essential-link>
    </div>
  </q-page>
</template>

<script src='./Register.ts' lang='ts'/>
<style src="./Register.sass" lang="sass" scoped/>
