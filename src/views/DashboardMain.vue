<script setup>
// Import vue components
import NavigationDrawer from '../components/NavigationDrawer.vue'
import UserProfile from '../components/UserProfile.vue'
import NotificationBtn from '../components/NotificationBtn.vue';
import ContentBlock from '../components/ContentBlock.vue';
</script>

<template>
    <div class="bg-off-white d-flex px-4 py-2">
        <NavigationDrawer />
        
        <div class="d-flex flex-column w-100 pl-5">

            <!-- Top Bar of Dashboard -->
            <div class="dashboard-top d-flex justify-end align-center">
                <NotificationBtn />
                <UserProfile />
            </div>

            <!-- Main Dashboard Body -->
            <div class="dashboard-body d-flex flex-column h-100 py-3">
                <ContentBlock :width="100" :height="50" :unit="'%'" :bg-color="'#FFF'"/>
                <div class="d-flex h-50 gap-1_25">
                    <ContentBlock :width="50" :height="102" :unit="'%'" :bg-color="'#FFF'"/>
                    <ContentBlock :width="50" :height="102" :unit="'%'" :bg-color="'#09a6f3'"/>
                </div>
            </div>
        </div>        
    </div>
</template>

<style>

    .dashboard-top {
        gap: 1.5rem;
        width: 100%; 
        height: 75px;
    }

    .dashboard-body {
        gap: 1.25rem;
    }

    .gap-1_25 {
        gap: 1.25rem;
    }

    .bg-off-white {
        background-color: var(--vt-c-white-off);
    }

    /** hover-scale-sm gives the subtle hover effect to all the floating components **/
    .hover-scale-sm, .hover-scale-md {
        transition: all 0.3s ease; /* 0.3s duration with ease-in-out timing function for smooth effect */
    }

    .hover-scale-sm:hover {
        transform: scale(1.01);
    }

    .hover-scale-md:hover {
        transform: scale(1.05);
    }

</style>