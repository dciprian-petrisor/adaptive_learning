import { DateTime } from 'luxon';
import { ExpectedErrorType } from './extra';
import { Upload } from './extra';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: DateTime;
  /**
   *
   *     Errors messages and codes mapped to
   *     fields or non fields errors.
   *     Example:
   *     {
   *         field_name: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         other_field: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         nonFieldErrors: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ]
   *     }
   *
   */
  ExpectedErrorType: ExpectedErrorType;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: Upload;
};

export type AllowSelfAlUserType = Node & {
  __typename?: 'AllowSelfALUserType';
  /** The ID of the object. */
  id: Scalars['ID'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  dateJoined: Scalars['DateTime'];
  icon?: Maybe<PrivateMediaType>;
  requiresPasswordReset: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  hasCompletedQuiz: Scalars['Boolean'];
  learningMaterialPreference: AlUserLearningMaterialPreference;
  classroomMemberships: ClassRoomMembershipTypeConnection;
  materials: ClassRoomMaterialTypeConnection;
  posts: ClassRoomPostTypeConnection;
  postComments: ClassRoomPostCommentTypeConnection;
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean'];
  pk?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  secondaryEmail?: Maybe<Scalars['String']>;
};


export type AllowSelfAlUserTypeClassroomMembershipsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['ID']>;
  classroom?: Maybe<Scalars['ID']>;
  memberType?: Maybe<Scalars['String']>;
};


export type AllowSelfAlUserTypeMaterialsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type AllowSelfAlUserTypePostsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type AllowSelfAlUserTypePostCommentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  author?: Maybe<Scalars['ID']>;
  datetime?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  post?: Maybe<Scalars['ID']>;
};

/** An enumeration. */
export enum AlUserLearningMaterialPreference {
  /** Visual */
  Visual = 'VISUAL',
  /** Verbal */
  Verbal = 'VERBAL'
}

export type AlUserType = Node & {
  __typename?: 'ALUserType';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  dateJoined: Scalars['DateTime'];
  icon?: Maybe<PrivateMediaType>;
};

export type AlUserTypeConnection = {
  __typename?: 'ALUserTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AlUserTypeEdge>>;
};

