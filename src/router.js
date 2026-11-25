
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/Home/Home.vue'
import PlatformOverview from './pages/Platform/PlatformOverview/PlatformOverview.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

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
      path: '/features/hotel-property-management-system',
      alias: '/property-management-system',
      name: 'property-management-system',
      component: () =>
        import('./pages/Platform/Operations/PropertyManagementSystem/PropertyManagementSystem.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],

  scrollBehavior: () => ({ top: 0 })
})

export default router
