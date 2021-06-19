import { gql } from '@apollo/client/core'
import apolloClient from 'src/utils/graphql'
import * as GraphQLTypes from 'src/generated/graphql'

export const DO_CREATE_CLASSROOM = gql`
mutation DoCreateClassRoom($input: CreateClassRoomMutationInput!) {
  createClassroom(input:$input) {
    success,
    classroom {
        id,
        name,
        description
    }
  }
}
`
export const DO_JOIN_CLASSROOM = gql`
mutation DoJoinClassRoom($input: JoinClassRoomMutationInput!) {
    joinClassroom(input:$input) {
      success,
      message,
      classroom {
        id,
        name,
        description
      }
    }
}
`

export const DO_LEAVE_CLASSROOM = gql`
mutation DoLeaveClassRoom($input: LeaveClassRoomMutationInput!) {
  leaveClassroom(input:$input){
    success,
    message
  }
}
`

export const DO_UPLOAD_CLASSROOM_COVER_PHOTO = gql`
mutation DoUploadClassRoomCoverPhoto($input: UploadClassRoomCoverPhotoInput!) {
  uploadClassroomCoverPhoto(input: $input) {
    success,
    message,
    classroom {
      name,
      coverPhoto {
        path,
        originalFileName
      }
    }
  }
}
 `

export const uploadClassRoomCoverPhoto = function (input: GraphQLTypes.DoUploadClassRoomCoverPhotoMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoUploadClassRoomCoverPhotoMutation, GraphQLTypes.DoUploadClassRoomCoverPhotoMutationVariables>({
    mutation: DO_UPLOAD_CLASSROOM_COVER_PHOTO,
    variables: input
  })
}

export const leaveClassRoom = function (input: GraphQLTypes.DoLeaveClassRoomMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoLeaveClassRoomMutation, GraphQLTypes.DoLeaveClassRoomMutationVariables>({
    mutation: DO_LEAVE_CLASSROOM,
    variables: input
  })
}

export const createClassRoom = function (input: GraphQLTypes.DoCreateClassRoomMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoCreateClassRoomMutation, GraphQLTypes.DoCreateClassRoomMutationVariables>({
    mutation: DO_CREATE_CLASSROOM,
    variables: input
  })
}

export const joinClassRoom = function (input: GraphQLTypes.DoJoinClassRoomMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoJoinClassRoomMutation, GraphQLTypes.DoJoinClassRoomMutationVariables>({
    mutation: DO_JOIN_CLASSROOM,
    variables: input
  })
}
