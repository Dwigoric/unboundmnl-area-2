<script setup>
import { ref, onMounted } from 'vue'
import { Grid, h } from 'gridjs'
import { API_URL } from '../constants/api_url.js'
import 'gridjs/dist/theme/mermaid.css'
import DepositLedger from '../components/DepositLedger.vue'


// Import router
import router from '../router'

// TODO: Create proper vars
// defineProps({
//     givenName: String,
//     lastName: String,
//     username: String
// });

const deposit = ref()

const depositsTable = ref()

// Methods

/**
 * Visits individual deposit ledger based on its ID
 * @param {*} depositID - ID of individual deposit
 */
const visitDepositLedger = async (depositID) => {
    router.push({ name: 'Deposit Ledger', params: { id: depositID } })
}

onMounted(async () => {
    const res = await fetch(`${API_URL}/deposits`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        }
    })

    if (res.status === 200) {
        const resJson = await res.json()
        const rawDepositData = resJson.deposits
        console.log(resJson)

        const depositData = rawDepositData.map((row) => {
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
</script>

<template>
    
    <div id="loan-status-wrapper" ref="depositsTable" class="w-90 px-4" />
</template>

<style>
.cursor-pointer {
    cursor: pointer;
}
</style>
