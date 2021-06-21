import { defineStore, DefineStoreOptions, GettersTree, Store } from 'pinia'
import * as GraphQLTypes from 'src/generated/graphql'
import { createPostComment, createClassRoomPost, leaveClassRoom, createClassRoom, joinClassRoom, uploadClassRoomCoverPhoto, removeMemberFromClassRoom, updateMembershipType } from 'src/operations/mutations/classroom'
import { getUserClassRooms } from 'src/operations/queries/classroom'
const STORE_NAME = 'classroom'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClassRoomStateInterface {
}

export interface ClassRoomActionsInterface {
  getUserClassRooms (input: GraphQLTypes.GetUserClassRoomsQueryVariables): Promise<GraphQLTypes.GetUserClassRoomsQuery>
  createPostComment (input: GraphQLTypes.DoCreatePostCommentMutationVariables): Promise<GraphQLTypes.CreateClassRoomPostCommentMutationPayload>
  createClassRoomPost (input: GraphQLTypes.DoCreateClassRoomPostMutationVariables): Promise<GraphQLTypes.CreateClassRoomPostMutationPayload>
  updateMembershipType (input: GraphQLTypes.DoUpdateMembershipTypeMutationVariables): Promise<GraphQLTypes.UpdateUserMembershipTypePayload>
  removeMemberFromClassRoom (input: GraphQLTypes.DoRemoveMemberFromClassRoomMutationVariables): Promise<GraphQLTypes.RemoveMemberFromClassRoomMutationPayload>
  uploadClassRoomCoverPhoto (input: GraphQLTypes.DoUploadClassRoomCoverPhotoMutationVariables): Promise<GraphQLTypes.UploadClassRoomCoverPhotoPayload>
  leaveClassRoom (input: GraphQLTypes.DoLeaveClassRoomMutationVariables): Promise<GraphQLTypes.LeaveClassRoomMutationPayload>
  createClassRoom (input: GraphQLTypes.DoCreateClassRoomMutationVariables): Promise<GraphQLTypes.ClassRoomType>
  joinClassRoom (input: GraphQLTypes.DoJoinClassRoomMutationVariables): Promise<GraphQLTypes.ClassRoomType>
}

export type ClassRoomStore = Store<typeof STORE_NAME, ClassRoomStateInterface, GettersTree<ClassRoomStateInterface>, ClassRoomActionsInterface>;

export const useClassRoomStore = defineStore({
  id: STORE_NAME,
  state: () => ({
  }),
  actions: {
    getUserClassRooms (input: GraphQLTypes.GetUserClassRoomsQueryVariables) {
      return getUserClassRooms(input)
        .then(result => {
          if (result.data?.myClassrooms) {
            return result.data
          } else {
            throw result
          }
        })
    },
    createPostComment (input: GraphQLTypes.DoCreatePostCommentMutationVariables) {
      return createPostComment(input)
        .then(response => {
          if (response.data?.createClassroomPostComment) {
            const result = response.data.createClassroomPostComment
            if (result.success) {
              return result
            } else {
              throw result
            }
          }
        })
    },
    createClassRoomPost (input: GraphQLTypes.DoCreateClassRoomPostMutationVariables) {
      return createClassRoomPost(input)
        .then(response => {
          if (response.data?.createClassroomPost) {
            const result = response.data.createClassroomPost
            if (result.success) {
              return result
            } else {
              throw result
            }
          }
        })
    },
    updateMembershipType (input: GraphQLTypes.DoUpdateMembershipTypeMutationVariables) {
      return updateMembershipType(input)
        .then(response => {
          if (response.data?.updateUserMembershipType) {
            const result = response.data.updateUserMembershipType
            if (result.success) {
              return result
            } else {
              throw result
            }
          }
        })
    },
    removeMemberFromClassRoom (input: GraphQLTypes.DoRemoveMemberFromClassRoomMutationVariables) {
      return removeMemberFromClassRoom(input)
        .then(response => {
          if (response.data?.removeMemberFromClassroom) {
            const result = response.data.removeMemberFromClassroom
            if (result.success) {
              return result
            } else {
              throw result
            }
          }
        })
    },
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
