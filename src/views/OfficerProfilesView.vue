<template>
    <OfficerRegister v-if="popupTriggers.createOfficerProfile" :togglePopup="togglePopup">
    </OfficerRegister>
    
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
                <h2>Officers Profiles</h2>

                <!-- Search bar -->
                <div class="search-wrapper">
                    <v-text-field prepend-icon="mdi-magnify" label="Search Officer"></v-text-field>
                    <div class="btnWrapper">
                        <!-- TODO: Integrate Officer Registration Popup (OfficerRegister.vue) -->
                        <VBtn class="btn capitalize-text" @click="() => togglePopup('createOfficerProfile')" :togglePopup="togglePopup"> Create Officer Profile </VBtn>
                    </div>
                </div>

                <ContentBlock :width="100" :height="102" :unit="'%'" :bg-color="'#FFF'">
                    <!-- List of members -->
                </ContentBlock>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavigationDrawer from '../components/NavigationDrawer.vue'
import UserProfile from '../components/UserProfile.vue'
import NotificationBtn from '../components/NotificationBtn.vue';
import ContentBlock from '../components/ContentBlock.vue';
import OfficerRegister from '../components/OfficerRegister.vue'
import { ref } from 'vue'

// Handles pop up action
const popupTriggers = ref({
    createOfficerProfile: false
});

function togglePopup(trigger) {
    popupTriggers.value[trigger] = !popupTriggers.value[trigger];
}


</script>

<style>
.search-wrapper {
    display: flex;
}

.btn {
    font-weight: 600;
    color: var(--vt-c-white-off);
    background: var(--vt-c-blue);

    display: flex;
    align-items: center;
    text-align: center;

    padding-top: 14%;
    padding-bottom: 14%;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btnWrapper {
    height: 73%;
    /* border: 1px solid black; */
    color: var(--vt-c-white-off);
    margin-left: 2%;
}

.capitalize-text {
    text-transform: capitalize;
}

.btn:hover {
    background: var(--vt-c-blue-dark);
}

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
.hover-scale-sm,
.hover-scale-md {
    transition: all 0.3s ease;
    /* 0.3s duration with ease-in-out timing function for smooth effect */
}

.hover-scale-sm:hover {
    transform: scale(1.01);
}

.hover-scale-md:hover {
    transform: scale(1.05);
}
</style>