/** A Relay edge containing a `ALUserType` and its cursor. */
export type AlUserTypeEdge = {
  __typename?: 'ALUserTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<AlUserType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/**
 * Archive account and revoke refresh tokens.
 *
 * User must be verified and confirm password.
 */
export type ArchiveAccount = {
  __typename?: 'ArchiveAccount';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/** An enumeration. */
export enum ClassRoomMaterialMaterialType {
  /** Visual */
  Visual = 'VISUAL',
  /** Verbal */
  Verbal = 'VERBAL'
}

export type ClassRoomMaterialType = Node & {
  __typename?: 'ClassRoomMaterialType';
  mimeType: Scalars['String'];
  materialType: ClassRoomMaterialMaterialType;
  datetime: Scalars['DateTime'];
  author: AlUserType;
  classroom: ClassRoomType;
  originalFileName?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type ClassRoomMaterialTypeConnection = {
  __typename?: 'ClassRoomMaterialTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ClassRoomMaterialTypeEdge>>;
};

/** A Relay edge containing a `ClassRoomMaterialType` and its cursor. */
export type ClassRoomMaterialTypeEdge = {
  __typename?: 'ClassRoomMaterialTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ClassRoomMaterialType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** An enumeration. */
export enum ClassRoomMembershipMemberType {
  /** Student */
  Student = 'STUDENT',
  /** Teacher */
  Teacher = 'TEACHER',
  /** Owner */
  Owner = 'OWNER'
}

export type ClassRoomMembershipType = Node & {
  __typename?: 'ClassRoomMembershipType';
  /** The ID of the object. */
  id: Scalars['ID'];
  user: AlUserType;
  classroom: ClassRoomType;
  memberType: ClassRoomMembershipMemberType;
};

export type ClassRoomMembershipTypeConnection = {
  __typename?: 'ClassRoomMembershipTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ClassRoomMembershipTypeEdge>>;
};

/** A Relay edge containing a `ClassRoomMembershipType` and its cursor. */
export type ClassRoomMembershipTypeEdge = {
  __typename?: 'ClassRoomMembershipTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ClassRoomMembershipType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ClassRoomPostCommentType = Node & {
  __typename?: 'ClassRoomPostCommentType';
  /** The ID of the object. */
  id: Scalars['ID'];
  author: AlUserType;
  datetime: Scalars['DateTime'];
  text: Scalars['String'];
  post: ClassRoomPostType;
};

export type ClassRoomPostCommentTypeConnection = {
  __typename?: 'ClassRoomPostCommentTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ClassRoomPostCommentTypeEdge>>;
};

/** A Relay edge containing a `ClassRoomPostCommentType` and its cursor. */
export type ClassRoomPostCommentTypeEdge = {
  __typename?: 'ClassRoomPostCommentTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ClassRoomPostCommentType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ClassRoomPostType = Node & {
  __typename?: 'ClassRoomPostType';
  /** The ID of the object. */
  id: Scalars['ID'];
  datetime: Scalars['DateTime'];
  author: AlUserType;
  text: Scalars['String'];
  classroom: ClassRoomType;
  postComments: ClassRoomPostCommentTypeConnection;
  postAttachments: Array<PrivateMediaType>;
  hasAttachments?: Maybe<Scalars['Boolean']>;
};


export type ClassRoomPostTypePostCommentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  author?: Maybe<Scalars['ID']>;
  datetime?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  post?: Maybe<Scalars['ID']>;
};

export type ClassRoomPostTypeConnection = {
  __typename?: 'ClassRoomPostTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ClassRoomPostTypeEdge>>;
};

/** A Relay edge containing a `ClassRoomPostType` and its cursor. */
export type ClassRoomPostTypeEdge = {
  __typename?: 'ClassRoomPostTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ClassRoomPostType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ClassRoomType = Node & {
  __typename?: 'ClassRoomType';
  name: Scalars['String'];
  description: Scalars['String'];
  coverPhoto?: Maybe<PrivateMediaType>;
  classroomMembers: ClassRoomMembershipTypeConnection;
  classroomMaterials: ClassRoomMaterialTypeConnection;
  /** The ID of the object. */
  id: Scalars['ID'];
  accessCode?: Maybe<Scalars['String']>;
  myMembership?: Maybe<ClassRoomMembershipType>;
  classroomPosts?: Maybe<ClassRoomPostTypeConnection>;
};


export type ClassRoomTypeClassroomMembersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['ID']>;
  classroom?: Maybe<Scalars['ID']>;
  memberType?: Maybe<Scalars['String']>;
};


export type ClassRoomTypeClassroomMaterialsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type ClassRoomTypeClassroomPostsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  datetime?: Maybe<Scalars['DateTime']>;
  author?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  classroom?: Maybe<Scalars['ID']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type ClassRoomTypeConnection = {
  __typename?: 'ClassRoomTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ClassRoomTypeEdge>>;
};

/** A Relay edge containing a `ClassRoomType` and its cursor. */
export type ClassRoomTypeEdge = {
  __typename?: 'ClassRoomTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ClassRoomType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type CreateClassRoomMutationInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateClassRoomMutationPayload = {
  __typename?: 'CreateClassRoomMutationPayload';
  success?: Maybe<Scalars['Boolean']>;
  classroom?: Maybe<ClassRoomType>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateClassRoomPostCommentMutationInput = {
  datetime: Scalars['DateTime'];
  text: Scalars['String'];
  postId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateClassRoomPostCommentMutationPayload = {
  __typename?: 'CreateClassRoomPostCommentMutationPayload';
  success?: Maybe<Scalars['Boolean']>;
  comment?: Maybe<ClassRoomPostCommentTypeEdge>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateClassRoomPostMutationInput = {
  mimeTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  materialTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  files?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  datetime: Scalars['DateTime'];
  text: Scalars['String'];
  classroomId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateClassRoomPostMutationPayload = {
  __typename?: 'CreateClassRoomPostMutationPayload';
  success?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  post?: Maybe<ClassRoomPostTypeEdge>;
  clientMutationId?: Maybe<Scalars['String']>;
};


/**
 * Delete account permanently or make `user.is_active=False`.
 *
 * The behavior is defined on settings.
 * Anyway user refresh tokens are revoked.
 *
 * User must be verified and confirm password.
 */
export type DeleteAccount = {
  __typename?: 'DeleteAccount';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};



export type JoinClassRoomMutationInput = {
  accessCode: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type JoinClassRoomMutationPayload = {
  __typename?: 'JoinClassRoomMutationPayload';
  success?: Maybe<Scalars['Boolean']>;
  classroom?: Maybe<ClassRoomType>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type LeaveClassRoomMutationInput = {
  id: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type LeaveClassRoomMutationPayload = {
  __typename?: 'LeaveClassRoomMutationPayload';
  success?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Register user with fields defined in the settings.
   *
   * If the email field of the user model is part of the
   * registration fields (default), check if there is
   * no user with that email or as a secondary email.
   *
   * If it exists, it does not register the user,
   * even if the email field is not defined as unique
   * (default of the default django user model).
   *
   * When creating the user, it also creates a `UserStatus`
   * related to that user, making it possible to track
   * if the user is archived, verified and has a secondary
   * email.
   *
   * Send account verification email.
   *
   * If allowed to not verified users login, return token.
   */
  register?: Maybe<Register>;
  /**
   * Verify user account.
   *
   * Receive the token that was sent by email.
   * If the token is valid, make the user verified
   * by making the `user.status.verified` field true.
   */
  verifyAccount?: Maybe<VerifyAccount>;
  /**
   * Sends activation email.
   *
   * It is called resend because theoretically
   * the first activation email was sent when
   * the user registered.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  resendActivationEmail?: Maybe<ResendActivationEmail>;
  /**
   * Send password reset email.
   *
   * For non verified users, send an activation
   * email instead.
   *
   * Accepts both primary and secondary email.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmail>;
  /**
   * Change user password without old password.
   *
   * Receive the token that was sent by email.
   *
   * If token and new passwords are valid, update
   * user password and in case of using refresh
   * tokens, revoke all of them.
   *
   * Also, if user has not been verified yet, verify it.
   */
  passwordReset?: Maybe<PasswordReset>;
  /**
   * Change account password when user knows the old password.
   *
   * A new token and refresh token are sent. User must be verified.
   */
  passwordChange?: Maybe<PasswordChange>;
  /**
   * Archive account and revoke refresh tokens.
   *
   * User must be verified and confirm password.
   */
  archiveAccount?: Maybe<ArchiveAccount>;
  /**
   * Delete account permanently or make `user.is_active=False`.
   *
   * The behavior is defined on settings.
   * Anyway user refresh tokens are revoked.
   *
   * User must be verified and confirm password.
   */
  deleteAccount?: Maybe<DeleteAccount>;
  /**
   * Update user model fields, defined on settings.
   *
   * User must be verified.
   */
  updateAccount?: Maybe<UpdateAccount>;
  /**
   * Send activation to secondary email.
   *
   * User must be verified and confirm password.
   */
  sendSecondaryEmailActivation?: Maybe<SendSecondaryEmailActivation>;
  /**
   * Verify user secondary email.
   *
   * Receive the token that was sent by email.
   * User is already verified when using this mutation.
   *
   * If the token is valid, add the secondary email
   * to `user.status.secondary_email` field.
   *
   * Note that until the secondary email is verified,
   * it has not been saved anywhere beyond the token,
   * so it can still be used to create a new account.
   * After being verified, it will no longer be available.
   */
  verifySecondaryEmail?: Maybe<VerifySecondaryEmail>;
  /**
   * Swap between primary and secondary emails.
   *
   * Require password confirmation.
   */
  swapEmails?: Maybe<SwapEmails>;
  /**
   * Obtain JSON web token for given user.
   *
   * Allow to perform login with different fields,
   * and secondary email if set. The fields are
   * defined on settings.
   *
   * Not verified users can login by default. This
   * can be changes on settings.
   *
   * If user is archived, make it unarchive and
   * return `unarchiving=True` on output.
   */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  verifyToken?: Maybe<VerifyToken>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  refreshToken?: Maybe<RefreshToken>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  revokeToken?: Maybe<RevokeToken>;
  updateIcon?: Maybe<UpdateIconMutation>;
  createClassroom?: Maybe<CreateClassRoomMutationPayload>;
  joinClassroom?: Maybe<JoinClassRoomMutationPayload>;
  leaveClassroom?: Maybe<LeaveClassRoomMutationPayload>;
  uploadClassroomCoverPhoto?: Maybe<UploadClassRoomCoverPhotoPayload>;
  removeMemberFromClassroom?: Maybe<RemoveMemberFromClassRoomMutationPayload>;
  updateUserMembershipType?: Maybe<UpdateUserMembershipTypePayload>;
  createClassroomPost?: Maybe<CreateClassRoomPostMutationPayload>;
  createClassroomPostComment?: Maybe<CreateClassRoomPostCommentMutationPayload>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};


export type MutationResendActivationEmailArgs = {
  email: Scalars['String'];
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String'];
};


export type MutationPasswordResetArgs = {
  token: Scalars['String'];
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
};


export type MutationPasswordChangeArgs = {
  oldPassword: Scalars['String'];
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
};


export type MutationArchiveAccountArgs = {
  password: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationUpdateAccountArgs = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  hasCompletedQuiz?: Maybe<Scalars['Boolean']>;
  requiresPasswordReset?: Maybe<Scalars['Boolean']>;
  learningMaterialPreference?: Maybe<Scalars['String']>;
};


export type MutationSendSecondaryEmailActivationArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVerifySecondaryEmailArgs = {
  token: Scalars['String'];
};


export type MutationSwapEmailsArgs = {
  password: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  password: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationVerifyTokenArgs = {
  token: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRevokeTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationUpdateIconArgs = {
  file: Scalars['Upload'];
};


export type MutationCreateClassroomArgs = {
  input: CreateClassRoomMutationInput;
};


export type MutationJoinClassroomArgs = {
  input: JoinClassRoomMutationInput;
};


export type MutationLeaveClassroomArgs = {
  input: LeaveClassRoomMutationInput;
};


export type MutationUploadClassroomCoverPhotoArgs = {
  input: UploadClassRoomCoverPhotoInput;
};


export type MutationRemoveMemberFromClassroomArgs = {
  input: RemoveMemberFromClassRoomMutationInput;
};


export type MutationUpdateUserMembershipTypeArgs = {
  input: UpdateUserMembershipTypeInput;
};


export type MutationCreateClassroomPostArgs = {
  input: CreateClassRoomPostMutationInput;
};


export type MutationCreateClassroomPostCommentArgs = {
  input: CreateClassRoomPostCommentMutationInput;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/**
 * Obtain JSON web token for given user.
 *
 * Allow to perform login with different fields,
 * and secondary email if set. The fields are
 * defined on settings.
 *
 * Not verified users can login by default. This
 * can be changes on settings.
 *
 * If user is archived, make it unarchive and
 * return `unarchiving=True` on output.
 */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  token?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  user?: Maybe<UserNode>;
  unarchiving?: Maybe<Scalars['Boolean']>;
  refreshToken?: Maybe<Scalars['String']>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

/**
 * Change account password when user knows the old password.
 *
 * A new token and refresh token are sent. User must be verified.
 */
export type PasswordChange = {
  __typename?: 'PasswordChange';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

/**
 * Change user password without old password.
 *
 * Receive the token that was sent by email.
 *
 * If token and new passwords are valid, update
 * user password and in case of using refresh
 * tokens, revoke all of them.
 *
 * Also, if user has not been verified yet, verify it.
 */
export type PasswordReset = {
  __typename?: 'PasswordReset';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type PrivateMediaType = {
  __typename?: 'PrivateMediaType';
  post?: Maybe<ClassRoomPostType>;
  originalFileName?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  aluser?: Maybe<AlUserType>;
  classroom?: Maybe<ClassRoomType>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<AllowSelfAlUserType>;
  users?: Maybe<AlUserTypeConnection>;
  /** The ID of the object */
  user?: Maybe<AlUserType>;
  myClassrooms?: Maybe<ClassRoomTypeConnection>;
  /** The ID of the object */
  classroom?: Maybe<ClassRoomType>;
  /** The ID of the object */
  post?: Maybe<ClassRoomPostType>;
  classroomMaterials?: Maybe<ClassRoomMaterialTypeConnection>;
  comments?: Maybe<ClassRoomPostCommentTypeConnection>;
};


export type QueryUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Float']>;
  username?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  dateJoined?: Maybe<Scalars['DateTime']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryMyClassroomsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  accessCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<Scalars['ID']>>>;
  coverPhoto?: Maybe<Scalars['ID']>;
};


export type QueryClassroomArgs = {
  id: Scalars['ID'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryClassroomMaterialsArgs = {
  classroomId?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mimeType?: Maybe<Scalars['String']>;
  materialType?: Maybe<Scalars['String']>;
  datetime?: Maybe<Scalars['DateTime']>;
  author?: Maybe<Scalars['ID']>;
  classroom?: Maybe<Scalars['ID']>;
  originalFileName?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};


export type QueryCommentsArgs = {
  postId?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  author?: Maybe<Scalars['ID']>;
  datetime?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  post?: Maybe<Scalars['ID']>;
  orderBy?: Maybe<Scalars['String']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RefreshToken = {
  __typename?: 'RefreshToken';
  token?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['GenericScalar']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
};

/**
 * Register user with fields defined in the settings.
 *
 * If the email field of the user model is part of the
 * registration fields (default), check if there is
 * no user with that email or as a secondary email.
 *
 * If it exists, it does not register the user,
 * even if the email field is not defined as unique
 * (default of the default django user model).
 *
 * When creating the user, it also creates a `UserStatus`
 * related to that user, making it possible to track
 * if the user is archived, verified and has a secondary
 * email.
 *
 * Send account verification email.
 *
 * If allowed to not verified users login, return token.
 */
export type Register = {
  __typename?: 'Register';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type RemoveMemberFromClassRoomMutationInput = {
  id: Scalars['String'];
  userId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RemoveMemberFromClassRoomMutationPayload = {
  __typename?: 'RemoveMemberFromClassRoomMutationPayload';
  success?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  classroomMembers?: Maybe<ClassRoomMembershipTypeConnection>;
  clientMutationId?: Maybe<Scalars['String']>;
};


export type RemoveMemberFromClassRoomMutationPayloadClassroomMembersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['ID']>;
  classroom?: Maybe<Scalars['ID']>;
  memberType?: Maybe<Scalars['String']>;
};

/**
 * Sends activation email.
 *
 * It is called resend because theoretically
 * the first activation email was sent when
 * the user registered.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type ResendActivationEmail = {
  __typename?: 'ResendActivationEmail';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RevokeToken = {
  __typename?: 'RevokeToken';
  revoked?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/**
 * Send password reset email.
 *
 * For non verified users, send an activation
 * email instead.
 *
 * Accepts both primary and secondary email.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type SendPasswordResetEmail = {
  __typename?: 'SendPasswordResetEmail';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/**
 * Send activation to secondary email.
 *
 * User must be verified and confirm password.
 */
export type SendSecondaryEmailActivation = {
  __typename?: 'SendSecondaryEmailActivation';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/**
 * Swap between primary and secondary emails.
 *
 * Require password confirmation.
 */
export type SwapEmails = {
  __typename?: 'SwapEmails';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/**
 * Update user model fields, defined on settings.
 *
 * User must be verified.
 */
export type UpdateAccount = {
  __typename?: 'UpdateAccount';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type UpdateIconMutation = {
  __typename?: 'UpdateIconMutation';
  success?: Maybe<Scalars['Boolean']>;
  icon?: Maybe<PrivateMediaType>;
};


export type UpdateIconMutationIconArgs = {
  id?: Maybe<Scalars['String']>;
};

export type UpdateUserMembershipTypeInput = {
  id: Scalars['String'];
  userId: Scalars['String'];
  newMembershipType?: Maybe<ClassRoomMembershipMemberType>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateUserMembershipTypePayload = {
  __typename?: 'UpdateUserMembershipTypePayload';
  success?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  updatedMember?: Maybe<AlUserType>;
  updatedMembership?: Maybe<ClassRoomMembershipMemberType>;
  clientMutationId?: Maybe<Scalars['String']>;
};


export type UploadClassRoomCoverPhotoInput = {
  file: Scalars['Upload'];
  id: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UploadClassRoomCoverPhotoPayload = {
  __typename?: 'UploadClassRoomCoverPhotoPayload';
  success?: Maybe<Scalars['Boolean']>;
  classroom?: Maybe<ClassRoomType>;
  message?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserNode = Node & {
  __typename?: 'UserNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  dateJoined: Scalars['DateTime'];
  icon?: Maybe<PrivateMediaType>;
  requiresPasswordReset: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  hasCompletedQuiz: Scalars['Boolean'];
  learningMaterialPreference: AlUserLearningMaterialPreference;
  classroomMemberships: ClassRoomMembershipTypeConnection;
  materials: ClassRoomMaterialTypeConnection;
  posts: ClassRoomPostTypeConnection;
  postComments: ClassRoomPostCommentTypeConnection;
  classrooms: ClassRoomTypeConnection;
  pk?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  secondaryEmail?: Maybe<Scalars['String']>;
};


export type UserNodeClassroomMembershipsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['ID']>;
  classroom?: Maybe<Scalars['ID']>;
  memberType?: Maybe<Scalars['String']>;
};


export type UserNodeMaterialsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UserNodePostsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UserNodePostCommentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  author?: Maybe<Scalars['ID']>;
  datetime?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  post?: Maybe<Scalars['ID']>;
};


export type UserNodeClassroomsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  accessCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<Scalars['ID']>>>;
  coverPhoto?: Maybe<Scalars['ID']>;
};

/**
 * Verify user account.
 *
 * Receive the token that was sent by email.
 * If the token is valid, make the user verified
 * by making the `user.status.verified` field true.
 */
export type VerifyAccount = {
  __typename?: 'VerifyAccount';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/**
 * Verify user secondary email.
 *
 * Receive the token that was sent by email.
 * User is already verified when using this mutation.
 *
 * If the token is valid, add the secondary email
 * to `user.status.secondary_email` field.
 *
 * Note that until the secondary email is verified,
 * it has not been saved anywhere beyond the token,
 * so it can still be used to create a new account.
 * After being verified, it will no longer be available.
 */
export type VerifySecondaryEmail = {
  __typename?: 'VerifySecondaryEmail';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type VerifyToken = {
  __typename?: 'VerifyToken';
  payload?: Maybe<Scalars['GenericScalar']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type DoCreateClassRoomMutationVariables = Exact<{
  input: CreateClassRoomMutationInput;
}>;


export type DoCreateClassRoomMutation = (
  { __typename?: 'Mutation' }
  & { createClassroom?: Maybe<(
    { __typename?: 'CreateClassRoomMutationPayload' }
    & Pick<CreateClassRoomMutationPayload, 'success'>
    & { classroom?: Maybe<(
      { __typename?: 'ClassRoomType' }
      & Pick<ClassRoomType, 'id' | 'name' | 'description'>
    )> }
  )> }
);

export type DoJoinClassRoomMutationVariables = Exact<{
  input: JoinClassRoomMutationInput;
}>;


export type DoJoinClassRoomMutation = (
  { __typename?: 'Mutation' }
  & { joinClassroom?: Maybe<(
    { __typename?: 'JoinClassRoomMutationPayload' }
    & Pick<JoinClassRoomMutationPayload, 'success' | 'message'>
    & { classroom?: Maybe<(
      { __typename?: 'ClassRoomType' }
      & Pick<ClassRoomType, 'id' | 'name' | 'description'>
    )> }
  )> }
);

export type DoLeaveClassRoomMutationVariables = Exact<{
  input: LeaveClassRoomMutationInput;
}>;


export type DoLeaveClassRoomMutation = (
  { __typename?: 'Mutation' }
  & { leaveClassroom?: Maybe<(
    { __typename?: 'LeaveClassRoomMutationPayload' }
    & Pick<LeaveClassRoomMutationPayload, 'success' | 'message'>
  )> }
);

export type DoUploadClassRoomCoverPhotoMutationVariables = Exact<{
  input: UploadClassRoomCoverPhotoInput;
}>;


export type DoUploadClassRoomCoverPhotoMutation = (
  { __typename?: 'Mutation' }
  & { uploadClassroomCoverPhoto?: Maybe<(
    { __typename?: 'UploadClassRoomCoverPhotoPayload' }
    & Pick<UploadClassRoomCoverPhotoPayload, 'success' | 'message'>
    & { classroom?: Maybe<(
      { __typename?: 'ClassRoomType' }
      & Pick<ClassRoomType, 'name'>
      & { coverPhoto?: Maybe<(
        { __typename?: 'PrivateMediaType' }
        & Pick<PrivateMediaType, 'path' | 'originalFileName'>
      )> }
    )> }
  )> }
);

export type DoRemoveMemberFromClassRoomMutationVariables = Exact<{
  input: RemoveMemberFromClassRoomMutationInput;
}>;


export type DoRemoveMemberFromClassRoomMutation = (
  { __typename?: 'Mutation' }
  & { removeMemberFromClassroom?: Maybe<(
    { __typename?: 'RemoveMemberFromClassRoomMutationPayload' }
    & Pick<RemoveMemberFromClassRoomMutationPayload, 'success' | 'message'>
    & { classroomMembers?: Maybe<(
      { __typename?: 'ClassRoomMembershipTypeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'ClassRoomMembershipTypeEdge' }
        & { node?: Maybe<(
          { __typename?: 'ClassRoomMembershipType' }
          & Pick<ClassRoomMembershipType, 'memberType'>
          & { user: (
            { __typename?: 'ALUserType' }
            & Pick<AlUserType, 'firstName' | 'lastName'>
            & { icon?: Maybe<(
              { __typename?: 'PrivateMediaType' }
              & Pick<PrivateMediaType, 'path'>
            )> }
          ) }
        )> }
      )>> }
    )> }
  )> }
);

export type DoUpdateMembershipTypeMutationVariables = Exact<{
  input: UpdateUserMembershipTypeInput;
}>;


export type DoUpdateMembershipTypeMutation = (
  { __typename?: 'Mutation' }
  & { updateUserMembershipType?: Maybe<(
    { __typename?: 'UpdateUserMembershipTypePayload' }
    & Pick<UpdateUserMembershipTypePayload, 'success' | 'message' | 'updatedMembership'>
    & { updatedMember?: Maybe<(
      { __typename?: 'ALUserType' }
      & Pick<AlUserType, 'username'>
    )> }
  )> }
);

export type DoCreateClassRoomPostMutationVariables = Exact<{
  input: CreateClassRoomPostMutationInput;
}>;


export type DoCreateClassRoomPostMutation = (
  { __typename?: 'Mutation' }
  & { createClassroomPost?: Maybe<(
    { __typename?: 'CreateClassRoomPostMutationPayload' }
    & Pick<CreateClassRoomPostMutationPayload, 'success' | 'message'>
    & { post?: Maybe<(
      { __typename?: 'ClassRoomPostTypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ClassRoomPostType' }
        & Pick<ClassRoomPostType, 'id' | 'datetime' | 'text' | 'hasAttachments'>
        & { postAttachments: Array<(
          { __typename?: 'PrivateMediaType' }
          & Pick<PrivateMediaType, 'originalFileName' | 'path'>
        )>, author: (
          { __typename?: 'ALUserType' }
          & Pick<AlUserType, 'id' | 'username' | 'firstName' | 'lastName'>
          & { icon?: Maybe<(
            { __typename?: 'PrivateMediaType' }
            & Pick<PrivateMediaType, 'path'>
          )> }
        ) }
      )> }
    )> }
  )> }
);

export type DoCreatePostCommentMutationVariables = Exact<{
  input: CreateClassRoomPostCommentMutationInput;
}>;


export type DoCreatePostCommentMutation = (
  { __typename?: 'Mutation' }
  & { createClassroomPostComment?: Maybe<(
    { __typename?: 'CreateClassRoomPostCommentMutationPayload' }
    & Pick<CreateClassRoomPostCommentMutationPayload, 'success'>
    & { comment?: Maybe<(
      { __typename?: 'ClassRoomPostCommentTypeEdge' }
      & Pick<ClassRoomPostCommentTypeEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'ClassRoomPostCommentType' }
        & Pick<ClassRoomPostCommentType, 'id' | 'datetime' | 'text'>
        & { author: (
          { __typename?: 'ALUserType' }
          & Pick<AlUserType, 'id' | 'username' | 'firstName' | 'lastName'>
          & { icon?: Maybe<(
            { __typename?: 'PrivateMediaType' }
            & Pick<PrivateMediaType, 'path'>
          )> }
        ) }
      )> }
    )> }
  )> }
);

export type DoPasswordChangeMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
}>;


export type DoPasswordChangeMutation = (
  { __typename?: 'Mutation' }
  & { passwordChange?: Maybe<(
    { __typename?: 'PasswordChange' }
    & Pick<PasswordChange, 'success' | 'errors' | 'refreshToken' | 'token'>
  )> }
);

export type DoUpdateAccountMutationVariables = Exact<{
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  requiresPasswordReset?: Maybe<Scalars['Boolean']>;
  hasCompletedQuiz?: Maybe<Scalars['Boolean']>;
  learningMaterialPreference?: Maybe<Scalars['String']>;
}>;


export type DoUpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount?: Maybe<(
    { __typename?: 'UpdateAccount' }
    & Pick<UpdateAccount, 'success' | 'errors'>
  )> }
);

export type DoLoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type DoLoginMutation = (
  { __typename?: 'Mutation' }
  & { tokenAuth?: Maybe<(
    { __typename?: 'ObtainJSONWebToken' }
    & Pick<ObtainJsonWebToken, 'success' | 'errors' | 'token' | 'refreshToken' | 'unarchiving'>
    & { user?: Maybe<(
      { __typename?: 'UserNode' }
      & Pick<UserNode, 'id' | 'username'>
    )> }
  )> }
);

export type DoRegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
}>;


export type DoRegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'Register' }
    & Pick<Register, 'success' | 'errors'>
  )> }
);

export type DoVerifyAccountMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type DoVerifyAccountMutation = (
  { __typename?: 'Mutation' }
  & { verifyAccount?: Maybe<(
    { __typename?: 'VerifyAccount' }
    & Pick<VerifyAccount, 'success' | 'errors'>
  )> }
);

export type DoVerifyTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type DoVerifyTokenMutation = (
  { __typename?: 'Mutation' }
  & { verifyToken?: Maybe<(
    { __typename?: 'VerifyToken' }
    & Pick<VerifyToken, 'payload' | 'success' | 'errors'>
  )> }
);

export type DoRefreshTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type DoRefreshTokenMutation = (
  { __typename?: 'Mutation' }
  & { refreshToken?: Maybe<(
    { __typename?: 'RefreshToken' }
    & Pick<RefreshToken, 'token' | 'payload' | 'success' | 'errors' | 'refreshToken'>
  )> }
);

export type DoUpdateIconMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type DoUpdateIconMutation = (
  { __typename?: 'Mutation' }
  & { updateIcon?: Maybe<(
    { __typename?: 'UpdateIconMutation' }
    & Pick<UpdateIconMutation, 'success'>
    & { icon?: Maybe<(
      { __typename?: 'PrivateMediaType' }
      & Pick<PrivateMediaType, 'originalFileName' | 'path'>
    )> }
  )> }
);

export type GetClassRoomQueryVariables = Exact<{
  id: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
  first: Scalars['Int'];
  orderBy?: Maybe<Scalars['String']>;
}>;


export type GetClassRoomQuery = (
  { __typename?: 'Query' }
  & { classroom?: Maybe<(
    { __typename?: 'ClassRoomType' }
    & Pick<ClassRoomType, 'id' | 'name' | 'description' | 'accessCode'>
    & { coverPhoto?: Maybe<(
      { __typename?: 'PrivateMediaType' }
      & Pick<PrivateMediaType, 'path' | 'originalFileName'>
    )>, myMembership?: Maybe<(
      { __typename?: 'ClassRoomMembershipType' }
      & Pick<ClassRoomMembershipType, 'memberType'>
    )>, classroomPosts?: Maybe<(
      { __typename?: 'ClassRoomPostTypeConnection' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage' | 'startCursor' | 'endCursor'>
      ), edges: Array<Maybe<(
        { __typename?: 'ClassRoomPostTypeEdge' }
        & Pick<ClassRoomPostTypeEdge, 'cursor'>
        & { node?: Maybe<(
          { __typename?: 'ClassRoomPostType' }
          & Pick<ClassRoomPostType, 'id' | 'hasAttachments' | 'datetime' | 'text'>
          & { postAttachments: Array<(
            { __typename?: 'PrivateMediaType' }
            & Pick<PrivateMediaType, 'originalFileName' | 'path'>
          )>, author: (
            { __typename?: 'ALUserType' }
            & Pick<AlUserType, 'username' | 'firstName' | 'lastName'>
            & { icon?: Maybe<(
              { __typename?: 'PrivateMediaType' }
              & Pick<PrivateMediaType, 'path'>
            )> }
          ) }
        )> }
      )>> }
    )>, classroomMembers: (
      { __typename?: 'ClassRoomMembershipTypeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'ClassRoomMembershipTypeEdge' }
        & { node?: Maybe<(
          { __typename?: 'ClassRoomMembershipType' }
          & Pick<ClassRoomMembershipType, 'memberType'>
          & { user: (
            { __typename?: 'ALUserType' }
            & Pick<AlUserType, 'id' | 'username' | 'firstName' | 'lastName'>
            & { icon?: Maybe<(
              { __typename?: 'PrivateMediaType' }
              & Pick<PrivateMediaType, 'path'>
            )> }
          ) }
        )> }
      )>> }
    ) }
  )> }
);

export type GetUserClassRoomsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type GetUserClassRoomsQuery = (
  { __typename?: 'Query' }
  & { myClassrooms?: Maybe<(
    { __typename?: 'ClassRoomTypeConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<Maybe<(
      { __typename?: 'ClassRoomTypeEdge' }
      & Pick<ClassRoomTypeEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'ClassRoomType' }
        & Pick<ClassRoomType, 'id' | 'name' | 'description' | 'accessCode'>
        & { coverPhoto?: Maybe<(
          { __typename?: 'PrivateMediaType' }
          & Pick<PrivateMediaType, 'path' | 'originalFileName'>
        )>, myMembership?: Maybe<(
          { __typename?: 'ClassRoomMembershipType' }
          & Pick<ClassRoomMembershipType, 'memberType'>
        )> }
      )> }
    )>> }
  )> }
);

export type GetPostCommentsQueryVariables = Exact<{
  orderBy?: Maybe<Scalars['String']>;
  postId: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
  first: Scalars['Int'];
}>;


export type GetPostCommentsQuery = (
  { __typename?: 'Query' }
  & { comments?: Maybe<(
    { __typename?: 'ClassRoomPostCommentTypeConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<Maybe<(
      { __typename?: 'ClassRoomPostCommentTypeEdge' }
      & Pick<ClassRoomPostCommentTypeEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'ClassRoomPostCommentType' }
        & Pick<ClassRoomPostCommentType, 'id' | 'datetime' | 'text'>
        & { author: (
          { __typename?: 'ALUserType' }
          & Pick<AlUserType, 'id' | 'username' | 'firstName' | 'lastName'>
          & { icon?: Maybe<(
            { __typename?: 'PrivateMediaType' }
            & Pick<PrivateMediaType, 'path'>
          )> }
        ) }
      )> }
    )>> }
  )> }
);

