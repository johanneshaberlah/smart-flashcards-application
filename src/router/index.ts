import {createRouter, createWebHistory} from 'vue-router'
import LoginRegister from "@/views/LoginRegister.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/LandingPage.vue')
        },
        {
            path: '/login',
            name: 'Einloggen',
            component: LoginRegister,
            props: {action: 'login'}
        },
        {
            path: '/register',
            name: 'Registrieren',
            component: LoginRegister,
            props: {action: 'register'}
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('@/views/Dashboard.vue')
        },
    ]
})

export default router
