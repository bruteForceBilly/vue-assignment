const state = () => ({
  isConnected: false,
  message: null,
  hasError: false
})

const actions = {
  setMessageAction({ commit }, message) {
    let { time, energy, gps, odo, speed, soc } = message
    // Set default value if illegal type - Avoid loop for performance
    time = typeof time === 'number' ? time : 0
    energy = typeof energy === 'number' ? energy : 0
    odo = typeof odo === 'number' ? odo : 0
    speed = typeof speed === 'number' ? speed : 0
    soc = typeof soc === 'number' ? soc : 0

    // Split gps string into tuple
    gps = gps.split('|').map((c) => parseFloat(c))

    return commit('messageMutation', {
      time,
      energy,
      gps,
      odo,
      speed,
      soc
    })
  }
}

const mutations = {
  messageMutation(state, value) {
    return (state.message = value)
  },
  isConnectedMutation(state, value) {
    return (state.isConnected = value)
  },
  hasErrorMutation(state, value) {
    return (state.hasError = value)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
