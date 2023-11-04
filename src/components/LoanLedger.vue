<script setup>
// Import packages
import { ref, onMounted } from 'vue'
import { Grid } from 'gridjs';
import "gridjs/dist/theme/mermaid.css";


// Fetch loan properties from the database
const loanAmount = 3000.15;
// Format the loan amount to PHP standard
const formattedLoanAmount = ref(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(loanAmount));
const loanee = 'Juan Dela Cruz'
const loanID = 123456789;
const loanType = 'Education';
const loanTerm = 2;

// Create a ref to hold new loanPaymentsTable template
const loanPaymentsTable = ref();

// Create a ref to hold new grid instance
const loanPayments = ref();

// Ideally, we do a fetch request to the database to grab the data.
onMounted(() => {
    // IN THE FUTURE: DATA WILL DYNAMICALLY BE PASSED INTO THIS COMPONENT SOMEHOW
    const data = Array.from({ length: 20 }, () => Array(9).fill(null).map((_) => `Element`));
    
    // Grid for all the loan's payments
    loanPayments.value = new Grid({
        columns: [
            'Date of Payment', 
            'GV/OR Number', 
            'Amount Paid',
            'Balance',
            'Interest Paid',
            'Fines Paid',
            'Term of Loan',
            'Date of Entry',
            'Officer in Charge',
        ],
        data: data,
        fixedHeader: true,
        pagination: true,
        className: {
            // th: 'rounded-t-lg text-left text-grey-darken-3 bg-blue-grey-lighten-4 pa-2',
            // td: 'pa-2 grid-right-border',
            // tr: 'my-16 py-3'
        },
        style: {
            table: {
                'width': '100%',
                // 'border-collapse': 'separate',
                // 'border-spacing': '0.2rem 1.25rem'
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
    <div id="loan-info-wrapper" class="d-flex justify-space-between align-center w-100 px-4">
        
        <div id="loan-amount-cell" class="h-75 w-30 pa-2" style="max-width: 350px;">
            <p class="font-weight-bold">Loan Amount: </p>
            <p class="loan-amount">{{ formattedLoanAmount }}</p>
        </div>
        <div class="d-flex justify-space-evenly align-center h-75 pa-2">
            <div class="d-flex flex-column loan-info-cell grid-left-border h-100 px-4">
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
    <div id="loan-payments-wrapper" ref="loanPaymentsTable" style="overflow-x: scroll;" class="w-100 px-4"></div>
</template>

<style>

    #loan-info-wrapper {
        height: 150px;
    }

    .grid-right-border {
        border-right: solid 1px rgba(183, 183, 183, 0.482);
    }

    .grid-left-border {
        border-left: solid 2px rgba(183, 183, 183, 0.482);
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

</style>