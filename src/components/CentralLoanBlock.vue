<script setup>
import { ref, onMounted } from 'vue'
import { Grid, h } from 'gridjs';
import "gridjs/dist/theme/mermaid.css";


// TODO: Create proper vars
// defineProps({
//     givenName: String,
//     lastName: String,
//     username: String
// });

const data = [
    [
        'John Doe', 'Personal Loan', '$10,000'
    ],
    [
        'John Doe', 'Personal Loan', '$10,000'

    ],
    [
        'John Doe', 'Personal Loan', '$10,000'
    ],
    [
        'John Doe', 'Personal Loan', '$10,000'
    ],
    [
        'John Doe', 'Personal Loan', '$10,000'
    ],
    [
        'John Doe', 'Personal Loan', '$10,000'
    ],
    [
        'John Doe', 'Personal Loan', '$10,000'
    ],
    [
        'John Doe', 'Personal Loan', '$10,000'
    ],
    [
        'John Doe', 'Personal Loan', '$10,000'
    ],
    [
        'John Doe', 'Personal Loan', '$10,000'
    ],  
    [
        'John Doe', 'Wow Loan', '$10,000'
    ],
    [
        'John Doe', 'Personal Loan', '$10,000'
    ],
    [
        'Jana', 'Personal Loan', '$10,000'
    ],
    [
        'Mama mo', 'Panootie', '$10,000'
    ],
    [
        'Jana', 'Personal Loan', '$10,000'
    ],
]


const loan = ref();

const loansTable = ref();

onMounted(() => {

    loan.value = new Grid({
        columns: [
            'Loanee',
            'Type of Loan',
            'Amount of Loan',
        ],
        pagination: {
            limit: 10
        },
        search: true,
        sort: true,
        resizable: true,
        fixedHeader: true,
        data: data,
        className: {
            // Define your class names here
        },
        style: {
            table: {
                // Define your table styles here
            },
            tr: {
                // Define row styles here
            },
        },
    });


    // Render loanStatus in corresponding reference
    loan.value.render(loansTable.value);
})
</script>

<template>
    <div id="loan-status-wrapper" ref="loansTable" class="w-100 px-4 " />


</template>