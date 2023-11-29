<script setup>
// Import packages
import { ref, onMounted, computed, reactive } from 'vue'
import { Grid, h } from 'gridjs'
import 'gridjs/dist/theme/mermaid.css'

// Import constants
import { API_URL, LOAN_TYPES } from '../../constants/index.js'

// Import components
import LoanLedgerEdit from './LoanLedgerEdit.vue'
import LoanLedgerAdd from './LoanLedgerAdd.vue'
import LoanEdit from './LoanDepositEdit.vue'
import DeletePrompt from '../DeletePrompt.vue'
import LoanStatusEdit from './LoanStatusEdit.vue'

import router from '../../router/index.js'

// Define props for the component
const props = defineProps({
    loanID: {
        type: [Number, String],
        default: null
    }
})

const ledgerData = ref([])
const isAddPopupActive = ref(false) // for add transaction pop up
const isPopupActive = ref(false) // for edit transaction pop up
const originalLoanAmount = ref(0) // for dynamically calculating balance in form
const balance = ref(0)
const loanReleased = ref(false) // for monitoring whether loan is released or not

const currentlyEditedTransactionID = ref('')

// Create a ref to hold new loanPaymentsTable template
const loanPaymentsTable = ref()

// Create a ref to hold new grid instance
const loanPayments = ref()
const rawLoanData = ref()

const formData = reactive({
    amount: 0,
    loanee: '',
    type: '',
    term: '',
    paymentFrequency: '',
    totalAmountPaid: 0,
    coborrowerName: '',
    approvalDate: '',
    coborrower: {
        name: {
            given: '',
            middle: '',
            last: ''
        },
        birthday: '',
        birthplace: '',
        occupation: '',
        contact_no: ''
    }
})

// Format the loan amount to PHP standard
const formattedLoanAmount = computed(() => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(
        formData.amount
    )
})

// Format the current balance to PHP standard
const formattedBalance = computed(() => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(
        balance.value
    )
})

const loanTransactionColumns = [
    { name: 'Date of Transaction' },
    { name: 'GV/OR Number' },
    { name: 'Amount Due' },
    { name: 'Amount Paid' },
    { name: 'Balance' },
    { name: 'Interest Due' },
    { name: 'Interest Paid' },
    { name: 'Fines Due' },
    { name: 'Fines Paid' },
    { name: 'Date of Entry' },
    { name: 'Officer in Charge' }
]

// Give each transaction column a minimum width to properly fit the content
loanTransactionColumns.forEach((col) => {
    col.width = '225px'
})

const setPopupAdd = () => {
    isAddPopupActive.value = true
}

const getLoanInfo = async () => {
    // Fetch loan properties from the database by using the loanID property!
    const resJson = await fetch(`${API_URL}/loans/${props.loanID}`, {
        credentials: 'omit',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        }
    }).then((res) => res.json())

    if (resJson) {
        const loanData = resJson.loan
        rawLoanData.value = loanData

        // Also assign the original loan amount to the reactive variable
        originalLoanAmount.value = loanData.originalLoanAmount

        // Store value of balance
        balance.value = loanData.balance

        formData.amount = loanData.originalLoanAmount
        formData.loanee = loanData.username
        formData.type = LOAN_TYPES[loanData.loanType]
        formData.term = loanData.term
        formData.paymentFrequency =
            loanData.paymentFrequency.substring(0, 1).toUpperCase() +
            loanData.paymentFrequency.substring(1)
        formData.approvalDate = loanData.approvalDate.substring(0, 10)
        if (loanData.coborrower) {
            formData.coborrowerName = `${loanData.coborrower.name.last}, ${loanData.coborrower.name.given}`
        } else {
            formData.coborrowerName = 'No coborrower'
        }
        formData.status = loanData.status
        if (formData.status === 'released') {
            formData.status = 'Approved (Released)'
            loanReleased.value = true
        }
    }

    const ledgerRes = await fetch(`${API_URL}/loans/${props.loanID}/ledger`, {
        credentials: 'omit',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        }
    })

    const ledgerJson = await ledgerRes.json()

    ledgerData.value = ledgerJson.ledger.map((transaction) => {
        return [
            transaction.transactionDate.substring(0, 10),
            transaction.ORNumber,
            transaction.amountDue,
            transaction.amountPaid,
            transaction.balance,
            transaction.interestDue,
            transaction.interestPaid,
            transaction.finesDue,
            transaction.finesPaid,
            transaction.submissionDate.substring(0, 10),
            transaction.officerInCharge.given === 'Admin' &&
            transaction.officerInCharge.last === ' '
                ? 'Admin'
                : `${transaction.officerInCharge.last}, ${transaction.officerInCharge.given}`
        ]
    })
}

