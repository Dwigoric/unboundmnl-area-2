<script setup>
// Import vue components
import NavigationDrawer from '../components/NavigationDrawer.vue'
import ContentBlock from '../components/ContentBlock.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'
import CentralLoanBlock from '../components/CentralLoanBlock.vue'


</script>

<template>
    <div class="bg-off-white d-flex px-4 py-2">
        <NavigationDrawer />

        <div class="d-flex flex-column w-100 pl-8">
            <!-- Top Bar of Dashboard -->
            <DashboardTopBar :breadcrumbs="['Home', 'Shared Capital', 'Shared Capital Dashboard']" />
            <h2>Shared Capital Dashboard</h2>

            <!-- Main Dashboard Body -->
            <div class="dashboard-body d-flex flex-column h-100 py-4">

                <ContentBlock :width="100" :height="100" :maxWidth="1600" :unit="'%'" :maxUnit="'px'" :bg-color="'#FFF'">

                    <CentralLoanBlock />
                </ContentBlock>
            </div>
        </div>
    </div>
</template>

<style></style>
