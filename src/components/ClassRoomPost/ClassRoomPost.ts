import { ClassRoomPostType, ClassRoomPostCommentTypeConnection, ExpectedErrorType } from 'src/generated'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { DateTime } from 'luxon'
import UserAvatar from 'src/components/UserAvatar/UserAvatar.vue'
import { useAuthStore, useClassRoomStore } from 'src/pinia-store'
import ClassRoomPostComment from 'src/components/ClassRoomPostComment/ClassRoomPostComment.vue'
import { GET_POST_COMMENTS } from 'src/operations/queries/classroom'
import deepcopy from 'deepcopy'
import { ApolloError } from '@apollo/client/errors'
import { notifyApolloError } from 'src/utils/errors'

const store = useAuthStore()

const classroomStore = useClassRoomStore()

@Component({
  components: { UserAvatar, 'classroom-post-comment': ClassRoomPostComment },
  apollo: {
    comments: {
      query: GET_POST_COMMENTS,
      variables () {
        const _this = this as unknown as ClassRoomPost
        return {
          postId: _this.post.id,
          first: 3,
          after: '',
          orderBy: '-datetime'
        }
      },
      update: function (data: { comments: ClassRoomPostCommentTypeConnection }) {
        const _this = this as unknown as ClassRoomPost
        if (data.comments.pageInfo.endCursor) {
          _this.after = data.comments.pageInfo.endCursor
          _this.hasNextPage = data.comments.pageInfo.hasNextPage
        }
        return data.comments
      }
    }
  }
})
export default class ClassRoomPost extends Vue {
  @Prop({ type: Object, required: true }) readonly post!: ClassRoomPostType
  newComment = ''
  after = ''
  hasNextPage = false
  comments!:ClassRoomPostCommentTypeConnection;
  get author () {
    return this.post.author
  }

  get authorName () {
    return this.post.author.lastName + ' ' + this.post.author.firstName
  }

  get when () {
    return DateTime.fromISO(this.post.datetime.toString()).toRelative()
  }

  get text () {
    return this.post.text
  }

  get user () {
    return store.user
  }

  get commentsOrdered () {
    const clone = deepcopy(this.comments.edges || [])
    return clone.reverse() || []
  }

  createComment () {
    if (!this.newComment.trim()) {
      return
    }
    classroomStore.createPostComment({ input: { postId: this.post.id, datetime: DateTime.now(), text: this.newComment } })
      .then(async () => {
        await this.$apollo.queries.comments.refetch()
      })
      .catch((err: ApolloError | ExpectedErrorType) => {
        notifyApolloError(this.$q, err)
      })
      .finally(() => {
        this.newComment = ''
      })
  }

  async showMore () {
    await this.$apollo.queries.comments.fetchMore({
      variables: {
        postId: this.post.id,
        first: 1,
        after: this.after,
        orderBy: '-datetime'
      },
      updateQuery: (previousResult: {comments: ClassRoomPostCommentTypeConnection}, { fetchMoreResult }: { fetchMoreResult?: {comments: ClassRoomPostCommentTypeConnection }}) => {
        const newComments = fetchMoreResult?.comments?.edges || []
        const hasNextPage = fetchMoreResult?.comments.pageInfo.hasNextPage || false
        const pageInfo = fetchMoreResult?.comments.pageInfo
        this.hasNextPage = hasNextPage
        this.after = fetchMoreResult?.comments.pageInfo.endCursor || ''
        const clone = deepcopy(previousResult)
        if (clone && clone.comments.pageInfo) {
          clone.comments.edges = [...clone.comments.edges, ...newComments]
          if (pageInfo) {
            clone.comments.pageInfo = pageInfo
          }
          clone.comments.pageInfo.hasNextPage = hasNextPage || false
        }
        return clone
      }
    })
  }
}
