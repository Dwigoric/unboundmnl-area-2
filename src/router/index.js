import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardMain from '../views/DashboardMain.vue'
import MemberProfilesView from '../views/MemberProfilesView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: DashboardMain
        },
        {
            path: '/memberProfiles',
            name: 'User',
            component: MemberProfilesView
        },
        // {
        //     // path: '/officerRegister',
        //     // name: 'officerRegister',
        //     // component: () => import('../views/testOfficerRegister.vue')
        // },
    ]
})

export default router
