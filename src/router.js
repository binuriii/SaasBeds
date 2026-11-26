import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home/Home.vue'
import PlatformOverview from './pages/Platform/PlatformOverview/PlatformOverview.vue'
import AllFeatures from './pages/Platform/AllFeatures/AllFeatures.vue'
import HouseKeeping from './pages/Platform/HouseKeeping/HouseKeeping.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/platform',
      name: 'platform-overview',
      component: PlatformOverview
    },
    {
      path: '/features',
      name: 'all-features',
      component: AllFeatures
    },
    {
      path: '/features/hotel-housekeeping-software',
      name: 'hotel-housekeeping-software',
      component: HouseKeeping
    },






















    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],

  scrollBehavior: () => ({ top: 0 })
})
