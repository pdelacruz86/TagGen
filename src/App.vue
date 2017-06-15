<template>
<body :class="isLogged ? 'page-container-bg-solid' : 'login' ">
    <div id="app">
      <div class="page-wrapper">
        <app-header v-if="isLogged"></app-header>
        <router-view>

        </router-view>
      </div>
    </div>
  </body>
</template>

<script>
  import Header from './Header.vue'

  export default {
    computed: {
      isLogged () {
        return this.$store.getters.isLoggedIn
      }
    },
    mounted () {
      document.body.className = 'page-container-bg-solid'
    },
    components: {appHeader: Header},
    name: 'app'
  }
</script>

<style>


</style>
