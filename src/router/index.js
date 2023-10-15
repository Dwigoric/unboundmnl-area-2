// Import packages
import { createRouter, createWebHistory } from 'vue-router'

// Import view components
import LoginView from '../views/LoginView.vue'
import DashboardMain from '../views/DashboardMain.vue'
import MemberProfilesView from '../views/MemberProfilesView.vue'
import OfficerProfilesView from '../views/OfficerProfilesView.vue'
import testUserProfileRegView from '../views/testerPage.vue'
import NewLoanApplication from '../views/NewLoanAppView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: LoginView,
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (credentials && credentials.token) next({ name: 'Dashboard' })
                else next()
            }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: DashboardMain,
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/memberProfiles',
            name: 'Member Profiles View',
            component: MemberProfilesView,
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/officerProfiles',
            name: 'Officer Register',
            component: OfficerProfilesView,
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/newLoanApplication',
            name: 'New Loan Application',
            component: NewLoanApplication,
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/testerPage',
            name: 'testPage',
            component: testUserProfileRegView,
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        }
    ]
})

export default router
