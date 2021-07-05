<template>
  <Figure class="relative">
    <figcaption class="">{{ legend }}</figcaption>
    <span class="absolute z-10 -left-20 inset-y-1/2 transform -rotate-90">
      {{ yLabel }}
    </span>
    <Chart :y-axis="yData" :styles="chartStyle" class="my-3" />
    <span> {{ xLabel }} </span>
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
