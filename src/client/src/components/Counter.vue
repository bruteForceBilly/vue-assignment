<template>
  <div class="inline-block w-full">
    <h3 class="text-lg leading-loose">{{ legend }}</h3>
    <div
      class="
        bg-white
        border border-gray-100
        p-4
        w-36
        text-base
        font-medium
        whitespace-nowrap
      "
    >
      {{ value | trim }}
      <span class="float-right font-normal text-gray-500">{{ unit }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    decimals: {
      type: Number,
      default: 1
    },
    legend: {
      type: String,
      required: true
    },
    trimDecimals: {
      type: Boolean,
      default: true
    },
    unit: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    }
  },
  filters: {
    trim: function (value) {
      return value.toFixed(2)
    }
  }
}
</script>
