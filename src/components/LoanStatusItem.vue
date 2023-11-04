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

const loanStatusTable = ref();

const loanStatus = ref();

onMounted(() => {

    loanStatus.value = new Grid({
        columns: [
            'Type of Loan',
            'Amount of Loan',
            'Loanee',
            {
                name: 'Change Status',
                formatter: (cell, row) => {
                    return h('v-btn', {
                        className: 'py-2 mb-4 px-4 border rounded-md',
                        onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
                    }, 'Edit');

                }
            },

            // <div class="officer-actions-box ml-auto d-flex">
            //     <!-- Reject Loan -->
            //     <v-btn
            //         icon="mdi-check-bold"
            //         variant="plain"
            //         color="green">
            //     </v-btn>

            //     <!-- Approve Loan -->
            //     <v-btn
            //         icon="mdi-close-thick"
            //         variant="plain"
            //         color="red">
            //     </v-btn>

            // </div>
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
    loanStatus.value.render(loanStatusTable.value);
})
</script>

<template>
    <div id="loan-status-wrapper" ref="loanStatusTable" class="w-100 px-4 "></div>
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