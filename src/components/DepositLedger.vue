<script setup>
// Import packages
import { ref, onMounted, computed } from 'vue'
import { Grid, h } from 'gridjs'
import 'gridjs/dist/theme/mermaid.css'

// Import constants
import { API_URL } from '../constants/api_url.js'

// Import components
import DepositLedgerEdit from '../components/DepositLedgerEdit.vue'
import DepositLedgerAdd from '../components/DepositLedgerAdd.vue'

// Define props for the component
const props = defineProps({
    depositID: {
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

const setPopupEdit = (data) => {
    currentlyEditedTransactionID.value = data
    isPopupActive.value = true
}

const depositAmount = ref(0)
const depositOwner = ref('')
const depositType = ref('')
const depositApprovalDate = ref('')
const depositInterestRate = ref(0)

const currentlyEditedTransactionID = ref('')

// Format the deposit amount to PHP standard
const formattedDepositAmount = computed(() => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(
        depositAmount.value
    )
})

// Format the approval date of the laon
const formattedApprovalDate = computed(() => {
    return depositApprovalDate.value.substring(0, 10)
})

const capitalLedgerColumns = [
    { name: 'Transaction ID', hidden: true },
    { name: 'Date of Payment' },
    { name: 'GV/OR Number' },
    { name: 'Transaction Type' },
    { name: 'Amount' },
    { name: 'Interest' },
    { name: 'Balance' },
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
const capitalLedgerTable = ref()

// Create a ref to hold new grid instance
const capital = ref()

const getDepositInfo = async () => {
    // Fetch loan properties from the database by using the loanID property!
    const jsonRes = await fetch(`${API_URL}/deposits/get/${props.depositID}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        }
    }).then((res) => res.json())

    if (jsonRes) {
        const depositData = jsonRes.deposit
        // TEMP: Change this once calculations are implemented
        depositAmount.value = depositData.originalDepositAmount
        depositOwner.value = depositData.username
        depositType.value = depositData.category
        depositApprovalDate.value = depositData.approvalDate
        depositInterestRate.value = depositData.interestRate
    }

    const ledgerRes = await fetch(`${API_URL}/deposits/${props.depositID}/ledger`, {
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
            transaction.depositType,
            transaction.amount,
            transaction.interest,
            transaction.balance,
            transaction.submissionDate.substring(0, 10),
            transaction.officerInCharge.given === 'Admin' &&
            transaction.officerInCharge.last === ' '
                ? 'Admin'
                : `${transaction.officerInCharge.last}, ${transaction.officerInCharge.given}`
        ]
    })
}

// rerender the table
const rerenderTable = function () {
    // can't do anything about the errors that show up when running this, it's a bug in gridjs
    // https://github.com/grid-js/gridjs/issues/1291
    capital.value
        .updateConfig({
            search: true,
            pagination: true,
            data: ledgerData.value
        })
        .forceRender()
}

// Ideally, we do a fetch request to the database to grab the data.
onMounted(async () => {
    await getDepositInfo()

    // Grid for all the loan's payments
    capital.value = new Grid({
        columns: capitalLedgerColumns,
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

    // Render capital in corresponding reference
    capital.value.render(capitalLedgerTable.value)
})
</script>

<template>
    <div class="w-100">
        <div id="loan-info-wrapper" class="d-flex justify-space-between align-center">
            <div id="loan-amount-cell" class="h-75 w-30 pa-2">
                <p class="font-weight-bold">Running Amount:</p>
                <p class="amount">{{ formattedDepositAmount }}</p>
            </div>
            <div class="d-flex justify-space-evenly align-center h-75 pa-2">
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-2">
                    <p class="font-weight-bold">Deposit ID:</p>
                    <p class="loan-properties">{{ depositID }}</p>
                </div>
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-2">
                    <p class="font-weight-bold">Type of Deposit:</p>
                    <p class="loan-properties">{{ depositType }}</p>
                </div>
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                    <p class="font-weight-bold">Date:</p>
                    <p class="loan-properties">{{ formattedApprovalDate }}</p>
                </div>
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                    <p class="font-weight-bold">Interest Rate:</p>
                    <p class="loan-properties">{{ depositInterestRate }}%</p>
                </div>
            </div>
        </div>

        <v-divider :thickness="1" class="mt-3 mb-3 border-opacity-70" />

        <div id="capital-ledger-wrapper" ref="capitalLedgerTable" class="w-100"></div>

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

                    <DepositLedgerAdd
                        :depositID="depositID"
                        :onsubmit="
                            async () => {
                                await getDepositInfo()
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

                    <DepositLedgerEdit
                        :depositID="depositID"
                        :transactionID="currentlyEditedTransactionID"
                        :onsubmit="
                            async () => {
                                await getDepositInfo()
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

.amount {
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
