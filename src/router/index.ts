import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import LoginRegister from "@/views/auth/LoginRegister.vue";
import Stack from "@/views/stack/Stack.vue";
import CreateStack from "@/views/stack/CreateStack.vue";
import CreateOrUpdateCard from "@/views/stack/CreateOrUpdateCard.vue";
import Learning from "@/views/stack/Learning.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/LandingPage.vue'),
        meta: {
            title: 'Smart Flashcards',
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'Anmelden',
        component: LoginRegister,
        props: { action: 'login' },
        meta: {
            title: 'Anmelden - Smart Flashcards',
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'Registrieren',
        component: LoginRegister,
        props: { action: 'register' },
        meta: {
            title: 'Registrieren - Smart Flashcards',
            requiresAuth: false
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
            title: 'Dashboard - Smart Flashcards',
            requiresAuth: true
        }
    },
    {
        path: '/stack/:stackId',
        name: ':stackId',
        component: Stack,
        props: true,
        meta: {
            title: 'Stapel - Smart Flashcards',
            requiresAuth: true
        }
    },
    {
        path: '/stack/:stackId/magic',
        name: 'Stapel-Magie',
        component: () => import('@/views/stack/StackMagic.vue'),
        props: true,
        meta: {
            title: 'Magie - Smart Flashcards',
            requiresAuth: true
        }
    },
    {
        path: '/stack/create',
        name: 'Stapel erstellen',
        component: CreateStack,
        props: true,
        meta: {
            title: 'Stapel erstellen - Smart Flashcards',
            requiresAuth: true
        }
    },
    {
        path: '/stack/:stackId/card/create',
        name: 'Karte erstellen',
        component: CreateOrUpdateCard,
        props: true,
        meta: {
            title: 'Karte erstellen - Smart Flashcards',
            requiresAuth: true
        }
    },
    {
        path: '/stack/:stackId/learn',
        name: 'Stapel lernen',
        component: Learning,
        props: true,
        meta: {
            title: 'Stapel lernen - Smart Flashcards',
            requiresAuth: true
        }
    },
    {
        path: '/stack/:stackId/card/:cardId',
        name: 'Karte bearbeiten',
        component: CreateOrUpdateCard,
        props: true,
        meta: {
            title: 'Karte bearbeiten - Smart Flashcards',
            requiresAuth: true
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/',
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const authToken = Cookies.get('auth');
    if (to.meta.requiresAuth && !authToken) {
        next({ name: 'Anmelden' });
    } else {
        next();
    }
});

export default router;