export type GetClassroomMaterialsQueryVariables = Exact<{
  orderBy?: Maybe<Scalars['String']>;
  classroomId: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
  first: Scalars['Int'];
  materialType?: Maybe<Scalars['String']>;
}>;


export type GetClassroomMaterialsQuery = (
  { __typename?: 'Query' }
  & { classroomMaterials?: Maybe<(
    { __typename?: 'ClassRoomMaterialTypeConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<Maybe<(
      { __typename?: 'ClassRoomMaterialTypeEdge' }
      & Pick<ClassRoomMaterialTypeEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'ClassRoomMaterialType' }
        & Pick<ClassRoomMaterialType, 'mimeType' | 'materialType' | 'datetime' | 'originalFileName' | 'path'>
        & { author: (
          { __typename?: 'ALUserType' }
          & Pick<AlUserType, 'firstName' | 'lastName'>
          & { icon?: Maybe<(
            { __typename?: 'PrivateMediaType' }
            & Pick<PrivateMediaType, 'path'>
          )> }
        ) }
      )> }
    )>> }
  )> }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'AllowSelfALUserType' }
    & Pick<AllowSelfAlUserType, 'hasCompletedQuiz' | 'lastLogin' | 'username' | 'firstName' | 'lastName' | 'email' | 'isActive' | 'requiresPasswordReset' | 'learningMaterialPreference' | 'isAdmin' | 'verified' | 'secondaryEmail'>
    & { icon?: Maybe<(
      { __typename?: 'PrivateMediaType' }
      & Pick<PrivateMediaType, 'originalFileName' | 'path'>
    )> }
  )> }
);


