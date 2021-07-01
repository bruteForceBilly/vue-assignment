<template>
  <div id="app">
    <ul>
      <li v-for="(value, key, index) of vehicle" :key="index + key">
        {{ key }} : {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
const url = 'ws://localhost:3000'
const connection = new WebSocket(url, 'echo-protocol')

export default {
  name: 'App',
  data() {
    return {
      vehicle: ''
    }
  },
  mounted() {
    connection.onopen = () => {
      console.log('WS connection is open')
    }
    connection.onmessage = (e) => {
      this.vehicle = JSON.parse(e.data)
    }
  }
}
</script>
