<template>
  <div class="bg-gray-50">
    <div
      v-if="vehicle"
      id="vehicle"
      class="p-10 mx-auto grid grid-cols-2 gap-10 w-3/4"
    >
      <Map :gps="vehicle.gps" class="" />

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

export default {
  name: 'Vehicle',
  components: {
    Counter,
    LineChart,
    Map,
    Meter
  },
  computed: {
    vehicle() {
      return this.$store.state.routeConnection.message
        ? this.$store.state.routeConnection.message
        : null
    }
  }
}
</script>
