import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css'

const url = 'ws://localhost:3000'
const connection = new WebSocket(url, 'echo-protocol')

connection.onopen = () => {
  console.log('WS connection is open')
}
connection.onmessage = (e) => {
  console.log(e.data)
}

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
