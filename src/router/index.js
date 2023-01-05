import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashbard from '@/views/Dashbard'
import GraphSystem from '@/views/GraphSystem'
import MapContainer from '@/views/MapContainer'
import Typography from '@/views/Typography'
import LoginPage from '../LoginPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashbard
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/graph-system',
    name: 'GraphSystem',
    component: GraphSystem
  },
  {
    path: '/map-container',
    name: 'MapContainer',
    component: MapContainer
  },
  {
    path: '/typography',
    name: 'Typography',
    component: Typography
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
