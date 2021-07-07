import Vue from 'vue'
import Vuex from 'vuex'

import activityLog from './modules/activityLog.js'
import routeConnection from './modules/routeConnection.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    activityLog,
    routeConnection
  }
})
