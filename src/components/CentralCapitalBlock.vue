<script setup>
// Packages
import { ref, onMounted } from 'vue'
import { Grid, h } from 'gridjs'

// Project constants
import { API_URL } from '../constants'

// Stylesheets
import 'gridjs/dist/theme/mermaid.css'

// Import router
import router from '../router'

// Props
const props = defineProps({
    username: {
        type: String,
        required: false
    }
})

// Reactive variables
const deposit = ref()
const depositsTable = ref()
const rawDepositData = ref()

// Methods

/**
 * Visits individual deposit ledger based on its ID
 * @param {*} depositID - ID of individual deposit
 */
const visitDepositLedger = async (depositID) => {
    router.push({ name: 'Deposit Ledger', params: { id: depositID } })
}

onMounted(async () => {
    const url = props.username ? `/${props.username}` : ''

    const res = await fetch(`${API_URL}/deposits${url}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        }
    })

    if (res.status === 200) {
        const resJson = await res.json()
        rawDepositData.value = resJson.deposits

        const depositData = rawDepositData.value.map((row) => {
            return [row.depositID, row.username, row.category, row.originalDepositAmount]
        })

        deposit.value = new Grid({
            columns: [
                { name: 'DepositID', hidden: true },
                'Deposit Holder',
                'Deposit Category',
                'Original Deposit Amount',
                {
                    name: 'View Deposit Ledger',
                    formatter: (cell, row) => {
                        return h(
                            'v-hover',
                            {
                                className:
                                    'cursor-pointer hover-scale-md py-2 mb-4 px-4 border rounded-md',
                                onClick: () => visitDepositLedger(row.cells[0].data) // grabs the row's Loan ID and passes it to the function.
                            },
                            'View Deposit Ledger'
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
            data: depositData,
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
        deposit.value.render(depositsTable.value)
    }
})

const items = rawDepositData
</script>

<template>
    <div id="loan-status-wrapper" ref="depositsTable" class="w-90 px-4" />
    <v-card>
        <v-card-title class="d-flex align-center w-25">
            <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                density="compact"
                label="Search"
                single-line
                flat
                hide-details
                variant="solo-filled"
            ></v-text-field>
        </v-card-title>

        <v-data-table :items="items" hover multi-sort :search="search" sticky> </v-data-table>
    </v-card>
</template>

<style>
.cursor-pointer {
    cursor: pointer;
}
</style>
