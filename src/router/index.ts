import {createRouter, createWebHistory} from 'vue-router'
import LoginRegister from "@/views/auth/LoginRegister.vue";
import Stack from "@/views/stack/Stack.vue";
import CreateStack from "@/views/stack/CreateStack.vue";
import CreateOrUpdateCard from "@/views/stack/CreateOrUpdateCard.vue";
import Learning from "@/views/stack/Learning.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/LandingPage.vue'),
            meta: {
                title: 'Smart Flashcards'
            }
        },
        {
            path: '/login',
            name: 'Anmelden',
            component: LoginRegister,
            props: {action: 'login'},
            meta: {
                title: 'Anmelden - Smart Flashcards'
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
            path: '/stack/:stackId',
            name: ':stackId',
            component: () => import('@/views/stack/Stack.vue'),
            props: true,
            meta: {
                title: 'Stapel - Smart Flashcards'
            }
        },
        {
            path: '/stack/:stackId/magic',
            name: 'Stapel-Magie',
            component: () => import('@/views/stack/StackMagic.vue'),
            props: true,
            meta: {
                title: 'Magie - Smart Flashcards'
            }
        },
        {
            path: '/stack/create',
            name: 'Stapel erstellen',
            component: CreateStack,
            props: true,
            meta: {
                title: 'Stapel erstellen - Smart Flashcards'
            }
        },
        {
            path: '/stack/:stackId/card/create',
            name: 'Karte erstellen',
            component: CreateOrUpdateCard,
            props: true,
            meta: {
                title: 'Karte erstellen - Smart Flashcards'
            }
        },
        {
            path: '/stack/:stackId/learn',
            name: 'Stapel lernen',
            component: Learning,
            props: true,
            meta: {
                title: 'Stapel lernen - Smart Flashcards'
            }
        },
        {
            path: '/stack/:stackId/card/:cardId',
            name: 'Karte bearbeiten',
            component: CreateOrUpdateCard,
            props: true,
            meta: {
                title: 'Karte bearbeiten - Smart Flashcards'
            }
        },
    ]
})

export default router
