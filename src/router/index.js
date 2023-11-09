// Import packages
import { createRouter, createWebHistory } from 'vue-router'

// Import view components
import LoginView from '../views/LoginView.vue'
import DashboardMain from '../views/DashboardMain.vue'
import MemberProfilesView from '../views/MemberProfilesView.vue'
import OfficerProfilesView from '../views/OfficerProfilesView.vue'
import NewLoanApplication from '../views/NewLoanAppView.vue'
import LoanApplicationSearch from '../components/LoanApplicationSearch.vue'
import LoanApplicationForm from '../components/LoanApplicationForm.vue'
import LoanApplicationFormExport from '../components/LoanApplicationFormExport.vue'
import LoanStatus from '../views/LoanStatus.vue'
import DashboardCapital from '../views/DashboardCapital.vue'
import LoanLedgerView from '../views/LoanLedgerView.vue'
import LoanTransaction from '../views/LoanTransaction.vue'


// Import path name constants
import { PATH_NAMES } from '../constants'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: LoginView,
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (credentials && credentials.token) next({ name: 'Loan Dashboard' })
                else next()
            }
        },
        {
            path: '/dashboard',
            name: 'Loan Dashboard',
            component: DashboardMain,
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/member-profiles',
            name: 'Member Profiles View',
            component: MemberProfilesView,
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/officer-profiles',
            name: 'Officer Register',
            component: OfficerProfilesView,
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/new-loan-application',
            name: 'New Loan Application',
            component: NewLoanApplication,
            children: [
                {
                    path: PATH_NAMES.APP_FORM.MEMBER_INPUT,
                    name: 'Member Input',
                    component: LoanApplicationSearch
                },
                {
                    path: PATH_NAMES.APP_FORM.APPLICATION_DETAILS,
                    name: 'Application Details',
                    component: LoanApplicationForm
                },
                {
                    path: PATH_NAMES.APP_FORM.EXPORT_FORM,
                    name: 'Export Application Form',
                    component: LoanApplicationFormExport
                }
            ],
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/loan-ledger/:id',
            name: 'Loan Ledger',
            component: LoanLedgerView,
            props: true, // allows props to be passed 
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/loan-status',
            name: 'Loan Status',
            component: LoanStatus,
            // TODO: this - jana uwu
            // beforeEnter: (to, from, next) => {
            //     const credentials = window.$cookies.get('credentials')
            //     if (!credentials || !credentials.token) next({ name: 'Login' })
            //     else next()
            // }
        },
        {
            path: '/loan-transaction',
            name: 'Loan Transaction',
            component: LoanTransaction,
            // TODO: this - jana uwu
            // beforeEnter: (to, from, next) => {
            //     const credentials = window.$cookies.get('credentials')
            //     if (!credentials || !credentials.token) next({ name: 'Login' })
            //     else next()
            // }
        },
        {
            path: '/cap-dashboard',
            name: 'Shared Capital Dashboard',
            component: DashboardCapital,
            // TODO: this - jana uwu
            // beforeEnter: (to, from, next) => {
            //     const credentials = window.$cookies.get('credentials')
            //     if (!credentials || !credentials.token) next({ name: 'Login' })
            //     else next()
            // }
        },
    ]
})

export default router
