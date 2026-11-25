
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home/Home.vue'
import PlatformOverview from './pages/Platform/PlatformOverview/PlatformOverview.vue'

export default createRouter({
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
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],

  scrollBehavior: () => ({ top: 0 })
})
