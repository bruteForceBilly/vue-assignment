import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/activity-log',
    name: 'ActivityLog',
    component: () =>
      import(/* webpackChunkName: "activityLog" */ '../views/ActivityLog.vue')
  },
  {
    path: '/vehicle',
    name: 'Vehicle',
    component: () =>
      import(/* webpackChunkName: "vehicle" */ '../views/Vehicle.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
