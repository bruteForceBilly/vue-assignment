import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import '@/assets/css/tailwind.css'
import 'leaflet/dist/leaflet.css'
import store from './store'
import router from './router'

import routeConnection from '@/services/routeConnection.js'

Vue.use(routeConnection)

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  routeConnection,
  render: (h) => h(App)
}).$mount('#app')
