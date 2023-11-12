<script setup>
// Import vue components
import NavigationDrawer from '../components/NavigationDrawer.vue'
import ContentBlock from '../components/ContentBlock.vue'
import DepositAdd from '../components/DepositAdd.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'
import LoanApplicationSearch from '../components/LoanApplicationSearch.vue'
import StepCounterLoanTransaction from '../components/StepCounterLoanTransaction.vue'

</script>

<template>
    <div class="bg-off-white d-flex px-4 py-2">
        <NavigationDrawer />

        <div class="d-flex flex-column w-100 pl-8">
            <!-- Top Bar of Dashboard -->
            <DashboardTopBar :breadcrumbs="['Home', 'Shared Capital', 'Enter Deposit']" />

            <!-- Main Dashboard Body -->
            <div class="dashboard-body d-flex flex-column h-100 py-4">
                <h2>Enter Deposit</h2>

                <!-- Step 1 -->
                <ContentBlock :width="100" :height="100" :maxWidth="80" :unit="'%'" :maxUnit="'vw'" :bg-color="'#FFF'">
                    <StepCounterLoanTransaction />
                </ContentBlock>

                <ContentBlock :width="100" :height="100" :maxWidth="80" :unit="'%'" :maxUnit="'vw'" :bg-color="'#FFF'">
                    <LoanApplicationSearch />
                </ContentBlock>

                <!-- Step 2 -->
                <ContentBlock :width="100" :height="100" :maxWidth="80" :unit="'%'" :maxUnit="'vw'" :bg-color="'#FFF'">
                    <StepCounterLoanTransaction />
                </ContentBlock>

                <ContentBlock :width="100" :height="100" :maxWidth="80" :unit="'%'" :maxUnit="'vw'" :bg-color="'#FFF'">
                    <DepositAdd />
                </ContentBlock>
            </div>
        </div>
    </div>
</template>

<style></style>
