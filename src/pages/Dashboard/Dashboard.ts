import { Vue, Component } from 'vue-property-decorator'
import ClassRoomCard from 'src/components/ClassRoomCard/ClassRoomCard.vue'
import { GET_USER_CLASSROOMS } from 'src/operations/queries/classroom'
import { ClassRoomType, ClassRoomTypeConnection } from 'src/generated'
import { useAuthStore } from 'src/pinia-store'
import CreateClassRoomDialog from 'src/components/CreateClassRoomDialog/CreateClassRoomDialog.vue'
import { QInfiniteScroll } from 'quasar'
import JoinClassRoomDialog from 'src/components/JoinClassRoomDialog/JoinClassRoomDialog.vue'
import LeaveClassRoomDialog from 'src/components/LeaveClassRoomDialog/LeaveClassRoomDialog.vue'
import QuizDialog from 'src/components/QuizDialog/QuizDialog.vue'
import deepcopy from 'deepcopy'

const store = useAuthStore()

@Component({
  components: { 'classroom-card': ClassRoomCard, CreateClassRoomDialog, JoinClassRoomDialog, LeaveClassRoomDialog, QuizDialog },
  apollo: {
    myClassrooms: {
      query: GET_USER_CLASSROOMS,
      variables: {
        first: 6,
        after: ''
      },
      update: function (data : {myClassrooms: ClassRoomTypeConnection}) {
        const _this = this as unknown as PageDashboard
        if (data.myClassrooms.pageInfo.endCursor) {
          // save cursor after initial retrieve
          _this.after = data.myClassrooms.pageInfo.endCursor
          _this.hasNextPage = data.myClassrooms.pageInfo.hasNextPage
        }
        return data.myClassrooms
      }
    }
  }
})
export default class PageDashboard extends Vue {
  $refs!: {
    infiniteScroll: QInfiniteScroll
  }

  first = 3;
  after = '';
  hasNextPage = false;
  myClassrooms!: ClassRoomTypeConnection;
  showCreateClassroomDialog = false;
  showJoinClassroomDialog = false;
  showLeaveClassRoomDialog = false;
  showQuizDialog = !store.user?.hasCompletedQuiz;
  classroomToLeave: ClassRoomType | unknown = {};

  get classroomNodes () {
    if (!this.myClassrooms || !this.myClassrooms.edges) { return [] }

    const nodes = []
    for (const edge of this.myClassrooms.edges) {
      if (edge?.node) { nodes.push(edge.node) }
    }

    return nodes
  }

  get firstName () {
    if (store.user?.firstName) {
      return store.user.firstName
    }
    return 'user'
  }

  onClassRoomLeft (classroom: ClassRoomType) {
    const cloned = deepcopy(this.myClassrooms)
    cloned.edges = cloned.edges.filter(x => x?.node?.id !== classroom.id)
    this.myClassrooms = cloned
  }

  onClassroomJoinedOrCreated (c: ClassRoomType) {
    return this.navigateToClassroom(c)
  }

  navigateToClassroom (c: ClassRoomType) {
    return this.$router.push({ name: 'classroom', params: { id: c.id } })
  }

  leaveClassroom (c: ClassRoomType) {
    this.classroomToLeave = c
    this.showLeaveClassRoomDialog = true
  }

  async showMore (index: number, done: () => void) {
    if (index === 1) {
      done()
      return
    }

    await this.$apollo.queries.myClassrooms.fetchMore({
      variables: {
        first: 3,
        after: this.after
      },
      updateQuery: (previousResult: {myClassrooms: ClassRoomTypeConnection},
        { fetchMoreResult }: {fetchMoreResult?: { myClassrooms: ClassRoomTypeConnection }}) => {
        const newClassrooms = fetchMoreResult?.myClassrooms.edges || []
        const hasNextPage = fetchMoreResult?.myClassrooms.pageInfo.hasNextPage || false
        const pageInfo = fetchMoreResult?.myClassrooms.pageInfo
        this.hasNextPage = hasNextPage
        this.after = fetchMoreResult?.myClassrooms.pageInfo.endCursor || ''
        const newEdges = [...previousResult.myClassrooms.edges, ...newClassrooms]
        return {
          myClassrooms: {
            __typename: previousResult.myClassrooms.__typename,
            edges: newEdges,
            hasNextPage,
            pageInfo
          }
        }
      }
    })

    done()
  }
}
