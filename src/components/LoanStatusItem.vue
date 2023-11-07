<script setup>
import { ref, onMounted } from 'vue'
import { Grid, h } from 'gridjs'
import 'gridjs/dist/theme/mermaid.css'

// TODO: Create proper vars
// defineProps({
//     givenName: String,
//     lastName: String,
//     username: String
// });

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    setPopupLoan: {
        type: Function,
        required: true
    }
})

const loanStatusTable = ref()

const loanStatus = ref()

onMounted(() => {
    loanStatus.value = new Grid({
        columns: [
            { name: 'Loan ID', hidden: true },
            'Type of Loan',
            'Amount of Loan',
            'Loanee',
            {
                name: 'Change Status',
                // HELPME: Make it a way so that when you press the 'Change Status' btn, LoanStatusItemPopup pops up
                formatter: (cell, row) => {
                    return h(
                        'v-hover',
                        {
                            className: 'py-2 mb-4 px-4 border rounded-md',
                            onClick: () => props.setPopupLoan(row.cells[0].data)
                        },
                        'Change Status'
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
        data: props.data,
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
    loanStatus.value.render(loanStatusTable.value)
})
</script>

<template>
    <div id="loan-status-wrapper" ref="loanStatusTable" class="w-100 px-4"></div>
    <!-- <LoanStatusItemPopup /> -->
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
