<script setup>
import { ref, onMounted } from 'vue'
import { Grid } from 'gridjs';
import "gridjs/dist/theme/mermaid.css";

const loanStatusTableUser = ref();

const loanStatusUser = ref();

onMounted(() => {

    loanStatusUser.value = new Grid({
        columns: [
            'Type of Loan',
            'Amount of Loan',
            'Loanee',
        ],
        data: [
            {
                'Type of Loan': 'Personal Loan',
                'Amount of Loan': '$10,000',
                'Loanee': 'John Doe',
            },
        ],
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
    loanStatusUser.value.render(loanStatusTableUser.value);
})
</script>


<template>
    <h2> Change the status of the loan below</h2>
    <div id="loan-status-wrapper" ref="loanStatusTableUser" class="w-100 px-4 "></div>
    <div class="officer-actions-box ml-auto d-flex">
         <!-- Reject Loan -->
        <v-btn
            class="capitalize"
            prepend-icon="mdi-check-bold"
            variant="plain"
            color="green">
            Accept Loan
        </v-btn>

         <!-- Approve Loan -->
        <v-btn
            class="capitalize"
            prepend-icon="mdi-close-thick"
            variant="plain"
            color="red">
            Reject Loan
        </v-btn>

     </div>
</template>