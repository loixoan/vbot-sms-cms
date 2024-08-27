import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/views/DashboardView.vue";
import BrandnamePrice from "@/components/brandname/Brandname.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/brandname-price',
      name: 'brandname',
      component: BrandnamePrice
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
