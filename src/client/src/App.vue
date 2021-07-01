<template>
  <div id="app">
    latLng: {{ latLng }}
    <ul>
      <li v-for="(value, key, index) of vehicle" :key="index + key">
        {{ key }} : {{ value }}
      </li>
    </ul>
    <Chart />
    <Map v-if="false" :gps="latLng" />
  </div>
</template>

<script>
import Chart from './Chart.js'
import Map from './Map.vue'
import throttle from 'lodash.throttle'

const url = 'ws://localhost:3000'
const connection = new WebSocket(url, 'echo-protocol')

export default {
  name: 'App',
  components: {
    Map,
    Chart
  },
  data() {
    return {
      vehicle: null
    }
  },
  computed: {
    latLng() {
      return this.vehicle
        ? this.vehicle['gps'].split('|').map((coord) => parseFloat(coord))
        : []
    }
  },
  mounted() {
    connection.onopen = () => {
      console.log('WS connection is open')
    }
    // The gps coordinates does not fully correspond to
    // the km/h, hece im throttling it to make the vehicle
    // easier to follow on the map with your eyes.
    connection.onmessage = throttle((e) => {
      this.vehicle = JSON.parse(e.data)
    }, 500)
  }
}
</script>