export const DoCreateClassRoom = gql`
    mutation DoCreateClassRoom($input: CreateClassRoomMutationInput!) {
  createClassroom(input: $input) {
    success
    classroom {
      id
      name
      description
    }
  }
}
    `;
export const DoJoinClassRoom = gql`
    mutation DoJoinClassRoom($input: JoinClassRoomMutationInput!) {
  joinClassroom(input: $input) {
    success
    message
    classroom {
      id
      name
      description
    }
  }
}
    `;
export const DoLeaveClassRoom = gql`
    mutation DoLeaveClassRoom($input: LeaveClassRoomMutationInput!) {
  leaveClassroom(input: $input) {
    success
    message
  }
}
    `;
export const DoUploadClassRoomCoverPhoto = gql`
    mutation DoUploadClassRoomCoverPhoto($input: UploadClassRoomCoverPhotoInput!) {
  uploadClassroomCoverPhoto(input: $input) {
    success
    message
    classroom {
      name
      coverPhoto {
        path
        originalFileName
      }
    }
  }
}
    `;
export const DoRemoveMemberFromClassRoom = gql`
    mutation DoRemoveMemberFromClassRoom($input: RemoveMemberFromClassRoomMutationInput!) {
  removeMemberFromClassroom(input: $input) {
    success
    message
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
    `;