// Combines all the amounts paid for all the loan transactions
function getTotalAmountPaid(ledgerTransactions) {
    var totalAmountPaid = 0
    // For every transaction in the ledger, add its amount paid to a total sum

    ledgerTransactions.forEach((transaction) => {
        let amountPaid = transaction[4] // index for amount paid
        totalAmountPaid += amountPaid
    })

    return totalAmountPaid
}

// rerender the table
const rerenderTable = function () {
    // can't do anything about the errors that show up when running this, it's a bug in gridjs
    // https://github.com/grid-js/gridjs/issues/1291

    // Remove search and pagination plugins first
    loanPayments.value.plugin.remove('pagination')
    loanPayments.value.plugin.remove('search')

    loanPayments.value
        .updateConfig({
            search: true,
            pagination: { limit: 10 },
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
            tr: {
                'margin-bottom': '1rem'
            }
        }
    })

    // Render loanPayments in corresponding reference
    loanPayments.value.render(loanPaymentsTable.value)

    // Call getTotalAmountPaid
    formData.totalAmountPaid = getTotalAmountPaid(ledgerData.value)
})
</script>

<template>
    <div class="w-100">
        <div id="loan-info-wrapper" class="d-flex justify-space-between">
            <!-- Left -->
            <div id="loan-amount-cell" class="h-75 w-30 pa-2">
                <p>Outstanding Balance:</p>
                <p class="loan-amount">{{ formattedBalance }}</p>
                <p>Original Loan Amount: {{ formattedLoanAmount }}</p>
                <!-- TODO: remove this! -->
                <div class="d-flex flex-row">
                    <p>Loanee:</p>
                    <p class="font-weight-bold ml-3">{{ formData.loanee }}</p>
                </div>
                <div class="d-flex flex-row">
                    <p>Loan ID:</p>
                    <p class="font-weight-bold ml-3">{{ loanID }}</p>
                </div>
            </div>

            <!-- Right -->
            <div class="d-flex flex-column align-end justify-space-between">
                <div class="d-flex justify-space-evenly align-center pa-2">
                    <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                        <p>Loan Approval Date:</p>
                        <p class="font-weight-bold text-capitalize">
                            {{ formData.approvalDate }}
                        </p>
                    </div>
                    <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                        <p>Type of Loan:</p>
                        <p class="font-weight-bold text-capitalize">{{ formData.type }}</p>
                    </div>
                    <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                        <p>Term of Loan:</p>
                        <p class="font-weight-bold text-capitalize">{{ formData.term }}</p>
                    </div>
                    <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                        <p>Mode of Payment:</p>
                        <p class="font-weight-bold text-capitalize">
                            {{ formData.paymentFrequency }}
                        </p>
                    </div>
                    <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                        <p>Coborrower Name:</p>
                        <p class="font-weight-bold text-capitalize">
                            {{ formData.coborrowerName }}
                        </p>
                    </div>
                    <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                        <p>Status:</p>
                        <p class="font-weight-bold text-capitalize">
                            {{ formData.status }}
                        </p>
                    </div>
                </div>

                <div class="d-flex">
                    <!-- Edit Status -->
                    <v-dialog width="1200">
                        <template #activator="{ props }">
                            <v-btn
                                v-if="formData.status == 'approved'"
                                prepend-icon="mdi-check-underline-circle-outline"
                                class="edit-loan-btn capitalize mr-2 text-white"
                                v-bind="props"
                                text="Mark Loan as Released"
                                color="var(--vt-c-blue-very-dark)"
                            >
                            </v-btn>
                        </template>

                        <!-- Form popup -->
                        <template #default="{ isActive }">
                            <v-card close-on-back contained class="form-wrapper">
                                <v-container>
                                    <v-row justify="end">
                                        <v-card-actions>
                                            <v-btn
                                                class="ma-2 capitalize-text"
                                                color="var(--vt-c-blue)"
                                                @click="isActive.value = false"
                                                icon="mdi-close"
                                            >
                                            </v-btn>
                                        </v-card-actions>
                                    </v-row>
                                </v-container>
                                <LoanStatusEdit
                                    :loanID="loanID"
                                    :onsubmit="
                                        () => {
                                            formData.status = 'Approved (Released)'
                                            loanReleased = true
                                            isActive.value = false
                                        }
                                    "
                                />
                            </v-card>
                        </template>
                    </v-dialog>

                    <!-- Edit Loan -->
                    <v-dialog width="1200">
                        <template #activator="{ props }">
                            <v-btn
                                prepend-icon="mdi-square-edit-outline"
                                class="edit-loan-btn capitalize mr-2 text-white"
                                v-bind="props"
                                text="Edit Loan"
                                color="var(--vt-c-blue)"
                            >
                            </v-btn>
                        </template>

                        <!-- Form popup -->
                        <template #default="{ isActive }">
                            <v-card close-on-back contained class="form-wrapper">
                                <v-container>
                                    <v-row justify="end">
                                        <v-card-actions>
                                            <v-btn
                                                class="ma-2 capitalize-text"
                                                color="var(--vt-c-blue)"
                                                @click="isActive.value = false"
                                                icon="mdi-close"
                                            >
                                            </v-btn>
                                        </v-card-actions>
                                    </v-row>
                                </v-container>
                                <LoanEdit
                                    :loanID="loanID"
                                    :autofill="rawLoanData"
                                    :onsubmit="
                                        async () => {
                                            await getLoanInfo()
                                            rerenderTable()
                                            isActive.value = false
                                        }
                                    "
                                />
                            </v-card>
                        </template>
                    </v-dialog>

                    <!-- Delete Loan -->
                    <v-dialog width="600">
                        <template #activator="{ props }">
                            <v-btn
                                prepend-icon="mdi-trash-can-outline"
                                class="edit-loan-btn capitalize mr-2"
                                v-bind="props"
                                text="Delete Loan"
                                color="error"
                            >
                            </v-btn>
                        </template>

                        <!-- Form popup -->
                        <template #default="{ isActive }">
                            <v-card close-on-back contained class="form-wrapper">
                                <v-container>
                                    <v-row justify="end">
                                        <v-card-actions>
                                            <v-btn
                                                class="ma-2 capitalize-text"
                                                color="var(--vt-c-blue)"
                                                @click="isActive.value = false"
                                                icon="mdi-close"
                                            >
                                            </v-btn>
                                        </v-card-actions>
                                    </v-row>
                                </v-container>

                                <DeletePrompt
                                    profileType="Loan"
                                    :identifier="loanID"
                                    :onsubmit="
                                        async () => {
                                            isActive.value = false
                                            router.push({ name: 'Loan Dashboard' })
                                        }
                                    "
                                />
                            </v-card>
                        </template>
                    </v-dialog>
                </div>
            </div>
        </div>

        <v-divider :thickness="1" class="mt-3 mb-3 border-opacity-70" />

        <div id="loan-payments-wrapper" ref="loanPaymentsTable" class="w-100"></div>
        <VBtn
            @click="setPopupAdd"
            block=""
            size="large"
            density="compact"
            rounded="lg"
            prepend-icon="mdi-plus-circle"
            class="capitalize btn"
            :disabled="!loanReleased"
        >
            Add New Transaction
        </VBtn>

        <!-- ADD A "Mark Loan as Paid" button?? -->

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
                            async (newTx) => {
                                ledgerData.push(Object.values(newTx))
                                rerenderTable()
                                isActive.value = false
                            }
                        "
                        :originalLoanAmount="originalLoanAmount"
                        :balance="balance"
                    />
                    <!-- NOTE: we should not be doing the solution above na -->
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

                    <LoanLedgerEdit
                        :loanID="loanID"
                        :transactionID="currentlyEditedTransactionID"
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
    font-size: 1.3em;
}

.gap-1 {
    gap: 1rem;
}

th.gridjs-th {
}

th .gridjs-th {
    white-space: normal;
    min-width: 500px;
}
</style>
