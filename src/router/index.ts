import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from "@/views/DashboardView.vue";
import BrandnamePrice from "@/components/brandnamePrice/BrandnamePrice.vue";
import Brandname from "@/components/brandname/Brandname.vue";
import Template from "@/components/template/Template.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/brandname',
            name: 'brandname',
            component: Brandname
        },
        {
            path: '/brandname-price',
            name: 'brandnamePrice',
            component: BrandnamePrice
        },
        {
            path: '/template',
            name: 'template',
            component: Template
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        }
    ]
})

export default router
