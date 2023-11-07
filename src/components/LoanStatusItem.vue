<script setup>
// Packages
import { ref, onMounted } from 'vue'
import { Grid, h } from 'gridjs'
import 'gridjs/dist/theme/mermaid.css'
import LoanStatusItemPopup from './LoanStatusItemPopup.vue'

// TODO: Create proper vars
// defineProps({
//     givenName: String,
//     lastName: String,
//     username: String
// });

// Constant variables
const data = [
    ['id1', 'John Doe', 'Personal Loan', '$10,000'],
    ['id2', 'John Doe', 'Personal Loan', '$10,000'],
    ['id3', 'John Doe', 'Personal Loan', '$10,000'],
    ['id4', 'John Doe', 'Personal Loan', '$10,000'],
    ['id5', 'John Doe', 'Personal Loan', '$10,000'],
    ['id6', 'John Doe', 'Personal Loan', '$10,000'],
    ['id7', 'John Doe', 'Personal Loan', '$10,000'],
    ['id8', 'John Doe', 'Personal Loan', '$10,000'],
    ['id9', 'John Doe', 'Personal Loan', '$10,000'],
    ['id10', 'John Doe', 'Personal Loan', '$10,000'],
    ['id11', 'John Doe', 'Wow Loan', '$10,000'],
    ['id12', 'John Doe', 'Personal Loan', '$10,000'],
    ['id13', 'Jana', 'Personal Loan', '$10,000'],
    ['id14', 'Mama mo', 'Panootie', '$10,000'],
    ['id15', 'Jana', 'Personal Loan', '$10,000']
]

// Reactive variables
const loanStatusTable = ref()
const loanStatus = ref()
const isPopupActive = ref(false)

// Methods
const setPopupLoan = (loanId) => {
    isPopupActive.value = true

    const loan = data.find((loan) => loan[0] === loanId)

    // TODO: Use the loan data to populate the popup
}

// Lifecycle hooks
onMounted(() => {
    loanStatus.value = new Grid({
        columns: [
            { name: 'Loan ID', hidden: true },
            'Loanee',
            'Type of Loan',
            'Amount of Loan',
            {
                name: 'Change Status',
                formatter: (cell, row) => {
                    return h(
                        'v-hover',
                        {
                            className: 'py-2 mb-4 px-4 border rounded-md',
                            onClick: () => setPopupLoan(row.cells[0].data)
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
        data,
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
    <VDialog width="1200" v-model="isPopupActive">
        <!-- Form popup -->
        <template #default="{ isActive }">
            <VCard close-on-back contained class="form-wrapper">
                <VContainer>
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

                <LoanStatusItemPopup />
            </VCard>
        </template>
    </VDialog>
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