export const DoUpdateMembershipType = gql`
    mutation DoUpdateMembershipType($input: UpdateUserMembershipTypeInput!) {
  updateUserMembershipType(input: $input) {
    success
    message
    updatedMembership
    updatedMember {
      username
    }
  }
}
    `;
export const DoCreateClassRoomPost = gql`
    mutation DoCreateClassRoomPost($input: CreateClassRoomPostMutationInput!) {
  createClassroomPost(input: $input) {
    success
    message
    post {
      node {
        id
        datetime
        text
        hasAttachments
        postAttachments {
          originalFileName
          path
        }
        author {
          id
          username
          firstName
          lastName
          icon {
            path
          }
        }
      }
    }
  }
}
    `;
export const DoCreatePostComment = gql`
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
    `;
export const DoPasswordChange = gql`
    mutation DoPasswordChange($oldPassword: String!, $newPassword1: String!, $newPassword2: String!) {
  passwordChange(oldPassword: $oldPassword, newPassword1: $newPassword1, newPassword2: $newPassword2) {
    success
    errors
    refreshToken
    token
  }
}
    `;
export const DoUpdateAccount = gql`
    mutation DoUpdateAccount($firstName: String, $lastName: String, $requiresPasswordReset: Boolean, $hasCompletedQuiz: Boolean, $learningMaterialPreference: String) {
  updateAccount(firstName: $firstName, lastName: $lastName, requiresPasswordReset: $requiresPasswordReset, hasCompletedQuiz: $hasCompletedQuiz, learningMaterialPreference: $learningMaterialPreference) {
    success
    errors
  }
}
    `;
