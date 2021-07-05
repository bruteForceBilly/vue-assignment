<template>
  <Figure class="relative overflow-hidden my-20">
    <figcaption class="ml-8">{{ legend }}</figcaption>
    <span
      class="
        absolute
        z-10
        left-2
        bottom-11
        whitespace-nowrap
        transform
        rotate-180
      "
      style="writing-mode: vertical-rl; text-orientation: mixed"
    >
      {{ yLabel }}
    </span>
    <Chart
      v-bind="$props"
      :styles="chartStyle"
      :show-text="false"
      class="absolute left-8"
    />
    <span class="ml-12"> {{ xLabel }} </span>
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
    sampleSize: {
      type: Number,
      default: 4
    },
    isContrasting: {
      type: Boolean,
      required: true
    },
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
