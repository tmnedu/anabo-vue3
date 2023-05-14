import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/area/:id/:month',
      name: 'area',
      component: () => import('@/views/AreaView.vue'),
      props: true
    },
    {
      path: '/monthStats/:month',
      name: 'monthStats',
      component: () => import('@/views/MonthView.vue'),
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue')
    },
    {
      path: '/editTasks',
      name: 'editTasks',
      component: () => import('@/views/EditTasks.vue')
    },
    {
      path: '/addHelper',
      name: 'addHelper',
      component: () => import('@/views/AddHelper.vue')
    },
    {
      path: '/editHelpers',
      name: 'editHelpers',
      component: () => import('@/views/EditHelpers.vue')
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('@/views/ResultsView.vue')
    }
  ]
})

export default router
