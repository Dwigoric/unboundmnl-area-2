<script setup>
import UserProfile from '../components/UserProfile.vue'
import NotificationBtn from '../components/NotificationBtn.vue'

// Dynamically define the breadcrumbs for the DashboardTopBar
defineProps({
    breadcrumbs: {
        type: Array,
        default: ['Home']
    }
})

</script>

<template>
    <div class="dashboard-top">
        <div class="breadcrumbs-wrapper">
            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        </div>

        <div class="dashboard-top-right">
            <NotificationBtn />
            <UserProfile />
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