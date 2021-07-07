import { gql } from '@apollo/client/core'
import apolloClient from 'src/utils/graphql'
import * as GraphQLTypes from 'src/generated/graphql'

export const GET_CLASSROOM = gql`
query GetClassRoom($id: ID!, $after: String, $first:Int!, $orderBy: String) {
  classroom(id: $id) {
    id
    name
    description
    accessCode
    coverPhoto {
      path
      originalFileName
    }
    myMembership {
      memberType
    },
    classroomPosts(orderBy: $orderBy, after: $after, first: $first) {
      pageInfo {
        hasNextPage,
        startCursor,
        endCursor
    },
      edges {
        cursor
        node {
          id,
          hasAttachments,
          postAttachments {
            originalFileName,
            path
          },
          author {
            username,
            firstName,
            lastName,
            icon {
              path
            }
          },
          datetime,
          text
        }
      }
    },
    classroomMembers {
      edges {
        node {
          user {
            id
            username
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

export const GET_USER_CLASSROOMS = gql`
query GetUserClassRooms($after: String, $first:Int) {
  myClassrooms(after: $after, first: $first) {
    pageInfo {
      hasNextPage,
      startCursor,
      endCursor
    }
      edges {
          cursor
          node {
              id,
              name,
              description,
              accessCode,
              coverPhoto {
                path,
                originalFileName
              },
              myMembership {
                memberType
              }
          }
      }
  }
}
`

export const GET_POST_COMMENTS = gql`
query GetPostComments($orderBy: String, $postId: ID!, $after: String, $first: Int!) {
  comments(postId: $postId, orderBy:$orderBy, after: $after, first: $first) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
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

export const GET_CLASSROOM_MATERIALS = gql`
query GetClassroomMaterials ($orderBy: String, $classroomId: ID!, $after: String, $first: Int!, $materialType: String) {
  classroomMaterials(classroomId:$classroomId, orderBy:$orderBy, first:$first, after:$after, materialType:$materialType){
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor,
      node {
        mimeType,
        materialType,
        datetime,
        author  {
          firstName,
          lastName,
          icon {
            path
          }
        },
        originalFileName,
        path
      }
    }
  }
}`

export const getClassroomMaterials = function (payload: GraphQLTypes.GetClassroomMaterialsQueryVariables) {
  return apolloClient.query<GraphQLTypes.GetClassroomMaterialsQuery, GraphQLTypes.GetClassroomMaterialsQueryVariables>({
    query: GraphQLTypes.GetClassroomMaterials,
    variables: payload
  })
}

export const getClassRoom = function (payload: GraphQLTypes.GetClassRoomQueryVariables) {
  return apolloClient.query<GraphQLTypes.GetClassRoomQuery, GraphQLTypes.GetClassRoomQueryVariables>({
    query: GraphQLTypes.GetClassRoom,
    variables: payload
  })
}

export const getUserClassRooms = function (payload: GraphQLTypes.GetUserClassRoomsQueryVariables) {
  return apolloClient.query<GraphQLTypes.GetUserClassRoomsQuery, GraphQLTypes.GetUserClassRoomsQueryVariables>({
    query: GraphQLTypes.GetUserClassRooms,
    variables: payload
  })
}
