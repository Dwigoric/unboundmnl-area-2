import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // DONE: Route Login here
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
    ]
})

export default router
