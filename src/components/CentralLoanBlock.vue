<script setup>
// Packages
import { ref, onMounted } from 'vue'
import { Grid, h } from 'gridjs'

// Project constants
import { API_URL, LOAN_TYPES } from '../constants'

// Stylesheets
import 'gridjs/dist/theme/mermaid.css'

// Import router
import router from '../router'

// Props
const props = defineProps({
    username: {
        type: String,
        required: false
    }
})

// Reactive variables
const loan = ref()
const loansTable = ref()

// Methods

/**
 * Visits individual loan ledger based on its ID
 * @param {*} loanID - ID of individual loan
 */
const visitLoanLedger = async (loanID) => {
    router.push({ name: 'Loan Ledger', params: { id: loanID } })
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
        const resJson = await res.json()
        const rawLoanData = resJson.loans
        const loanData = rawLoanData.map((row) => {
            return [row.loanID, row.username, row.loanType, row.originalLoanAmount]
        })

        loan.value = new Grid({
            columns: [
                { name: 'LoanID', hidden: true },
                { name: 'Loanee', hidden: props.username !== undefined },
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
                },
                {
                    name: 'View Loan Ledger',
                    formatter: (cell, row) => {
                        return h(
                            'v-hover',
                            {
                                className:
                                    'cursor-pointer hover-scale-md py-2 mb-4 px-4 border rounded-md',
                                onClick: () => visitLoanLedger(row.cells[0].data) // grabs the row's Loan ID and passes it to the function.
                            },
                            'View Loan Ledger'
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
            data: loanData,
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
        loan.value.render(loansTable.value)
    }
})
</script>

<template>
    <div id="loan-status-wrapper" ref="loansTable" class="w-100 px-4" />
</template>

<style>
.cursor-pointer {
    cursor: pointer;
}
</style>
