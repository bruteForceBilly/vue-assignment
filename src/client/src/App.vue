<template>
  <div id="app" class="text-gray-600">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