export const DoLogin = gql`
    mutation DoLogin($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    success
    errors
    token
    refreshToken
    unarchiving
    user {
      id
      username
    }
  }
}
    `;
export const DoRegister = gql`
    mutation DoRegister($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password1: String!, $password2: String!) {
  register(email: $email, username: $username, password1: $password1, password2: $password2, firstName: $firstName, lastName: $lastName) {
    success
    errors
  }
}
    `;
export const DoVerifyAccount = gql`
    mutation DoVerifyAccount($token: String!) {
  verifyAccount(token: $token) {
    success
    errors
  }
}
    `;
export const DoVerifyToken = gql`
    mutation DoVerifyToken($token: String!) {
  verifyToken(token: $token) {
    payload
    success
    errors
  }
}
    `;
export const DoRefreshToken = gql`
    mutation DoRefreshToken($token: String!) {
  refreshToken(refreshToken: $token) {
    token
    payload
    success
    errors
    refreshToken
  }
}
    `;
export const DoUpdateIcon = gql`
    mutation DoUpdateIcon($file: Upload!) {
  updateIcon(file: $file) {
    success
    icon {
      originalFileName
      path
    }
  }
}
    `;
export const GetClassRoom = gql`
    query GetClassRoom($id: ID!, $after: String, $first: Int!, $orderBy: String) {
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
    }
    classroomPosts(orderBy: $orderBy, after: $after, first: $first) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          hasAttachments
          postAttachments {
            originalFileName
            path
          }
          author {
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
    `;
export const GetUserClassRooms = gql`
    query GetUserClassRooms($after: String, $first: Int) {
  myClassrooms(after: $after, first: $first) {
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
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
        }
      }
    }
  }
}
    `;
export const GetPostComments = gql`
    query GetPostComments($orderBy: String, $postId: ID!, $after: String, $first: Int!) {
  comments(postId: $postId, orderBy: $orderBy, after: $after, first: $first) {
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
    `;
export const GetClassroomMaterials = gql`
    query GetClassroomMaterials($orderBy: String, $classroomId: ID!, $after: String, $first: Int!, $materialType: String) {
  classroomMaterials(classroomId: $classroomId, orderBy: $orderBy, first: $first, after: $after, materialType: $materialType) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        mimeType
        materialType
        datetime
        author {
          firstName
          lastName
          icon {
            path
          }
        }
        originalFileName
        path
      }
    }
  }
}
    `;
export const GetCurrentUser = gql`
    query GetCurrentUser {
  me {
    hasCompletedQuiz
    lastLogin
    username
    firstName
    lastName
    email
    isActive
    icon {
      originalFileName
      path
    }
    requiresPasswordReset
    learningMaterialPreference
    isAdmin
    verified
    secondaryEmail
  }
}
    `;