import store from '@/store'
import throttle from 'lodash.throttle'

const url = 'ws://localhost:3000' // should be passed in by env
const connection = new WebSocket(url, 'echo-protocol')

connection.onopen = () => {
  store.commit('routeConnection/isConnectedMutation', true)

  store.dispatch('activityLog/setLogEntryAction', {
    type: 'Success',
    message: 'Success: Connected to Route Service.'
  })
}

connection.onclose = () => {
  store.commit('routeConnection/isConnectedMutation', false)

  store.dispatch('activityLog/setLogEntryAction', {
    type: 'Warning',
    message: 'Warning: Route Service connection is lost.'
  })
}

// Throttling can help when debugging
connection.onmessage = throttle((e) => {
  store.dispatch('routeConnection/setMessageAction', JSON.parse(e.data))
}, 0)

// error handling
connection.onerror = (event) => {
  console.error('WebSocket error observed:', event)
  store.commit('routeConnection/hasErrorMutation', true)
  store.dispatch('activityLog/setLogEntryAction', {
    type: 'Error',
    message: 'Error: Route Service connection error'
  })
}

// Handle retry

export default connection
