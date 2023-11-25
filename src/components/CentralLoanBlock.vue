<script setup>
// Packages
import { ref, reactive, onMounted } from 'vue'

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

// Reactive variables
const search = ref('')
const releaseLoading = ref([])
const items = reactive([])
const headers = [
    { title: 'Type of Loan', key: 'type' },
    { title: 'Loanee', key: 'loanee' },
    { title: 'Original Amount of Loan', key: 'amount' },
    { title: 'Outstanding Balance', key: 'balance' },
    { title: 'Submission Date', key: 'submissionDate' },
    { title: 'Status', key: 'status' },
    { title: 'Due Date', key: 'dueDate' },
    { title: 'View Loan Ledger', key: 'id' }
]

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

    // TODO: Refer to settings for the number of days
    if (diffDays <= 7) return 'red'
    else if (diffDays <= 14) return 'orange'
    else if (diffDays <= 21) return 'yellow'
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

const buildStatus = {
    pending: ['Pending', 'purple'],
    approved: ['Approved (for release)', 'orange'],
    released: ['Approved (released)', 'success'],
    rejected: ['Rejected', 'red'],
    complete: ['Complete', 'blue']
}

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
                submissionDate: loan.submissionDate,
                status: loan.status,
                dueDate: loan.dueDate
            }))
        )
    }
})
</script>

<template>
    <v-card>
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
            <template v-slot:item.loanee="{ value }">
                <v-btn
                    class="text-none bg-blue-darken-1"
                    @click.prevent="visitMemberProfile(value)"
                >
                    {{ value }}
                </v-btn>
            </template>

            <template v-slot:item.submissionDate="{ value }">
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

            <template v-slot:item.status="{ value, item }">
                <v-chip :color="buildStatus[value][1]"> {{ buildStatus[value][0] }} </v-chip>
                <v-btn
                    class="bg-teal-lighten-3 ml-2 text-none"
                    density="comfortable"
                    variant="text"
                    prepend-icon="mdi-send-check"
                    v-if="value === 'approved'"
                    :loading="releaseLoading.includes(item.id)"
                    @click.prevent="markAsReleased(item.id)"
                >
                    Mark as released
                </v-btn>
            </template>

            <template v-slot:item.dueDate="{ value }">
                <v-chip :color="getDateColor(value)" v-if="value">
                    {{
                        new Date(value).toLocaleDateString('en-PH', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })
                    }}
                </v-chip>
            </template>

            <template v-slot:item.id="{ value }">
                <v-btn
                    class="text-none bg-blue-darken-1"
                    @click.prevent="visitLoanLedger(value)"
                    density="comfortable"
                    icon="mdi-arrow-right-circle"
                />
            </template>
        </v-data-table>
    </v-card>
</template>

<style>
.cursor-pointer {
    cursor: pointer;
}
</style>
