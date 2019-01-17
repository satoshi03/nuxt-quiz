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
      <div class="text-xs-center">
        <v-img :aspect-ratio="16/6" transition="slide-x-reverse-transition" max-width="600px" :src='require("~/assets/logo.png")' />
        <p class="description">自作の４択クイズを出題しましょう</p>
        <v-btn round large color="blue darken-2" dark @click="dialog = true">答える</v-btn>
        <v-btn round large color="red accent-2" dark @click="$router.push('/maker')">作る</v-btn>
      </div>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-form>
            <div class="search-box">
              <v-text-field
                label="小テスト名"
                :error-messages="dialogErrorMsg"
                v-model="testName"
              >
              </v-text-field>
            </div>
            <v-card-actions>
              <v-spacer />
              <v-btn
                flat
                color="blue daken-2"
                @click="findTest()"
              >
                答える
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from '~/plugins/firebase'

import { mapActions, mapState, mapGetters  } from 'vuex'

export default {
  data () {
    return {
      dialog: false,
      testName: "",
      dialogErrorMsg: "",
    }
  },
  methods: {
    ...mapActions(['setTest']),
    findTest () {
      if (this.testName == "") {
        this.dialogErrorMsg = "小テスト名を入力してください"
        return
      }

      const ref = firebase.database().ref('tests')
      const _this = this
      ref.orderByChild("name").equalTo(this.testName).once("child_added", function (snapshot) {
        const ss = snapshot.val()
        if (!ss) {
          _this.dialogErrorMsg = "クイズが見つかりませんでした"
        } else {
          _this.setTest(ss)
          _this.dialogErrorMsg = ""
          _this.$router.push('/test')
        }
      })
    }
  }
}
</script>

<style>
.logo {
  width: 300px;
}

.description {
  font-size: 20px;
  color: #222222;
}

.search-box {
  padding: 20px;
  padding-bottom: 5px;
}
</style>
