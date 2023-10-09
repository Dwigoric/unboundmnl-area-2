import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/officerRegister',
            name: 'officerRegister',
            component: () => import('../views/testOfficerRegister.vue')
        },
        {
            path: '/userProfileRegister',
            name: 'userProfile',
            component: () => import('../views/testUserProfile.vue')
        }
    ]
})

export default router
