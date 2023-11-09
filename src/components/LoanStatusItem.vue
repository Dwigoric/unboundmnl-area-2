<script setup>
// Packages
import { ref, onMounted } from 'vue'
import { Grid, h } from 'gridjs'
import 'gridjs/dist/theme/mermaid.css'
import LoanStatusItemPopup from './LoanStatusItemPopup.vue'

// Project constants
import { API_URL, LOAN_TYPES } from '../constants'

// TODO: Create proper vars
// defineProps({
//     givenName: String,
//     lastName: String,
//     username: String
// });

// Reactive variables
const loanStatusTable = ref()
const loanStatus = ref()
const isPopupActive = ref(false)
const data = ref([])
const popupData = ref([])

// Methods
const fetchLoans = async () => {
    const credentials = window.$cookies.get('credentials')

    if (!credentials) {
        console.error('No credentials found')
        return
    }

    const { token } = credentials

    if (!token) {
        console.error('No token found')
        return
    }

    const params = new URLSearchParams()
    params.set('access_token', token)
    const { error, message, loans } = await fetch(`${API_URL}/loans?${params}`).then((res) =>
        res.json()
    )

    if (error) {
        console.error(message)
        return
    }

    data.value = loans.map((loan) => [
        loan.id,
        loan.username,
        loan.loanType,
        loan.originalLoanAmount,
        loan.status
    ])
}

const setPopupLoan = (loanId) => {
    if (data.value.length === 0) return

    popupData.value = data.value.find((loan) => loan[0] === loanId)
    isPopupActive.value = true
}

// Lifecycle hooks
onMounted(async () => {
    await fetchLoans()

    loanStatus.value = new Grid({
        columns: [
            { name: 'Loan ID', hidden: true },
            'Loanee',
            {
                name: 'Type of Loan',
                formatter: (cell) => LOAN_TYPES[cell]
            },
            'Amount of Loan',
            {
                name: 'Change Status',
                formatter: (cell, row) => {
                    return h(
                        'v-hover',
                        {
                            className: 'py-2 mb-4 px-4 border rounded-md',
                            onClick: () => setPopupLoan(row.cells[0].data)
                        },
                        'Change Status'
                    )
                }
            }
        ],
        pagination: {
            limit: 10
        },
        search: true,
        sort: true,
        resizable: true,
        fixedHeader: true,
        data: data.value,
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
    loanStatus.value.render(loanStatusTable.value)
})
</script>

<template>
    <div id="loan-status-wrapper" ref="loanStatusTable" class="w-100 px-4"></div>
    <VDialog width="1200" v-model="isPopupActive">
        <!-- Form popup -->
        <template #default="{ isActive }">
            <VCard close-on-back contained class="form-wrapper">
                <VContainer>
                    <VRow justify="end">
                        <VCardActions>
                            <VBtn
                                class="ma-2 capitalize-text"
                                color="var(--vt-c-blue)"
                                @click="isActive.value = false"
                                icon="mdi-close"
                            >
                            </VBtn>
                        </VCardActions>
                    </VRow>
                </VContainer>

                <LoanStatusItemPopup :data="popupData" />
            </VCard>
        </template>
    </VDialog>
</template>

<style>
.form-wrapper {
    background-color: var(--vt-c-white-off);
}

.memberdiv {
    margin-top: -7px;
    padding: 0;
}

.officer-profile-btn {
    background-color: rgba(239, 239, 239, 0.525);
    /* border: 1px solid black */
}

.officer-icon-box {
    min-width: 5.5rem;
}

.officer-icon {
    font-size: 4rem;
}

.officer-actions-box {
    gap: 0.5rem;
}

.officer-action-icon {
    font-size: 2rem;
}

.officer-action-icon:hover {
    opacity: 0.65;
}
</style>
