// Import packages
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

// Import view components
import LoginView from '../views/LoginView.vue'
import DashboardMain from '../views/DashboardMain.vue'
import MemberProfilesView from '../views/MemberProfilesView.vue'
import OfficerProfilesView from '../views/OfficerProfilesView.vue'
import NewLoanApplication from '../views/NewLoanAppView.vue'
import MemberSearch from '../components/MemberSearch.vue'
import LoanApplicationForm from '../components/LoanApplicationForm.vue'
import LoanApplicationFormExport from '../components/LoanApplicationFormExport.vue'
import LoanStatus from '../views/LoanStatus.vue'
import DashboardDeposit from '../views/DashboardDeposit.vue'
import LoanLedgerView from '../views/LoanLedgerView.vue'
import LoanTransaction from '../views/LoanTransaction.vue'
import LoanLedgerAdd from '../components/LoanLedgerAdd.vue'
import EnterDeposit from '../views/EnterDeposit.vue'
import DepositAdd from '../components/DepositAdd.vue'
import DepositLedgerView from '../views/DepositLedgerView.vue'
import MemberView from '../views/MemberView.vue'
import TransactionSettings from '../views/TransactionSettings.vue'
import NotificationSettings from '../views/NotificationSettings.vue'
import AdminSettings from '../views/AdminSettings.vue'

// Disable NProgress spinner
NProgress.configure({ showSpinner: false })

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
            path: '/member-profiles/:username',
            name: 'Profile View',
            component: MemberView,
            props: true,
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
                    path: '',
                    redirect: '/new-loan-application/' + PATH_NAMES.APP_FORM.MEMBER_INPUT
                },
                {
                    path: PATH_NAMES.APP_FORM.MEMBER_INPUT,
                    name: 'Loan Application Member Input',
                    component: MemberSearch,
                    props: { to: 'Loan Application Details' }
                },
                {
                    path: PATH_NAMES.APP_FORM.APPLICATION_DETAILS,
                    name: 'Loan Application Details',
                    component: LoanApplicationForm,
                    beforeEnter: (to, from, next) => {
                        // Redirect to member input if `from` is not member input
                        if (from.name !== 'Loan Application Member Input')
                            next({ name: 'Loan Application Member Input' })
                        else next()
                    }
                },
                {
                    path: PATH_NAMES.APP_FORM.EXPORT_FORM,
                    name: 'Export Application Form',
                    component: LoanApplicationFormExport,
                    beforeEnter: (to, from, next) => {
                        // Redirect to member input if `from` is not application details
                        if (from.name !== 'Loan Application Details')
                            next({ name: 'Loan Application Member Input' })
                        else next()
                    }
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
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/loan-transaction',
            name: 'Loan Transaction',
            component: LoanTransaction,
            children: [
                {
                    path: '',
                    redirect: '/loan-transaction/' + PATH_NAMES.LOAN_TRANSACTIONS.MEMBER_INPUT
                },
                {
                    path: PATH_NAMES.LOAN_TRANSACTIONS.MEMBER_INPUT,
                    name: 'Loan Transaction Member Input',
                    component: MemberSearch,
                    props: { to: 'Loan Transaction Details', canCreateNewMember: false }
                },
                {
                    path: PATH_NAMES.LOAN_TRANSACTIONS.TRANSACTION_DETAILS,
                    name: 'Loan Transaction Details',
                    component: LoanLedgerAdd,
                    beforeEnter: (to, from, next) => {
                        // Redirect to member input if `from` is not member input
                        if (from.name !== 'Loan Transaction Member Input')
                            next({ name: 'Loan Transaction Member Input' })
                        else next()
                    }
                }
            ],
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/deposit-dashboard',
            name: 'Deposit Dashboard',
            component: DashboardDeposit,
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/enter-deposit',
            name: 'Enter Deposit',
            component: EnterDeposit,
            children: [
                {
                    path: '',
                    redirect: '/enter-deposit/' + PATH_NAMES.DEPOSIT_TRANSACTIONS.MEMBER_INPUT
                },
                {
                    path: PATH_NAMES.DEPOSIT_TRANSACTIONS.MEMBER_INPUT,
                    name: 'Deposit Transaction Member Input',
                    component: MemberSearch,
                    props: { to: 'Deposit Transaction Details', canCreateNewMember: false }
                },
                {
                    path: PATH_NAMES.DEPOSIT_TRANSACTIONS.TRANSACTION_DETAILS,
                    name: 'Deposit Transaction Details',
                    component: DepositAdd,
                    beforeEnter: (to, from, next) => {
                        // Redirect to member input if `from` is not member input
                        if (from.name !== 'Deposit Transaction Member Input')
                            next({ name: 'Deposit Transaction Member Input' })
                        else next()
                    }
                }
            ],
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/deposit-ledger/:id',
            name: 'Deposit Ledger',
            component: DepositLedgerView,
            props: true, // allows props to be passed
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/settings/loans-and-deposits',
            name: 'Loans and Deposits Settings',
            component: TransactionSettings,
            props: true, // allows props to be passed
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/settings/notification',
            name: 'Notification Settings',
            component: NotificationSettings,
            props: true, // allows props to be passed
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/settings/admin',
            name: 'Admin Settings',
            component: AdminSettings,
            props: true, // allows props to be passed
            beforeEnter: (to, from, next) => {
                const credentials = window.$cookies.get('credentials')
                if (!credentials || !credentials.token) next({ name: 'Login' })
                else next()
            }
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(NProgress.done)

export default router
