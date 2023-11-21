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
import LoanEdit from '../components/LoanDepositEdit.vue'
import DeletePrompt from '../components/DeletePrompt.vue'


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
    isAddPopupActive.value = true
}

const setPopupEdit = (data) => {
    currentlyEditedTransactionID.value = data
    isPopupActive.value = true
}

const currentlyEditedTransactionID = ref('')
const loanAmount = ref(0)
const loanee = ref('')
const loanType = ref('')
const loanTerm = ref(0)
const loanPaymentFrequency = ref('')
const totalAmountPaid = ref(0);

// Format the loan amount to PHP standard
const formattedLoanAmount = computed(() => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(
        loanAmount.value
    )
})

// TODO: loan mode of payment

const loanTransactionColumns = [
    { name: 'Transaction ID', hidden: true },
    { name: 'Date of Payment' },
    { name: 'GV/OR Number' },
    //{ name: 'Total Amount Due' },
    //{ name: 'Total Amount Paid' },
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

    ledgerData.value = ledgerJson.ledger.map((transaction) => {
        return [
            transaction.transactionID,
            transaction.transactionDate.substring(0, 10),
            transaction.ORNumber,
            transaction.amountPaid,
            transaction.balance,
            transaction.interestPaid,
            transaction.finesPaid,
            transaction.submissionDate.substring(0, 10),
            `${transaction.officerInCharge.last}, ${transaction.officerInCharge.given}`,
            // grab the field for fines due
        ]
    })
}


// Combines all the amounts paid for all the loan transactions
function getTotalAmountPaid(ledgerTransactions) {
    var totalAmountPaid = 0;
    // For every transaction in the ledger, add its amount paid to a total sum

    ledgerTransactions.forEach( transaction => {
        let amountPaid = transaction[3]; // index for amount paid
        totalAmountPaid += amountPaid;
    });

    return totalAmountPaid;
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
    
    // Call getTotalAmountPaid
    totalAmountPaid.value = getTotalAmountPaid(ledgerData.value);
    console.log(`HERE: ${totalAmountPaid.value}`);

})
</script>

<template>
    <div class="w-100">
        <div id="loan-info-wrapper" class="d-flex justify-space-between">
            <!-- Left -->
            <div id="loan-amount-cell" class="h-75 w-30 pa-2">
                <p>Original Loan Amount:</p>
                <p class="loan-amount mt-n3">{{ formattedLoanAmount }}</p>
                <div class="d-flex flex-row">
                    <p>Loanee:</p>
                    <p class="font-weight-bold ml-3">{{ loanee }}</p>
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
                        <!-- TODO: Fill in the proper field -->
                        <p>Loan Approval Date:</p>
                        <p class="loan-properties font-weight-bold mt-n2">{{ loanType }}</p>
                    </div>
                    <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                        <p>Type of Loan:</p>
                        <p class="loan-properties font-weight-bold mt-n2">{{ loanType }}</p>
                    </div>
                    <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                        <p>Term of Loan:</p>
                        <p class="loan-properties font-weight-bold mt-n2">{{ loanTerm }}</p>
                    </div>
                    <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                        <!-- TODO: Fill in the proper field -->
                        <p>Mode of Payment:</p>
                        <p class="loan-properties font-weight-bold mt-n2">{{ loanTerm }}</p>
                    </div>
                    <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                        <!-- TODO: Fill in the proper field -->
                        <p>Coborrower Name:</p>
                        <p class="loan-properties font-weight-bold mt-n2">{{ loanTerm }}</p>
                    </div>
                </div>
                
                <div class="d-flex">
                    <!-- <p>Action buttons:</p> -->

                    <!-- Edit Loan -->
                    <v-dialog width="1200">
                        <template v-slot:activator="{ props }">
                            
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
                        <template v-slot:default="{ isActive }">
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
                                <LoanEdit />

                            </v-card>
                        </template>
                    </v-dialog>

                    <!-- Delete Loan -->
                    <v-dialog width="600">
                        <template v-slot:activator="{ props }">
                            
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
                        <template v-slot:default="{ isActive }">
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
                                        profileType="Member"
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
            block
            size="large"
            density="compact"
            rounded="lg"
            prepend-icon="mdi-plus-circle"
            class="capitalize btn"
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
                            async () => {
                                await getLoanInfo()
                                rerenderTable()
                                isActive.value = false
                            }
                        "
                        :currentBalance="loanAmount - totalAmountPaid"
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
    font-size: 1.30em;
}

.gap-1 {
    gap: 1rem;
}

.gridjs-table{
    min-width: 100%;
}

.gridjs-th {
    white-space: normal;
}
</style>
