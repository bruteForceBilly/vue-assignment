import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import store from './store'
import router from './router'

import routeConnectionService from '@/services/routeConnectionService.js'

Vue.use(routeConnectionService)

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  routeConnectionService,
  render: (h) => h(App)
}).$mount('#app')
