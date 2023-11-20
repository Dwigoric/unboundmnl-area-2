<script setup>
// Import vue components
import NavigationDrawer from '../components/NavigationDrawer.vue'
import ContentBlock from '../components/ContentBlock.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'
import LoanStatusItem from '../components/LoanStatusItem.vue'
</script>

<template>
    <div class="bg-off-white d-flex px-4 py-2">
        <NavigationDrawer />

        <div class="d-flex flex-column w-100 pl-8">
            <!-- Top Bar of Dashboard -->
            <DashboardTopBar :breadcrumbs="['Loans', 'Loan Status']" />

            <!-- Main Dashboard Body -->
            <div class="dashboard-body d-flex flex-column h-100 py-4">
                <h2>All Pending Loans</h2>

                <ContentBlock
                    :width="100"
                    :height="100"
                    :maxWidth="80"
                    :unit="'%'"
                    :maxUnit="'vw'"
                    :bg-color="'#FFF'"
                >
                    <LoanStatusItem />
                </ContentBlock>
            </div>
        </div>
    </div>
</template>

<style></style>
