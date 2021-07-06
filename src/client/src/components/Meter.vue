<template>
  <div class="mb-6 text-left leading-relaxed">
    <h3 class="text-lg mb-2">{{ legend }}</h3>
    <div class="border-2 p-0 border-gray-600 w-full overflow-hidden bg-white">
      <div
        class="m-0 h-full transition-all"
        :style="`background-color: hsl(${this.hue}, 45%, 80%); width:${
          (meterValue / max) * 100
        }%`"
      >
        <span class="text-base font-medium pl-2 whitespace-nowrap">
          {{ meterValue }} {{ unit }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Meter',
  props: {
    legend: {
      type: String
    },
    ascendingColor: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    value: {
      type: [Number, String],
      required: true
    },
    unit: {
      type: String
    }
  },
  computed: {
    hue() {
      if (this.ascendingColor) {
        return 100 - (this.meterValue / this.max) * 100
      } else {
        return (this.meterValue / this.max) * 100
      }
    },
    meterValue() {
      return typeof this.value === 'number' ? this.value : 0
    }
  }
}
</script>
