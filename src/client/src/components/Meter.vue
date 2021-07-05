<template>
  <div class="my-2">
    <h3 class="text-lg leading-loose">{{ legend }}</h3>
    <div class="border-2 p-0 border-black w-full overflow-hidden">
      <div
        class="m-0 h-full transition-all"
        :style="`background-color: hsl(${this.hue}, 45%, 80%); width:${
          (meterValue / max) * 100
        }%`"
      >
        <span
          class="text-lg text-gray-600 font-medium py-4 pl-2 whitespace-nowrap"
        >
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
      required: true
    },
    min: {
      type: Number,
      required: true
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
