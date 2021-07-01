<template>
  <div id="app">
    <ul>
      <li v-for="(value, key, index) of vehicle" :key="index + key">
        {{ key }} : {{ value }}
      </li>
    </ul>
    <Map />
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
