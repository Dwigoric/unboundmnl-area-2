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
const items = reactive([])
const headers = [
    { title: 'Type of Loan', key: 'type' },
    { title: 'Loanee', key: 'loanee' },
    { title: 'Amount of Loan', key: 'amount' },
    { title: 'Submission Date', key: 'submissionDate' },
    { title: 'Status', key: 'status'},
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
// TODO: Make this work
const getDateColor = (dueDate) => {
    var currentDate = new Date();
    if (dueDate == 1){
        console.log("HELP")
        console.log(dueDate)
        console.log(currentDate)
        return 'red'
    } 
    else return "null"
}

onMounted(async () => {
    const url = props.username ? `/${props.username}` : ''
    const params = new URLSearchParams()
    params.set('status', 'approved')
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
                amount: Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'PHP'
                }).format(Number(loan.originalLoanAmount)),
                submissionDate: new Date(loan.submissionDate).toLocaleDateString('en-PH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })
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
                <v-chip :color="getDateColor(value)">
                    {{  value }}
                </v-chip>
            </template>

            <template v-slot:item.status="{ value }">
                <v-chip :color="'purple'">
                    Pending
                </v-chip>

                <v-chip :color="'success'">
                    Approved
                </v-chip>

                <v-chip :color="'orange'">
                    Released
                </v-chip>

                <v-chip :color="'red'">
                    Rejected
                </v-chip>

                <v-chip :color="'blue'">
                    Complete
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
