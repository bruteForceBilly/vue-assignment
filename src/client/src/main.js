import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
