<template>
  <div id="app" class="px-10">
    <Map v-if="vehicle" :gps="latLng" />
    <Meter
      v-if="vehicle"
      legend="Current Speed"
      :value="vehicle.speed"
      unit="km/h"
      :min="0"
      :max="50"
    />
    <Meter
      v-if="vehicle"
      legend="State of Charge"
      :value="vehicle.soc"
      unit="SoC(%)"
      :min="0"
      :max="100"
      :ascendingColor="false"
    />
    <ul v-if="vehicle" class="inline-block">
      <li v-for="(value, key, index) of vehicle" :key="index + key">
        {{ key }} : {{ value }}
      </li>
    </ul>
    <LineChart
      v-if="vehicle"
      :is-contrasting="true"
      :sampleSize="4"
      legend="Speed Profile"
      x-label="Time"
      :x-data="vehicle.time"
      y-label="Speed (km/h)"
      :y-data="vehicle.speed"
    />
    <LineChart
      v-if="vehicle"
      :is-contrasting="false"
      :sampleSize="2"
      legend="State of Charge Profile"
      x-label="Time"
      :x-data="vehicle.time"
      y-label="SoC (%)"
      :y-data="vehicle.soc"
    />
  </div>
</template>

<script>
import Meter from './components/Meter.vue'
import LineChart from './components/LineChart.vue'
import Map from './Map.vue'
import throttle from 'lodash.throttle'

const url = 'ws://localhost:3000'
const connection = new WebSocket(url, 'echo-protocol')

export default {
  name: 'App',
  components: {
    Map,
    Meter,
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
    }, 0)
  }
}
</script>
