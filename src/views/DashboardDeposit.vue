<script setup>
// Import vue components
import NavigationDrawer from '../components/NavigationDrawer.vue'
import ContentBlock from '../components/ContentBlock.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'
import CentralCapitalBlock from '../components/deposits/CentralCapitalBlock.vue'
</script>

<template>
    <div class="bg-off-white d-flex px-4 py-2">
        <NavigationDrawer />

        <div class="d-flex flex-column w-100 pl-8">
            <!-- Top Bar of Dashboard -->
            <DashboardTopBar :breadcrumbs="['Deposits', 'Deposit Dashboard']" />
            <h2>Shared Capital Dashboard</h2>

            <!-- Main Dashboard Body -->
            <div class="dashboard-body d-flex flex-column h-100 py-4">
                <ContentBlock
                    :width="100"
                    :height="100"
                    :maxWidth="1600"
                    :unit="'%'"
                    :maxUnit="'vw'"
                    :bg-color="'#FFF'"
                >
                    <CentralCapitalBlock />
                </ContentBlock>
            </div>
        </div>
    </div>
</template>

<style></style>
