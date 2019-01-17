<template>
  <v-app>
    <v-toolbar
      fixed
      app
      color="#ffffff"
    >
      <v-btn icon @click="$router.push('/')" class="title-logo">
        <img height="50" src='~/assets/logo-char.png'></img>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
    <span>&copy; {{ title }} 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        fixed: false,
        title: 'いきなり小テスト'
      }
    }
  }
</script>

<style>
.title-logo {
  width: 180px;
  padding-top: 5px;
}
</style>
