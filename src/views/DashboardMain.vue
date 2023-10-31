<script setup>
// Import vue components
import NavigationDrawer from '../components/NavigationDrawer.vue'
import UserProfile from '../components/UserProfile.vue'
import NotificationBtn from '../components/NotificationBtn.vue'
import ContentBlock from '../components/ContentBlock.vue'
</script>

<template>
    <div class="bg-off-white d-flex px-4 py-2">
        <NavigationDrawer />

        <div class="d-flex flex-column w-100 pl-8">
            <!-- Top Bar of Dashboard -->
            <div class="dashboard-top">
                <div class="breadcrumbs-wrapper">
                    <v-breadcrumbs :items="['Home', 'Dashboard']"></v-breadcrumbs>
                </div>

                <div class="dashboard-top-right">
                    <NotificationBtn />
                    <UserProfile />
                </div>
            </div>

            <!-- Main Dashboard Body -->
            <div class="dashboard-body d-flex flex-column h-100 py-4">
                <ContentBlock
                    :width="100"
                    :height="100"
                    :unit="'%'"
                    :bg-color="'#FFF'"
                >
            
                </ContentBlock>
                
            </div>
        </div>
    </div>
</template>

<style>
.dashboard-top {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.dashboard-top-right {
    display: flex;
    gap: 1.5rem;
}

.breadcrumbs-wrapper {
    margin-left: -15px;
    font-weight: 600;
}

.dashboard-body {
    gap: 1.25rem;
}
</style>
