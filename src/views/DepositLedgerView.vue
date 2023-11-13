<script setup>
// Import Packages
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// Import vue components
import NavigationDrawer from '../components/NavigationDrawer.vue'
import ContentBlock from '../components/ContentBlock.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'
import DepositLedger from '../components/DepositLedger.vue'

// Define props for the component
/*
defineProps({
    loanID: {
        type: [Number, String],
        default: null
    }
})
*/
// Receive props from the router
const route = useRoute()
const depositID = ref(route.params.id)
</script>

<template>
    <div class="bg-off-wwhite d-flex px-4 py-2">
        <NavigationDrawer />
        <div class="d-flex flex-column w-100 pl-8">
            <!-- Top Bar of Dashboard -->
            <DashboardTopBar :breadcrumbs="['Deposits', `Deposit Ledger`]" />

            <h2>Deposit Ledger</h2>

            <div class="dashboard-body d-flex flex-column h-100 py-4">
                <ContentBlock
                    :width="100"
                    :height="100"
                    :maxWidth="80"
                    :unit="'%'"
                    :maxUnit="'vw'"
                    :bg-color="'#FFF'"
                >
                    <DepositLedger :depositID="depositID" />
                </ContentBlock>
            </div>
        </div>
    </div>
</template>
