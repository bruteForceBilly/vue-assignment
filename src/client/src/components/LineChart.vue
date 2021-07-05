<template>
  <Figure class="relative overflow-hidden">
    <figcaption class="ml-6">{{ legend }}</figcaption>
    <span class="absolute z-10 -left-14 inset-y-1/2 transform -rotate-90">
      {{ yLabel }}
    </span>
    <Chart
      v-bind="$props"
      :styles="chartStyle"
      :show-text="false"
      class="my-1 absolute left-5"
    />
    <span class="ml-6"> {{ xLabel }} </span>
  </Figure>
</template>

<script>
import Chart from './Chart.js'
export default {
  name: 'LineChart',
  components: {
    Chart
  },
  props: {
    legend: {
      type: String
    },
    xLabel: {
      type: String
    },
    xData: {
      type: [Number, String],
      required: true
    },
    yLabel: {
      type: String
    },
    yData: {
      type: [Number, String],
      required: false
    }
  },
  data() {
    return {
      height: 200
    }
  },
  computed: {
    chartStyle() {
      return {
        height: `${this.height}px`,
        position: 'relative'
      }
    }
  }
}
</script>
