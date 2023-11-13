<script setup>
// Import packages
import { ref, onMounted, computed } from 'vue'
import { Grid, h } from 'gridjs'
import 'gridjs/dist/theme/mermaid.css'

// Import constants
import { API_URL, LOAN_TYPES } from '../constants'

// Import components
import LoanLedgerEdit from '../components/LoanLedgerEdit.vue'
import LoanLedgerAdd from '../components/LoanLedgerAdd.vue'

// Define props for the component
const props = defineProps({
    loanID: {
        type: [Number, String],
        default: null
    }
})

const ledgerData = ref([])
const popupData = ref([])
const isAddPopupActive = ref(false) // for add transaction pop up
const isPopupActive = ref(false) // for edit transaction pop up

const setPopupAdd = () => {
    // database connection stuff
    isAddPopupActive.value = true
}

const setPopupEdit = () => {
    // if (data.value.length === 0) return

    // popupData.value = data.value.find((loan) => loan[0] === loanId)
    isPopupActive.value = true
}

const loanAmount = ref(0)
const loanee = ref('')
const loanType = ref('')
const loanTerm = ref(0)
const loanPaymentFrequency = ref('')

// Format the loan amount to PHP standard
const formattedLoanAmount = computed(() => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(
        loanAmount.value
    )
})

// const formattedLoanAmount = ref(
//     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(loanAmount)
// )

// TODO: loan mode of payment

const loanTransactionColumns = [
    { name: 'Date of Payment' },
    { name: 'GV/OR Number' },
    { name: 'Amount Paid' },
    { name: 'Balance' },
    { name: 'Interest Paid' },
    { name: 'Fines Paid' },
    { name: 'Date of Entry' },
    { name: 'Officer in Charge' },
    {
        name: 'Actions',
        formatter: (cell, row) => {
            return h(
                'v-hover',
                {
                    className: 'py-2 mb-4 px-4 border rounded-md cursor-pointer rounded-lg btn',
                    onClick: () => setPopupEdit(row.cells[0].data)
                },
                'Edit row'
            )
        }
    }
]

// Create a ref to hold new loanPaymentsTable template
const loanPaymentsTable = ref()

// Create a ref to hold new grid instance
const loanPayments = ref()

