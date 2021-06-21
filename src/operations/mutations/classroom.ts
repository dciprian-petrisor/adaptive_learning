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

export const DO_REMOVE_MEMBER_FROM_CLASSROOM = gql`
mutation DoRemoveMemberFromClassRoom($input: RemoveMemberFromClassRoomMutationInput!) {
  removeMemberFromClassroom(input: $input) {
    success,
    message,
    classroomMembers {
      edges {
        node {
          user {
            firstName
            lastName
            icon {
              path
            }
          }
          memberType
        }
      }
    }
  }
}
`

export const DO_UPDATE_MEMBERSHIP_TYPE = gql`
mutation DoUpdateMembershipType($input: UpdateUserMembershipTypeInput!) {
  updateUserMembershipType(input: $input) {
    success
    message,
    updatedMembership,
    updatedMember {
      username
    }
  }
}
`

export const DO_CREATE_CLASSROOM_POST = gql`
mutation DoCreateClassRoomPost($input: CreateClassRoomPostMutationInput!) {
  createClassroomPost(input: $input) {
    success,
    message, 
    post {
      node {
        id,
        datetime,
        text,
        author {
          id,
          username,
          firstName,
          lastName,
          icon {
            path
          }
        }
      }
    }
  }
}
`

export const DO_CREATE_POST_COMMENT = gql`
mutation DoCreatePostComment($input: CreateClassRoomPostCommentMutationInput!) {
  createClassroomPostComment(input: $input) {
    success
    comment {
      cursor
      node {
        id
        author {
          id
          username
          firstName
          lastName
          icon {
            path
          }
        }
        datetime
        text
      }
    }
  }
}
`

export const createPostComment = function (input: GraphQLTypes.DoCreatePostCommentMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoCreatePostCommentMutation, GraphQLTypes.DoCreatePostCommentMutationVariables>({
    mutation: DO_CREATE_POST_COMMENT,
    variables: input
  })
}

export const createClassRoomPost = function (input: GraphQLTypes.DoCreateClassRoomPostMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoCreateClassRoomPostMutation, GraphQLTypes.DoCreateClassRoomPostMutationVariables>({
    mutation: DO_CREATE_CLASSROOM_POST,
    variables: input
  })
}
export const updateMembershipType = function (input: GraphQLTypes.DoUpdateMembershipTypeMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoUpdateMembershipTypeMutation, GraphQLTypes.DoUpdateMembershipTypeMutationVariables>({
    mutation: DO_UPDATE_MEMBERSHIP_TYPE,
    variables: input
  })
}

export const removeMemberFromClassRoom = function (input: GraphQLTypes.DoRemoveMemberFromClassRoomMutationVariables) {
  return apolloClient.mutate<GraphQLTypes.DoRemoveMemberFromClassRoomMutation, GraphQLTypes.DoRemoveMemberFromClassRoomMutationVariables>({
    mutation: DO_REMOVE_MEMBER_FROM_CLASSROOM,
    variables: input
  })
}

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
