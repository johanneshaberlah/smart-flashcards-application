import {createRouter, createWebHistory} from 'vue-router'
import LoginRegister from "@/views/LoginRegister.vue";
import EditStack from "@/views/EditStack.vue";

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
        {
            path: '/stack/:stackName',
            name: ':stackName',
            component: () => import('@/views/Stack.vue'),
            props: true
        },
        {
            path: '/stack/:stackName/edit',
            name: ':stackName bearbeiten',
            component: EditStack,
            props: true,
        },
    ]
})

export default router
