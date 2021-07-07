const state = () => ({
  entries: []
})

const getters = {
  errors: function (state) {
    return state.entries.filter((entry) => entry.type === 'Error')
  },
  incidents: function (state) {
    return state.entries.filter((entry) => entry.type === 'Incident')
  },
  successes: function (state) {
    return state.entries.filter((entry) => entry.type === 'Success')
  },
  warnings: function (state) {
    return state.entries.filter((entry) => entry.type === 'Warning')
  }
}

const actions = {
  setLogEntryAction({ commit }, logEntry) {
    return commit('logEntryMutation', {
      date: new Date().toUTCString(),
      type: logEntry.type,
      message: logEntry.message
    })
  }
}

const mutations = {
  logEntryMutation(state, value) {
    return state.entries.push(value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
