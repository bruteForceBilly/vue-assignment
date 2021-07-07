<template>
  <Figure class="relative overflow-hidden">
    <figcaption class="ml-5">{{ legend }}</figcaption>
    <span
      class="
        absolute
        z-10
        -left-1
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
      class="absolute left-5 bg-white border-t border-r border-gray-100"
      style="width: calc(100% - 1.75rem + 8px)"
    />
    <span class="ml-9"> {{ xLabel }} </span>
  </Figure>
</template>

<script>
const Chart = () => import('@/components/Chart.js')

export default {
  name: 'LineChart',
  components: {
    Chart
  },
  props: {
    profileMultiplier: {
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
      height: 150
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
