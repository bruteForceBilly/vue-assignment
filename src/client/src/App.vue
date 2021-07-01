<template>
  <div id="app">
    latLng: {{ latLng }}
    <ul>
      <li v-for="(value, key, index) of vehicle" :key="index + key">
        {{ key }} : {{ value }}
      </li>
    </ul>
    <Map :gps="latLng" />
  </div>
</template>

<script>
import Map from './Map.vue'

const url = 'ws://localhost:3000'
const connection = new WebSocket(url, 'echo-protocol')

export default {
  name: 'App',
  components: {
    Map
  },
  data() {
    return {
      vehicle: ''
    }
  },
  computed: {
    latLng() {
      if (!this.vehicle['gps']) return [52.3676, 4.9041] // Amsterdam Coord as init value
      return this.vehicle['gps'].split('|').map((coord) => parseFloat(coord))
    }
  },
  mounted() {
    connection.onopen = () => {
      console.log('WS connection is open')
    }
    connection.onmessage = (e) => {
      this.vehicle = JSON.parse(e.data)
    }
  }
}
</script>
