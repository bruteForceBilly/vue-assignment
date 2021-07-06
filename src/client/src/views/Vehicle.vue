<template>
  <div class="bg-gray-50">
    <div
      v-if="vehicle"
      id="vehicle"
      class="p-10 mx-auto grid grid-cols-2 gap-10 w-3/4"
    >
      <Map :gps="latLng" class="" />

      <div class="">
        <Meter
          legend="Current Speed"
          :max="50"
          :value="vehicle.speed"
          unit="km/h"
        />

        <Meter
          legend="State of Charge"
          :ascendingColor="false"
          :value="vehicle.soc"
          unit="SoC(%)"
        />

        <div class="flex">
          <Counter legend="Energy" unit="kW" :value="vehicle.energy" />
          <Counter legend="Odometer" unit="km" :value="vehicle.odo" />
        </div>
      </div>

      <LineChart
        class="col-span-2"
        :is-contrasting="true"
        :sampleSize="4"
        legend="Speed Profile"
        x-label="Time"
        :x-data="vehicle.time"
        y-label="Speed (km/h)"
        :y-data="vehicle.speed"
      />
      <LineChart
        class="col-span-2"
        :is-contrasting="false"
        :sampleSize="2"
        legend="State of Charge Profile"
        x-label="Time"
        :x-data="vehicle.time"
        y-label="SoC (%)"
        :y-data="vehicle.soc"
      />
    </div>
  </div>
</template>

<script>
import Counter from '@/components/Counter.vue'
import LineChart from '@/components/LineChart.vue'
import Map from '@/components/Map.vue'
import Meter from '@/components/Meter.vue'

import throttle from 'lodash.throttle'

const url = 'ws://localhost:3000'
const connection = new WebSocket(url, 'echo-protocol')

export default {
  name: 'App',
  components: {
    Counter,
    LineChart,
    Map,
    Meter
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
