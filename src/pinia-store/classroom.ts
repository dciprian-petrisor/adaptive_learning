import { defineStore, DefineStoreOptions, GettersTree, Store } from 'pinia'
import * as GraphQLTypes from 'src/generated/graphql'
import { leaveClassRoom, createClassRoom, joinClassRoom, uploadClassRoomCoverPhoto } from 'src/operations/mutations/classroom'
const STORE_NAME = 'classroom'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClassRoomStateInterface {
}

export interface ClassRoomActionsInterface {
  uploadClassRoomCoverPhoto (input: GraphQLTypes.DoUploadClassRoomCoverPhotoMutationVariables): Promise<GraphQLTypes.UploadClassRoomCoverPhotoPayload>
  leaveClassRoom(input: GraphQLTypes.DoLeaveClassRoomMutationVariables): Promise<GraphQLTypes.LeaveClassRoomMutationPayload>
  createClassRoom(input: GraphQLTypes.DoCreateClassRoomMutationVariables): Promise<GraphQLTypes.AllowAuthenticatedClassRoomType>
  joinClassRoom(input: GraphQLTypes.DoJoinClassRoomMutationVariables): Promise<GraphQLTypes.AllowAuthenticatedClassRoomType>
}

export type ClassRoomStore = Store<typeof STORE_NAME, ClassRoomStateInterface, GettersTree<ClassRoomStateInterface>, ClassRoomActionsInterface>;

export const useClassRoomStore = defineStore({
  id: STORE_NAME,
  state: () => ({
  }),
  actions: {
    uploadClassRoomCoverPhoto (input: GraphQLTypes.DoUploadClassRoomCoverPhotoMutationVariables) {
      return uploadClassRoomCoverPhoto(input)
        .then(response => {
          if (response.data?.uploadClassroomCoverPhoto) {
            const result = response.data.uploadClassroomCoverPhoto
            if (result.success) {
              return result
            } else {
              throw result
            }
          }
        })
    },
    leaveClassRoom (input: GraphQLTypes.DoLeaveClassRoomMutationVariables) {
      return leaveClassRoom(input)
        .then(response => {
          if (response.data?.leaveClassroom) {
            const result = response.data.leaveClassroom
            if (result.success) {
              return result
            } else {
              throw result
            }
          }
          throw response.errors
        })
    },
    createClassRoom (input: GraphQLTypes.DoCreateClassRoomMutationVariables) {
      return createClassRoom(input)
        .then(response => {
          if (response.data?.createClassroom) {
            const result = response.data.createClassroom
            if (result.success && result.classroom) {
              return result.classroom
            } else {
              throw result
            }
          }
          throw response.errors
        })
    },
    joinClassRoom (input: GraphQLTypes.DoJoinClassRoomMutationVariables) {
      return joinClassRoom(input)
        .then(response => {
          if (response.data?.joinClassroom) {
            const result = response.data.joinClassroom
            if (result.success && result.classroom) {
              return result.classroom
            } else {
              throw result
            }
          }
          throw response.errors
        })
    }
  }
} as DefineStoreOptions<typeof STORE_NAME, ClassRoomStateInterface, GettersTree<ClassRoomStateInterface>, ClassRoomActionsInterface>)
