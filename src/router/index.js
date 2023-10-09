import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardMain from '../views/DashboardMain.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // DONE: Route Login here
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/officerRegister',
            name: 'Officer Register',
            component: () => import('../views/testOfficerRegister.vue')
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: DashboardMain
        }
    ]
})

export default router
