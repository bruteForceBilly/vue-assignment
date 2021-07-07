<template>
  <div class="bg-gray-50 w-full">
    <h1
      class="fixed inline-block left-52 inset-y-1/2 text-6xl whitespace-nowrap"
      style="z-index: 99"
    >
      Comming Soon
    </h1>

    <Map
      :gps="message.gps"
      class="w-full m-0 opacity-50"
      style="height: calc(100vh - 5.75rem); filter: grayscale(0.3)"
    />
  </div>
</template>

<script>
import Map from '@/components/Map.vue'

export default {
  name: 'HistoryMode',
  components: {
    Map
  },
  computed: {
    message() {
      return this.$store.state.routeConnection.message || null
    }
  }
}
</script>
