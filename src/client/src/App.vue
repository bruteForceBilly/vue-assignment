<template>
  <div id="app">
    <div>Hello World {{ test }}</div>
  </div>
</template>

<script>
const url = 'ws://localhost:3000'
const connection = new WebSocket(url, 'echo-protocol')

export default {
  name: 'App',
  data() {
    return {
      test: 'init'
    }
  },
  mounted() {
    connection.onopen = () => {
      console.log('WS connection is open')
    }
    connection.onmessage = (e) => {
      this.test = e.data
    }
  }
}
</script>
