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
      <v-form>
        <v-text-field
           v-model="testName"
           :counter="testNameMax"
           label="テストの名前"
         ></v-text-field>
        <v-textarea
          v-model="testDescription"
          label="テストの説明"
        ></v-textarea>

        <div v-for="(question, qindex) in questions">
          <div key="qindex">
            <div class="spacer"></div>
            <v-text-field
               v-model="questions[qindex].question"
               :counter="max"
               label="問題文"
             ></v-text-field>
            <div v-for="(i, index) in ['１', '２', '３', '４']">
              <v-text-field key="i"
                 v-model="questions[qindex].answerOptions[index]"
                 :counter="max"
                 :label="`選択肢${i}`"
                 :prepend-icon="getOptionIcon(qindex, index)"
              ></v-text-field>
            </div>
            <v-radio-group
              label="正解"
              v-model="questions[qindex].answerIndex"
              row
            >
              <div v-for="(i, index) in ['１', '２', '３', '４']">
                <v-radio 
                  key="index"
                  :label="`選択肢${i}`"
                  :value="index"
                ></v-radio>
              </div>
            </v-radio-group>
            <v-card-actions>
              <v-spacer />
              <v-btn color="red" round @click="confirmDelete(qindex)" dark>問題を削除</v-btn>
            </v-card-actions>
            <div class="spacer" />
            <v-divider />
            <div class="spacer" />
          </div>
        </div>
      </v-form>
      <div class="spacer" />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" round @click="addEmptyTest()">問題を追加</v-btn>
        <v-btn color="primary" round @click="saveTest()">テストの作成を完了</v-btn>
      </v-card-actions>
      <div class="spacer" />
      <v-dialog v-model="deleteConfirmDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">問題を削除</v-card-title>
          <v-card-text>一度削除すると戻せません</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="deleteConfirmDialog = false">削除しない</v-btn>
            <v-btn color="red darken-1" flat @click="removeQuestion()">削除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      testName: "",
      testNameMax: 20,
      testDescription: "",
      max: 60,
      questions: [],
      deleteConfirmDialog: false,
    }
  },
  created: function () {
    this.addEmptyTest()
  },
  methods: {
    getOptionIcon (qindex, index) {
      if (index == this.questions[qindex].answerIndex) {
        return "mood"
      }
    },
    addEmptyTest () {
      this.questions.push({
        question: '',
        answerOptions: [
          '',
          '',
          '',
          '',
        ],
        answerIndex: -1,
      })
    },
    confirmDelete (index) {
      this.deleteConfirmDialog = true
      this.deleteCandidateIndex = index
    },
    removeQuestion () {
      this.questions.splice(this.deleteCandidateIndex, 1)
      this.deleteConfirmDialog = false
      this.deleteCandidateIndex = -1
    },
    saveTest () {
      firebase.database().ref('tests').push({
        name: this.testName,
        description: this.testDescription,
        questions: this.questions,
      })
    },
  },
}
</script>

<style>
.spacer {
  margin-top: 20px;
}
</style>
