import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardMain from '../views/DashboardMain.vue'
import MemberProfilesView from '../views/MemberProfilesView.vue'
import OfficerProfilesView from '../views/OfficerProfilesView.vue'
import testUserProfileRegView from '../views/testerPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: LoginView
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: DashboardMain
        },
        {
            path: '/memberProfiles',
            name: 'Member Profiles View',
            component: MemberProfilesView
        },
        {
            path: '/officerProfiles',
            name: 'Officer Register',
            component: OfficerProfilesView
        },

        {
            path: '/testerPage',
            name: 'testPage',
            component: testUserProfileRegView
        },
    ]
})

export default router