const getLoanInfo = async () => {
    // Fetch loan properties from the database by using the loanID property!
    const loanInfoJSON = await fetch(`${API_URL}/loans/get/${props.loanID}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        }
    }).then((res) => res.json())

    if (loanInfoJSON) {
        const loanData = loanInfoJSON.loan
        loanAmount.value = loanData.originalLoanAmount
        loanee.value = loanData.username
        loanType.value = LOAN_TYPES[loanData.loanType]
        loanTerm.value = loanData.term
        loanPaymentFrequency.value = loanData.paymentFrequency
    }

    const ledgerRes = await fetch(`${API_URL}/loans/${props.loanID}/ledger`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        }
    })

    const ledgerJson = await ledgerRes.json()
    console.log(ledgerJson)

    ledgerData.value = ledgerJson.ledger.map((transaction) => {
        return [
            transaction.paymentDate,
            transaction.ORNumber,
            transaction.amountPaid,
            transaction.balance,
            transaction.interestPaid,
            transaction.finesPaid,
            transaction.submissionDate,
            `${transaction.officerInCharge.last}, ${transaction.officerInCharge.given}`
        ]
    })
}

// rerender the table
const rerenderTable = function () {
    // can't do anything about the errors that show up when running this, it's a bug in gridjs
    // https://github.com/grid-js/gridjs/issues/1291
    loanPayments.value
        .updateConfig({
            search: true,
            pagination: true,
            data: ledgerData.value
        })
        .forceRender()
}

// Ideally, we do a fetch request to the database to grab the data.
onMounted(async () => {
    await getLoanInfo()

    // Grid for all the loan's payments
    loanPayments.value = new Grid({
        columns: loanTransactionColumns,
        data: ledgerData.value,
        pagination: {
            limit: 10
        },
        search: true,
        sort: true,
        resizable: true,
        fixedHeader: true,
        className: {
            th: 'pa-3',
            td: 'pa-2',
            tr: 'my-16 py-3'
        },
        style: {
            th: {
                'min-width': '250px'
            },
            tr: {
                'margin-bottom': '1rem'
            }
        }
    })

    // Render loanPayments in corresponding reference
    loanPayments.value.render(loanPaymentsTable.value)
})
</script>

<template>
    <div class="w-100">
        <div id="loan-info-wrapper" class="d-flex justify-space-between align-center">
            <div id="loan-amount-cell" class="h-75 w-30 pa-2">
                <p class="font-weight-bold">Loan Amount:</p>
                <p class="loan-amount">{{ formattedLoanAmount }}</p>
            </div>
            <div class="d-flex justify-space-evenly align-center h-75 pa-2">
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-2">
                    <p class="font-weight-bold">Loanee:</p>
                    <p class="loan-properties">{{ loanee }}</p>
                </div>
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                    <p class="font-weight-bold">Loan ID:</p>
                    <p class="loan-properties">{{ loanID }}</p>
                </div>
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                    <p class="font-weight-bold">Type of Loan:</p>
                    <p class="loan-properties">{{ loanType }}</p>
                </div>
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                    <p class="font-weight-bold">Term of Loan:</p>
                    <p class="loan-properties">{{ loanTerm }}</p>
                </div>

                <!-- TODO: Add Loan Approval Date -->
                <!-- TODO: Add Coborrower Name -->
                <!-- TODO: Add Mode of Payment -->
            </div>
        </div>

        <v-divider :thickness="1" class="mt-3 mb-3 border-opacity-70" />

        <div id="loan-payments-wrapper" ref="loanPaymentsTable" class="w-100"></div>
        <VBtn
            @click="setPopupAdd"
            block
            size="large"
            density="compact"
            rounded="lg"
            prepend-icon="mdi-plus-circle"
            class="capitalize btn"
        >
            Add New Transaction
        </VBtn>

        <!-- Form popup for ADD TRANSACTION -->
        <VDialog width="1000" v-model="isAddPopupActive">
            <template #default="{ isActive }">
                <VCard close-on-back contained class="form-wrapper">
                    <VContainer fluid>
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

                    <LoanLedgerAdd
                        :loanID="loanID"
                        :onsubmit="
                            async () => {
                                await getLoanInfo()
                                rerenderTable()
                                isActive.value = false
                            }
                        "
                    />
                </VCard>
            </template>
        </VDialog>

        <!-- Form popup for EDIT TRANSACTION-->
        <VDialog width="1000" v-model="isPopupActive">
            <template #default="{ isActive }">
                <VCard close-on-back contained class="form-wrapper">
                    <VContainer fluid>
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

                    <LoanLedgerEdit />
                </VCard>
            </template>
        </VDialog>
    </div>
</template>

<style scoped>
.btn {
    padding: 1.2%;
    color: var(--vt-c-white-off);
    background: var(--vt-c-blue);
    border-radius: 5px;
    text-transform: capitalize;
}

.btn:hover {
    background: var(--vt-c-blue-dark);
}

.grid-x-borders {
    border-top: none;
    border-bottom: none;
    border-right: solid 1px solid #e5e7eb;
    border-left: solid 1px solid #e5e7eb;
}

.grid-left-border {
    border-left: solid 1px #e5e7eb;
}

.grid-right-border {
    border-right: solid 1px #e5e7eb;
}

.loan-info-cell {
    min-width: 150px;
}

.loan-info-wrapper {
    background-color: var(--vt-c-white-off);
}

.loan-amount {
    font-size: 2.5rem;
}

.loan-properties {
    font-size: 1.25rem;
}

.gap-1 {
    gap: 1rem;
}

.gridjs-th {
    white-space: normal;
}
</style>
