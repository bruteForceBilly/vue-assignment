<template>
  <div id="app" class="px-10">
    <Map v-if="vehicle" :gps="latLng" class="" />
    <ul class="inline-block">
      <li v-for="(value, key, index) of vehicle" :key="index + key">
        {{ key }} : {{ value }}
      </li>
    </ul>
    <LineChart
      v-if="vehicle"
      legend="Speed Profile"
      x-label="Time"
      :x-data="vehicle.time"
      y-label="Speed (km/h)"
      :y-data="vehicle.speed"
    />
  </div>
</template>

<script>
import LineChart from './components/LineChart.vue'
import Map from './Map.vue'
import throttle from 'lodash.throttle'

const url = 'ws://localhost:3000'
const connection = new WebSocket(url, 'echo-protocol')

export default {
  name: 'App',
  components: {
    Map,
    LineChart
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
    }, 100)
  }
}
</script>
