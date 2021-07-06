import store from '@/store'
import throttle from 'lodash.throttle'

const url = 'ws://localhost:3000' // should be passed in by env
const connection = new WebSocket(url, 'echo-protocol')

connection.onopen = () => {
  console.log('WS connection is open')
  store.commit('routeConnection/isConnectedMutation', true)
}

connection.onclose = () => {
  console.log('WS connection is closes')
  store.commit('routeConnection/isConnectedMutation', false)
}

// Throttling can help when debugging
connection.onmessage = throttle((e) => {
  store.dispatch('routeConnection/setMessageAction', JSON.parse(e.data))
}, 0)

// error handling
connection.onerror = (event) => {
  console.error('WebSocket error observed:', event)
  store.commit('routeConnection/hasErrorMutation', true)
}

export default connection
