import { Vue, Component, Prop } from 'vue-property-decorator'
import AnnouncementCard from 'src/components/AnnouncementCard/AnnouncementCard.vue'
import ClassRoomFeedCard from 'src/components/ClassRoomFeedCard/ClassRoomFeedCard.vue'
import { GET_CLASSROOM } from 'src/operations/queries/classroom'
import { ClassRoomMembershipTypeConnection, ClassRoomType, CreateClassRoomPostMutationPayload, UpdateUserMembershipTypePayload } from 'src/generated'
import ClassRoomMembersList from 'src/components/ClassRoomMembersList/ClassRoomMembersList.vue'
import deepcopy from 'deepcopy'
import ClassRoomPost from 'src/components/ClassRoomPost/ClassRoomPost.vue'
import { QInfiniteScroll } from 'quasar'

@Component({
  components: { AnnouncementCard, ClassRoomFeedCard, 'class-room-members-list': ClassRoomMembersList, ClassRoomPost },
  apollo: {
    classroom: {
      query: GET_CLASSROOM,
      variables () {
        const _this = this as unknown as PageClassroom
        return {
          id: _this.id,
          orderBy: '-datetime',
          first: 5,
          after: ''
        }
      },
      update: function (data: {classroom: ClassRoomType}) {
        const _this = this as unknown as PageClassroom
        if (data.classroom?.classroomPosts?.pageInfo.endCursor) {
          // save cursor after initial retrieve
          _this.after = data.classroom.classroomPosts.pageInfo.endCursor
          _this.hasNextPagePosts = data.classroom.classroomPosts.pageInfo.hasNextPage
        }
        return data.classroom
      }
    }
  }
})
export default class PageClassroom extends Vue {
  @Prop({ type: String, required: true }) readonly id!: string;
  $refs!: {
    infiniteScroll: QInfiniteScroll
  }

  hasNextPagePosts = false;
  first = 5;
  after = '';
  orderBy= '-datetime'
  classroom: ClassRoomType | unknown = {};
  tab = 'feed';

  get classRoomPosts () {
    const clsroom = this.classroom as ClassRoomType
    if (!clsroom || !clsroom.classroomPosts?.edges) {
      return []
    }

    const posts = []
    for (const post of clsroom.classroomPosts.edges) {
      if (post?.node) {
        posts.push(post.node)
      }
    }

    return posts
  }

  onAnnouncementCreated (payload: CreateClassRoomPostMutationPayload) {
    if (!payload.post) {
      return
    }

    const cloned = deepcopy(this.classroom) as ClassRoomType
    cloned.classroomPosts?.edges.splice(0, 0, payload.post)
    this.classroom = cloned
  }

  classroomMembersUpdated (members: ClassRoomMembershipTypeConnection) {
    const cloned = deepcopy(this.classroom) as ClassRoomType
    cloned.classroomMembers = members
    this.classroom = cloned
  }

  membershipUpdated (update: UpdateUserMembershipTypePayload) {
    const cloned = deepcopy(this.classroom) as ClassRoomType
    const target = cloned.classroomMembers.edges.find(x => update.updatedMember && x?.node?.user.username === update.updatedMember.username)

    if (target?.node?.memberType && update.updatedMembership) {
      target.node.memberType = update.updatedMembership
      this.classroom = cloned
    }
  }

  async showMorePosts (index: number, done: () => void) {
    if (index === 1) {
      done()
      return
    }

    await this.$apollo.queries.classroom.fetchMore({
      variables: {
        id: this.id,
        first: 3,
        after: this.after,
        orderBy: this.orderBy
      },
      updateQuery: (previousResult: {classroom: ClassRoomType}, { fetchMoreResult }: { fetchMoreResult?: {classroom: ClassRoomType }}) => {
        const newPosts = fetchMoreResult?.classroom?.classroomPosts?.edges || []
        const hasNextPage = fetchMoreResult?.classroom?.classroomPosts?.pageInfo.hasNextPage || false
        const pageInfo = fetchMoreResult?.classroom?.classroomPosts?.pageInfo
        this.hasNextPagePosts = hasNextPage
        this.after = fetchMoreResult?.classroom?.classroomPosts?.pageInfo.endCursor || ''
        const clone = deepcopy(previousResult)
        if (clone && clone.classroom.classroomPosts?.pageInfo) {
          clone.classroom.classroomPosts.edges = [...clone.classroom.classroomPosts?.edges, ...newPosts]
          if (pageInfo) {
            clone.classroom.classroomPosts.pageInfo = pageInfo
          }
          clone.classroom.classroomPosts.pageInfo.hasNextPage = hasNextPage || false
        }
        return clone
      }
    })
    done()
  }
}
