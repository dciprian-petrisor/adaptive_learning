<template>
    <q-form
      ref="profileForm"
      @submit="onSubmit"
       class="q-gutter-md"
    >
      <q-input
        ref='firstNameInput'
        filled
        v-model="updatedFirstName"
        label="Update your first name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your first name']"
      />

       <q-input
        ref='firstNameInput'
        filled
        v-model="updatedLastName"
        label="Update your last name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your last name']"
      />
      <div class="float-right">
        <q-btn ref="submitBtn" label="Save" type="submit" color="primary" class="q-mr-md" />
        <q-btn ref="cancelBtn" label="Cancel" @click="$emit('onFinished')"  color="secondary" />
      </div>
    </q-form>

</template>

<script src='./ProfileDetailsForm.ts' lang='ts'/>
