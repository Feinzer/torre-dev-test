import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/user',
    name: 'User',
    component: () =>
      import(/* webpackChunkName: "user-search" */ '../views/User.vue'),
  },
  {
    path: '/job',
    name: 'Job',
    component: () =>
      import(/* webpackChunkName: "job-search" */ '../views/Job.vue'),
  },
  {
    path: '/results',
    name: 'Results',
    component: () =>
      import(/* webpackChunkName: "search-results" */ '../views/Results.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
