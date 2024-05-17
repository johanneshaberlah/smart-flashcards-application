import {createRouter, createWebHistory} from 'vue-router'
import LoginRegister from "@/views/LoginRegister.vue";
import EditStack from "@/views/EditStack.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/LandingPage.vue'),
        },
        {
            path: '/login',
            name: 'Einloggen',
            component: LoginRegister,
            props: {action: 'login'},
            meta: {
                title: 'Login - Smart Flashcards'
            }
        },
        {
            path: '/register',
            name: 'Registrieren',
            component: LoginRegister,
            props: {action: 'register'},
            meta: {
                title: 'Registrieren - Smart Flashcards'
            }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('@/views/Dashboard.vue'),
            meta: {
                title: 'Dashboard - Smart Flashcards'
            }
        },
        {
            path: '/stack/:stackName',
            name: ':stackName',
            component: () => import('@/views/Stack.vue'),
            props: true,
            meta: {
                title: 'Stapel - Smart Flashcards'
            }
        },
        {
            path: '/stack/:stackName/edit',
            name: ':stackName bearbeiten',
            component: EditStack,
            props: true,
            meta: {
                title: 'Stapel bearbeiten - Smart Flashcards'
            }
        },
    ]
})

export default router
