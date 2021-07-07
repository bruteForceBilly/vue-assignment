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

<style src="@/assets/css/tailwind.css"></style>
