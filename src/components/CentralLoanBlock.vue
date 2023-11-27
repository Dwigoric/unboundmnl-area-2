<script setup>
// Packages
import { ref, reactive, onBeforeMount, onMounted } from 'vue'

// Project constants
import { API_URL, LOAN_TYPES } from '../constants'

// Import router
import router from '../router'

// Stores
import { useProfileDataStore } from '../stores/profileData'
const profileDataStore = useProfileDataStore()

// Props
const props = defineProps({
    username: {
        type: String,
        required: false
    }
})

// Constants
const headers = [
    { title: 'Type of Loan', key: 'type' },
    { title: 'Loanee', key: 'loanee' },
    { title: 'Original Amount of Loan', key: 'amount' },
    { title: 'Outstanding Balance', key: 'balance' },
    { title: 'Status', key: 'status' },
    { title: 'Due Date', key: 'dueDate' },
    { title: 'View Loan Ledger', key: 'id' }
]
const buildStatus = {
    pending: ['Pending', 'purple'],
    approved: ['Approved (for release)', 'orange'],
    released: ['Approved (released)', 'success'],
    rejected: ['Rejected', 'red'],
    complete: ['Complete', 'blue']
}
const notificationSettings = {
    period_1: 0,
    period_2: 0,
    period_3: 0
}

// Reactive variables
const search = ref('')
const releaseLoading = ref([])
const items = reactive([])

if (props.username) headers.splice(1, 1)

// Methods

/**
 * Visits individual loan ledger based on its ID
 * @param {*} loanID - ID of individual loan
 */
const visitLoanLedger = async (loanID) => {
    router.push({ name: 'Loan Ledger', params: { id: loanID } })
}

/**
 * Visits the member profile based on their username
 * @param {*} username - Username of the member
 */
const visitMemberProfile = async (username) => {
    if (profileDataStore.profileData && profileDataStore.profileData.username !== username)
        profileDataStore.setProfileData({})
    router.push({ name: 'Profile View', params: { username } })
}

/**
 * Gets the corresponding color for the data
 * @param {*} dueDate - Due date of the loan
 */
const getDateColor = (dueDate) => {
    const currentDate = new Date()

    const diffTime = Math.abs(currentDate - new Date(dueDate))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= notificationSettings.period_1) return 'red'
    else if (diffDays <= notificationSettings.period_2) return 'orange'
    else if (diffDays <= notificationSettings.period_3) return 'blue'
    else return 'green'
}

const markAsReleased = async (loanID) => {
    releaseLoading.value.push(loanID)
    const res = await fetch(`${API_URL}/loans/${loanID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        },
        body: JSON.stringify({
            status: 'released'
        })
    })

    if (res.status === 200) {
        const { dueDate } = await res.json()
        const index = items.findIndex((item) => item.id === loanID)
        items[index].status = 'released'
        items[index].dueDate = dueDate
    }

    releaseLoading.value.splice(releaseLoading.value.indexOf(loanID), 1)
}

// Lifecycle hooks
onBeforeMount(async () => {
    const res = await fetch(`${API_URL}/settings/notifications`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        }
    })

    if (res.status === 200) {
        const { settings } = await res.json()
        notificationSettings.period_1 = settings.notification_period_1
        notificationSettings.period_2 = settings.notification_period_2
        notificationSettings.period_3 = settings.notification_period_3
    }
})
onMounted(async () => {
    const url = props.username ? `/user/${props.username}` : ''
    const params = new URLSearchParams()
    params.set('status', 'approved,released')
    const res = await fetch(`${API_URL}/loans${url}?${params}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        }
    })

    if (res.status === 200) {
        const { loans } = await res.json()
        items.push(
            ...loans.map((loan) => ({
                id: loan.loanID,
                loanee: loan.username,
                type: LOAN_TYPES[loan.loanType],
                balance: Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'PHP'
                }).format(Number(loan.balance)),
                amount: Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'PHP'
                }).format(Number(loan.originalLoanAmount)),
                status: loan.status,
                dueDate: loan.dueDate
            }))
        )
    }
})
</script>

<template>
    <v-card-title class="d-flex align-center w-25">
        <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            density="compact"
            label="Search"
            single-line=""
            flat=""
            hide-details
            variant="solo-filled"
        ></v-text-field>
    </v-card-title>

    <v-data-table
        :headers="headers"
        :items="items"
        hover=""
        multi-sort=""
        :search="search"
        sticky=""
        :sort-by="[
            { key: 'status', order: 'asc' },
            { key: 'dueDate', order: 'asc' }
        ]"
    >
        <template #item.loanee="{ value }">
            <v-btn class="text-none bg-blue-darken-1" @click.prevent="visitMemberProfile(value)">
                {{ value }}
            </v-btn>
        </template>

        <template #item.submissionDate="{ value }">
            <v-chip>
                {{
                    new Date(value).toLocaleDateString('en-PH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })
                }}
            </v-chip>
        </template>

        <template #item.status="{ value, item }">
            <v-chip :color="buildStatus[value][1]"> {{ buildStatus[value][0] }} </v-chip>
            <!-- <v-btn
                    class="bg-teal-lighten-3 ml-2 text-none"
                    density="comfortable"
                    variant="text"
                    prepend-icon="mdi-send-check"
                    v-if="value === 'approved'"
                    :loading="releaseLoading.includes(item.id)"
                    @click.prevent="markAsReleased(item.id)"
                >
                    Mark as released
                </v-btn> -->
        </template>

        <template #item.dueDate="{ value }">
            <v-chip
                :color="Date.now() > new Date(value).getTime() ? 'red' : getDateColor(value)"
                v-if="value"
            >
                {{
                    new Date(value).toLocaleDateString('en-PH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })
                }}
            </v-chip>
            <v-tooltip location="top" v-if="value && Date.now() > new Date(value).getTime()">
                <template #activator="{ props }">
                    <v-icon v-bind="props" color="var(--vt-c-red)">mdi-alert</v-icon>
                </template>
                <span>This loan is overdue!</span>
            </v-tooltip>
        </template>

        <template #item.id="{ value }">
            <v-btn
                class="text-none bg-blue-darken-1"
                @click.prevent="visitLoanLedger(value)"
                density="comfortable"
                icon="mdi-arrow-right-circle"
            />
        </template>
    </v-data-table>
</template>

<style>
.cursor-pointer {
    cursor: pointer;
}
</style>
