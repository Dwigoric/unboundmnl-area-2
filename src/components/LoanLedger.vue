<script setup>
// Import packages
import { ref, onMounted } from 'vue'
import { Grid } from 'gridjs';
import "gridjs/dist/theme/mermaid.css";

// Define props for the component
defineProps({
    loanID: {
        type: [Number, String],
        default: null
    }
})

// Fetch loan properties from the database by using the loanID property!

const loanAmount = 3000.15;
// Format the loan amount to PHP standard
const formattedLoanAmount = ref(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(loanAmount));
const loanee = 'Juan Dela Cruz'
const loanType = 'Education';
const loanTerm = 2;

const loanTransactionColumns = [
    {name: 'Date of Payment'},
    {name: 'GV/OR Number'},
    {name: 'Amount Paid'},
    {name: 'Balance'},
    {name: 'Interest Paid'},
    {name: 'Fines Paid'},
    {name: 'Term of Loan'},
    {name: 'Date of Entry'},
    {name: 'Officer in Charge'}
]

loanTransactionColumns.forEach(obj => {obj['width'] = '18%'});

// Create a ref to hold new loanPaymentsTable template
const loanPaymentsTable = ref();

// Create a ref to hold new grid instance
const loanPayments = ref();

// Ideally, we do a fetch request to the database to grab the data.
onMounted(() => {
    // IN THE FUTURE: DATA WILL DYNAMICALLY BE PASSED INTO THIS COMPONENT SOMEHOW
    const data = Array.from({ length: 20 }, () => Array(9).fill(null).map(() => `Element`));
    
    // Grid for all the loan's payments
    loanPayments.value = new Grid({
        columns: loanTransactionColumns,
        data: data,
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
            table: {
                //'width': '100%',
                'border-collapse': 'separate',
            },
            th: {
                'min-width': '250px'
            },
            tr: {
                'margin-bottom': '1rem'
            }
        }
    });
    
    // Render loanPayments in corresponding reference
    loanPayments.value.render(loanPaymentsTable.value);
})
</script>

<template>
    <!-- TODO: REMOVE INLINE STYLING -enrique -->
    <div class="w-100">
        <div id="loan-info-wrapper" class="d-flex justify-space-between align-center">
            <div id="loan-amount-cell" class="h-75 w-30 pa-2">
                <p class="font-weight-bold">Loan Amount: </p>
                <p class="loan-amount">{{ formattedLoanAmount }}</p>
            </div>
            <div class="d-flex justify-space-evenly align-center gap-1 h-75 pa-2">
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-2">
                    <p class="font-weight-bold">Loanee: </p>
                    <p class="loan-properties"> {{ loanee }} </p>
                </div>
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                    <p class="font-weight-bold">Loan ID: </p>
                    <p class="loan-properties"> {{ loanID }} </p>
                </div>
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                    <p class="font-weight-bold">Type of Loan: </p>
                    <p class="loan-properties"> {{ loanType }} </p>
                </div>
                <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
                    <p class="font-weight-bold">Term of Loan: </p>
                    <p class="loan-properties"> {{ loanTerm }} </p>
                </div>
            </div>
        </div>
        <div id="loan-payments-wrapper" ref="loanPaymentsTable" class="w-100"></div>
    </div>
</template>

<style>
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
        gap: 0.75rem;
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