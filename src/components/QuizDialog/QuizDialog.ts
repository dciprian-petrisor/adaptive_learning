import { ApolloError } from '@apollo/client/errors'
import { ExpectedErrorType } from 'src/generated'
import { useAuthStore } from 'src/pinia-store'
import { notifyApolloError } from 'src/utils/errors'
import { Vue, Component, Prop } from 'vue-property-decorator'

interface PrefResult {
  score: number;
  preference: string;
  tendency: 'mild' | 'moderate' | 'strong',
  message?: string;
}

const store = useAuthStore()
@Component({})
export default class QuizDialog extends Vue {
    @Prop({ type: Boolean, default: false }) readonly showDialog! : boolean
    step = 1
    dimensionResults: PrefResult[] = []
    questions = [
      {
        text: 'I understand something better after I:',
        options: [
          { label: 'Try it out.', value: 'a' },
          { label: 'Think it through.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I would rather be considered:',
        options: [
          { label: 'realistic.', value: 'a' },
          { label: 'innovative.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I think about what I did yesterday, I am most likely to get:',
        options: [
          { label: 'a picture.', value: 'a' },
          { label: 'words.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I tend to:',
        options: [
          { label: 'understand details of a subject but may be fuzzy about its overall structure.', value: 'a' },
          { label: 'understand the overall structure but may be fuzzy about details.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I am learning something new, it helps me to:',
        options: [
          { label: 'talk about it.', value: 'a' },
          { label: 'think about it.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'If I were a teacher, I would rather teach a course:',
        options: [
          { label: 'that deals with facts and real life situations.', value: 'a' },
          { label: 'that deals with ideas and theories.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I prefer to get new information in:',
        options: [
          { label: 'pictures, diagrams, graphs, or maps.', value: 'a' },
          { label: 'written directions or verbal information.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'Once I understand:',
        options: [
          { label: 'all the parts, I understand the whole thing.', value: 'a' },
          { label: 'the whole thing, I see how the parts fit.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'In a study group working on difficult material, I am more likely to:',
        options: [
          { label: 'jump in and contribute ideas.', value: 'a' },
          { label: 'sit back and listen.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I find it easier:',
        options: [
          { label: 'to learn facts.', value: 'a' },
          { label: 'to learn concepts.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'In a book with lots of pictures and charts, I am likely to:',
        options: [
          { label: 'look over the pictures and charts carefully.', value: 'a' },
          { label: 'focus on the written text.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I solve maths problems:',
        options: [
          { label: 'I usually work my way to the solutions one step at a time.', value: 'a' },
          { label: 'I often just see the solutions but then have to struggle to figure out the steps to get to them.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'In classes I have taken:',
        options: [
          { label: 'I have usually got to know many of the students.', value: 'a' },
          { label: 'I have rarely got to know many of the students.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'In reading non-fiction, I prefer:',
        options: [
          { label: 'something that teaches me new facts or tells me how to do something.', value: 'a' },
          { label: 'something that gives me new ideas to think about.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I like teachers:',
        options: [
          { label: 'who put a lot of diagrams on the board.', value: 'a' },
          { label: 'who spend a lot of time explaining.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I\'m analysing a story or a novel:',
        options: [
          { label: 'I think of the incidents and try to put them together to figure out the themes.', value: 'a' },
          { label: 'I just know what the themes are when I finish reading and then I have to go back and find the incidents that demonstrate them.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I start a homework problem, I am more likely to:',
        options: [
          { label: 'start working on the solution immediately.', value: 'a' },
          { label: 'try to fully understand the problem first.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I prefer the idea of:',
        options: [
          { label: 'certainty.', value: 'a' },
          { label: 'theory.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I remember best:',
        options: [
          { label: 'what I see.', value: 'a' },
          { label: 'what I hear.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'It is more important to me that an instructor:',
        options: [
          { label: 'lay out the material in clear sequential steps.', value: 'a' },
          { label: 'give me an overall picture and relate the material to other subjects.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I prefer to study:',
        options: [
          { label: 'in a group.', value: 'a' },
          { label: 'alone.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I am more likely to be considered:',
        options: [
          { label: 'careful about the details of my work.', value: 'a' },
          { label: 'creative about how to do my work.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I get directions to a new place, I prefer:',
        options: [
          { label: 'a map.', value: 'a' },
          { label: 'written instructions.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I learn:',
        options: [
          { label: 'at a fairly regular pace. If I study hard, I\'ll "get it."', value: 'a' },
          { label: 'in fits and starts. I\'ll be totally confused and then suddenly it all "clicks."', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I would rather first:',
        options: [
          { label: 'try things out.', value: 'a' },
          { label: 'think about how I\'m going to do it.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I am reading for enjoyment, I like writers to:',
        options: [
          { label: 'clearly say what they mean.', value: 'a' },
          { label: 'say things in creative, interesting ways', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I see a diagram or sketch in class, I am most likely to remember:',
        options: [
          { label: 'the picture.', value: 'a' },
          { label: 'what the instructor said about it.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When considering a body of information, I am more likely to:',
        options: [
          { label: 'focus on details and miss the big picture.', value: 'a' },
          { label: 'try to understand the big picture before getting into the details.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I more easily remember:',
        options: [
          { label: 'something I have done.', value: 'a' },
          { label: 'something I have thought a lot about.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I have to perform a task, I prefer to:',
        options: [
          { label: 'master one way of doing it.', value: 'a' },
          { label: 'come up with new ways of doing it.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When someone is showing me data, I prefer:',
        options: [
          { label: 'charts or graphs.', value: 'a' },
          { label: 'text summarizing the results.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When writing a paper, I am more likely to:',
        options: [
          { label: 'work on (think about or write) the beginning of the paper and progress forward.', value: 'a' },
          { label: 'work on (think about or write) different parts of the paper and then order them.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I have to work on a group project, I first want to:',
        options: [
          { label: 'have a "group brainstorming" where everyone contributes ideas.', value: 'a' },
          { label: 'brainstorm individually and then come together as a group to compare ideas.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I consider it higher praise to call someone:',
        options: [
          { label: 'sensible.', value: 'a' },
          { label: 'imaginative.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I meet people at a party, I am more likely to remember:',
        options: [
          { label: 'what they looked like.', value: 'a' },
          { label: 'what they said about themselves.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I am learning a new subject, I prefer to:',
        options: [
          { label: 'stay focused on that subject, learning as much about it as I can.', value: 'a' },
          { label: 'try to make connections between that subject and related subjects.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I am more likely to be considered:',
        options: [
          { label: 'outgoing.', value: 'a' },
          { label: 'reserved.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I prefer courses that emphasise:',
        options: [
          { label: 'concrete material (facts, data).', value: 'a' },
          { label: 'abstract material (concepts, theories).', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'For entertainment, I would rather:',
        options: [
          { label: 'watch television.', value: 'a' },
          { label: 'read a book.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'Some teachers start their lectures with an outline of what they will cover. Such outlines are:',
        options: [
          { label: 'somewhat helpful to me.', value: 'a' },
          { label: 'very helpful to me.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'The idea of doing homework in groups, with one grade for the entire group:',
        options: [
          { label: 'appeals to me.', value: 'a' },
          { label: 'does not appeal to me.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When I am doing long calculations:',
        options: [
          { label: 'I tend to repeat all my steps and check my work carefully.', value: 'a' },
          { label: 'I find checking my work tiresome and have to force myself to do it.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'I tend to picture places I have been:',
        options: [
          { label: 'easily and fairly accurately.', value: 'a' },
          { label: 'with difficulty and without much detail.', value: 'b' }
        ],
        answer: 'a'
      },
      {
        text: 'When solving problems in a group, I would be more likely to:',
        options: [
          { label: 'think of the steps in the solution process.', value: 'a' },
          { label: 'think of possible consequences or applications of the solution in a wide range of areas.', value: 'b' }
        ],
        answer: 'a'
      }
    ]

    get shouldShowDialog () {
      return this.showDialog
    }

    set shouldShowDialog (v) {
      this.$emit('showDialogChanged', v)
    }

    get complete () {
      for (const q of this.questions) {
        if (q.answer !== 'a' && q.answer !== 'b') { return false }
      }
      return true
    }

    skip () {
      store.updateAccountDetails({ learningMaterialPreference: store.user?.learningMaterialPreference, firstName: store.user?.firstName, lastName: store.user?.lastName, requiresPasswordReset: store.user?.requiresPasswordReset, hasCompletedQuiz: true })
        .then(() => this.$q.notify({ message: 'Quiz completed.', type: 'positive' }))
        .catch((err: ApolloError| ExpectedErrorType) => {
          notifyApolloError(this.$q, err)
        })
      this.shouldShowDialog = false
    }

    computeTendency (score: number) {
      if (score >= 5 && score <= 7) {
        return 'moderate'
      } else if (score >= 9 && score <= 11) {
        return 'strong'
      }

      return 'mild'
    }

    computePreference (scores: Map<string, number>, prefOne: string, prefTwo: string) : PrefResult {
      const prefOneScore = scores.get(prefOne) || 0
      const prefTwoScore = scores.get(prefTwo) || 0

      if (prefOneScore > prefTwoScore) {
        const score = prefOneScore - prefTwoScore
        return { score, preference: prefOne, tendency: this.computeTendency(score) }
      } else {
        const score = prefTwoScore - prefOneScore
        return { score, preference: prefTwo, tendency: this.computeTendency(score) }
      }
    }

    next () {
      const scores = new Map<string, number>()
      for (let index = 0; index < this.questions.length; index++) {
        const q = this.questions[index]
        if (index % 4 === 0) {
          // sequential/global
          const increase = q.answer === 'a' ? 'Sequential' : 'Global'
          const currentScore = scores.get(increase) || 0
          scores.set(increase, currentScore + 1)
        } else if (index % 4 === 1) {
          // activist/reflector
          const increase = q.answer === 'a' ? 'Activist' : 'Reflector'
          const currentScore = scores.get(increase) || 0
          scores.set(increase, currentScore + 1)
        } else if (index % 4 === 2) {
          // sensing/intuitive
          const increase = q.answer === 'a' ? 'Sensing' : 'Intuitive'
          const currentScore = scores.get(increase) || 0
          scores.set(increase, currentScore + 1)
        } else if (index % 4 === 3) {
          // visual/verbal
          const increase = q.answer === 'a' ? 'Visual' : 'Verbal'
          const currentScore = scores.get(increase) || 0
          scores.set(increase, currentScore + 1)
        }
      }

      const d1Result = this.computePreference(scores, 'Sequential', 'Global')
      const d1Msg = d1Result.preference === 'Sequential' ? `You have a ${d1Result.tendency} preference for learning topics in <b>logical, sequential</b> order.` : `You have a ${d1Result.tendency} preference for learning topics in <b>any order</b>.`
      d1Result.message = d1Msg
      const d2Result = this.computePreference(scores, 'Activist', 'Reflector')
      const d2Msg = d2Result.preference === 'Activist' ? `You have a ${d2Result.tendency} preference for learning by <b>applying</b> the knowledge.` : `You have a ${d2Result.tendency} for learning by <b>actively thinking about the topics</b>.`
      d2Result.message = d2Msg
      const d3Result = this.computePreference(scores, 'Sensing', 'Intuitive')
      const d3Msg = d3Result.preference === 'Sensing' ? `You have a ${d3Result.tendency} preference for learning by being given <b>general facts and truths</b>.` : `You have a ${d3Result.tendency} for learning by being given <b>theoretical knowledge and discovering relationships</b> at a high level view.`
      d3Result.message = d3Msg
      const d4Result = this.computePreference(scores, 'Visual', 'Verbal')
      const d4Msg = d4Result.preference === 'Visual' ? `You have a ${d4Result.tendency} preference for learning by using <b>visual material</b> (videos, presentations, etc).` : `You have a ${d4Result.tendency} for learning by using <b>verbal material</b> (audio or text).`
      d4Result.message = d4Msg
      this.dimensionResults.push(d1Result, d2Result, d3Result, d4Result)
      this.step = 2
    }

    finish () {
      const learningMaterialPreference = this.dimensionResults[3].preference.toLowerCase()
      store.updateAccountDetails({ firstName: store.user?.firstName, lastName: store.user?.lastName, requiresPasswordReset: store.user?.requiresPasswordReset, hasCompletedQuiz: true, learningMaterialPreference: learningMaterialPreference })
        .then(() => this.$q.notify({ message: 'Quiz completed.', type: 'positive' }))
        .catch((err: ApolloError| ExpectedErrorType) => {
          notifyApolloError(this.$q, err)
        })
      this.shouldShowDialog = false
      this.step = 1
    }
}
