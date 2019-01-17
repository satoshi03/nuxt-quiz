<template>
  <v-layout
    row
    fill-height
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6
      >
      <div v-if="!finished">
        <v-alert
          :value="correctAlart"
          color="success"
          icon="check_circle"
          outline
        >
        正解！！
        </v-alert>
        <v-alert
          :value="wrongAlart"
          color="error"
          icon="highlight_off"
          outline
        >
        不正解！！ 正解は {{ getCorrectAnswer }}
        </v-alert>
        <v-card min-height="200px" class="question">
          <v-card-text>
            <span class="question-num">{{ questionCount + 1 }} / {{ getQuestionLength }}</span>
          </v-card-text>
          <v-card-title class="justify-center">
            <div>
              <span class="headline">{{ getQuestion() }}</span>
            </div>
          </v-card-title>
        </v-card>
        <v-form>
          <v-radio-group
            v-model="answer"
            column
          >
            <div v-for="(i, index) in ['１', '２', '３', '４']">
              <v-radio 
                key="index"
                :label="getOption(index)"
                :value="index"
              ></v-radio>
            </div>
          </v-radio-group>
          <v-card-actions>
            <v-spacer />
            <v-btn round color="blue darken-2" dark @click="doAnswer()">答える</v-btn>
          </v-card-actions>
        </v-form>
      </div>
      <v-card min-height="200px" v-if="finished">
        <v-card-title class="justify-center">
          <span class="headline result-message">お疲れ様でした</span>
          <span class="headline result-correct-num">{{ getQuestionLength }}問中{{ correctCount }}問正解</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn round color="blue darken-2" dark @click="$router.push('/')">ホームへ</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters  } from 'vuex'

export default {
  data () {
    return {
      questionCount: 0,
      correctCount: 0,
      answer: 0,
      correctAlart: false,
      wrongAlart: false,
      finished: false,
    }
  },
  computed: {
    ...mapState(['test']),
    ...mapGetters(['getTest']),
    getQuestionLength () {
      if (!this.test) {
        return
      }
      return this.test.questions.length
    },
    getCorrectAnswer () {
      if (!this.test) {
        return
      }
      const answerIndex = this.test.questions[this.questionCount].answerIndex
      return this.test.questions[this.questionCount].answerOptions[answerIndex]
    },
  },
  methods: {
    getQuestion () {
       if (!this.test) {
        return
      }
      return this.test.questions[this.questionCount].question
    },
    getOption (index) {
       if (!this.test) {
        return
      }
      return this.test.questions[this.questionCount].answerOptions[index]
    },
    doAnswer () {
      if (this.checkAnswer()) {
        this.correctCount += 1
        this.correctAlart = true
      } else {
        this.wrongAlart = true
      }
      const _this = this
      setTimeout(function () {
        _this.correctAlart = false
        _this.wrongAlart = false
        if (_this.hasNext()) {
          _this.nextQuestion()
        } else {
          _this.finish()
        }
      }, 2000)

    },
    hasNext () {
      const questionNum = this.test.questions.length
      return this.questionCount < questionNum - 1
    },
    checkAnswer () {
      return this.answer == this.test.questions[this.questionCount].answerIndex
    },
    nextQuestion () {
      this.answer = 0
      this.questionCount += 1
    },
    finish () {
      this.finished = true
      this.questionCount = 0
    }
  }
}
</script>

<style>
.question {
  border-radius: 8px;
}

.question-num {
  color: #888888;
}

.result-message {
  padding-top: 20px;
}

.result-correct-num {
  padding-top: 30px;
}
</style>
