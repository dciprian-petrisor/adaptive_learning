<template>
<q-page class="column justify-center content-center">
    <div class="col-grow logo-svg q-mt-xl" style="min-height: 200px"></div>
    <div class="col-grow">
      <login-form class="col-8 column"/>
      <essential-link class="q-mt-md" title="No account? Register instead!" to="register"></essential-link>
    </div>
  </q-page>
</template>

<script src='./Login.ts' lang='ts'/>
