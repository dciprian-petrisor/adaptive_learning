<template>
 <q-dialog v-model="shouldShow">
      <q-card class="cropper-dialog">
        <q-card-section>
          <q-stepper v-model="step" header-nav ref="stepper" animated>
            <q-step
              :name="1"
              title="Upload a picture"
              color="grey-3"
              icon="photo_size_select_actual"
              :done="step > 1"
              :header-nav="step > 1"
            >
              <graphql-uploader
                ref="uploader"
                label="Select Profile Picture"
                color="secondary"
                max-file-size="1048576"
                max-files="1"
                hide-upload-btn
                accept=".jpg,.jpeg,.bmp,.png"
                :filesList="filesList"
                @fileAdded="addFile"
                @fileRemoved="removeFile"
                flat
              />

              <q-stepper-navigation>
                <q-btn
                :disable="canContinue"
                  @click="onUploadContinue"
                  color="secondary"
                  label="Continue"
                />
              </q-stepper-navigation>
            </q-step>
            <q-step
              :name="2"
              title="Crop picture"
              icon="crop"
              :color="step == 2 ? 'grey-3' : ''"
              :done="step > 2"
              :header-nav="step > 2"
            >
              <vue-cropper
                :canvas="true"
                ref="cropper"
                class="cropper"
                :src="'data:' + mimeType + ';base64, ' + loadedPictureBase64"
                stencilComponent="circle-stencil"
                default-boundaries="fill"
              ></vue-cropper>
              <q-stepper-navigation>
                <q-btn
                  @click="uploadProfilePicture"
                  color="secondary"
                  label="Continue"
                />
                <q-btn
                  flat
                  @click="onCropBack"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-card-section>

      </q-card>
    </q-dialog>

</template>

<script src='./ProfilePictureDialog.ts' lang='ts'/>
