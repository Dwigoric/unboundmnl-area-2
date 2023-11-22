<script setup>
// Packages
import { ref, onMounted } from 'vue'
import { Grid } from 'gridjs'

// Project constants
import { API_URL, LOAN_TYPES } from '../constants'

import { useCurrentUserStore } from '../stores/currentUser.js'
const currentUserStore = useCurrentUserStore()

// Stylesheets
import 'gridjs/dist/theme/mermaid.css'

// Reactive variables
const loanStatusTableUser = ref()
const loanStatusUser = ref()
const errorAlert = ref(false)
const errorMessage = ref('')
const processing = ref(false)

// Props
const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    onsubmit: {
        type: Function,
        required: true
    }
})

// Methods
const decide = async (toApprove) => {
    processing.value = true

    const credentials = window.$cookies.get('credentials')

    if (!credentials) {
        errorAlert.value = true
        errorMessage.value = 'No credentials found'
        return
    }

    const { token } = credentials

    if (!token) {
        errorAlert.value = true
        errorMessage.value = 'No token found'
        return
    }

    const { error, message } = await fetch(`${API_URL}/loans/review-application/${props.data[0]}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            approved: toApprove,
            oic: currentUserStore.name
        })
    }).then((res) => res.json())

    processing.value = false

    // Reset error alert
    errorAlert.value = false
    errorMessage.value = ''

    if (error) {
        errorAlert.value = true
        errorMessage.value = message
        return
    }

    props.onsubmit(props.data[0])
}

// Lifecycle hooks
onMounted(() => {
    console.log(currentUserStore.name)

    loanStatusUser.value = new Grid({
        columns: [
            {
                name: 'Loan ID',
                hidden: true
            },
            'Loanee',
            {
                name: 'Type of Loan',
                formatter: (cell) => LOAN_TYPES[cell]
            },
            {
                name: 'Amount of Loan',
                formatter: (cell) =>
                    Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(
                        Number(cell)
                    )
            }
        ],
        data: [props.data],
        className: {
            // Define your class names here
        },
        style: {
            table: {
                // Define your table styles here
            },
            tr: {
                // Define row styles here
            }
        }
    })

    // Render loanStatus in corresponding reference
    loanStatusUser.value.render(loanStatusTableUser.value)
})
</script>

<template>
    <h2 class="header-wrapper">Change the status of the loan below</h2>
    <div class="wrapper">
        <div id="loan-status-wrapper" ref="loanStatusTableUser" class="w-100 px-4"></div>
        <VAlert
            v-if="errorAlert"
            v-model="errorAlert"
            type="error"
            closable=""
            density="comfortable"
            elevation="5"
        >
            {{ errorMessage }}
        </VAlert>
        <div class="ml-auto d-flex justify-end pt-4">
            <!-- Reject Loan -->
            <v-btn
                class="capitalize"
                prepend-icon="mdi-check-bold"
                variant="plain"
                color="green"
                :loading="processing"
                @click.prevent="decide(true)"
            >
                Accept Loan
            </v-btn>

            <!-- Approve Loan -->
            <v-btn
                class="capitalize"
                prepend-icon="mdi-close-thick"
                variant="plain"
                color="red"
                :loading="processing"
                @click.prevent="decide(false)"
            >
                Reject Loan
            </v-btn>
        </div>
    </div>
</template>

<style scoped>
.header-wrapper {
    padding-left: 7%;
    padding-bottom: 2%;
}
.wrapper {
    padding: 6%;
    padding-top: 2%;
    padding-bottom: 3%;
    background-color: var(--vt-c-white);
}
</style>
