<script setup>
import NavigationDrawer from '../components/NavigationDrawer.vue'
import UserProfile from '../components/UserProfile.vue'
import NotificationBtn from '../components/NotificationBtn.vue';
import ContentBlock from '../components/ContentBlock.vue';
import OfficerRegister from '../components/OfficerRegister.vue'

</script>

<template>
    <div class="bg-off-white d-flex px-4 py-2">
        <NavigationDrawer />

        <div class="d-flex flex-column w-100 pl-8">

            <!-- Top Bar of Dashboard -->
            <div class="dashboard-top">
                <div class="breadcrumbs-wrapper">
                    <v-breadcrumbs :items="['Home', 'Officer Profiles']"></v-breadcrumbs>
                </div>

                <div class="dashboard-top-right">
                    <NotificationBtn />
                    <UserProfile />
                </div>
            </div>

            <!-- Main Dashboard Body -->
            <div class="dashboard-body d-flex flex-column h-100 py-3">
                <h2>Officer Profiles</h2>

                <div class="upper-wrapper">
                    <!-- Search bar -->
                    <div class="search-wrapper">
                        <v-text-field 
                            prepend-inner-icon="mdi-magnify" 
                            label="Search Officer" 
                            clearable
                            />
                    </div>

                    <div class="btn-wrapper">
                        <v-dialog width="900">
                            <template v-slot:activator="{ props }">

                                <!-- Create Officer Profile Button -->
                                <v-btn 
                                    class="btn capitalize-text"
                                    v-bind="props" 
                                    text="Create Officer Profile"> 
                                </v-btn>
                                
                            </template>

                            <!-- Form popup -->
                            <template v-slot:default="{ isActive }">
                                <v-card 
                                    close-on-back
                                    contained   
                                    class="form-wrapper"                                
                                >
                                    
                                    <v-container>
                                        <v-row justify="end">
                                            <v-card-actions>
                                                <v-btn
                                                    class="ma-2 capitalize-text"
                                                    color="var(--vt-c-blue)"
                                                    @click="isActive.value = false"
                                                    icon="mdi-close"
                                                >
                                                </v-btn>
                                            </v-card-actions>
                                        </v-row>
                                    </v-container>

                                    <OfficerRegister />

                                </v-card>
                            </template>

                        </v-dialog>
                    </div>
                </div>

                <ContentBlock :width="100" :height="102" :unit="'%'" :bg-color="'#FFF'">
                    <!-- List of members -->
                </ContentBlock>
            </div>
        </div>
    </div>
</template>



<style scoped>
.dashboard-top {
    width: 100%; 
    height: 58px;
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

.upper-wrapper {
    height: 10%;
    
    display: flex;
    align-items: center;
    justify-content: space-between;

    /* border: 1px solid black; */
}
.search-wrapper {
    display: flex;
    width: 85%;
}

.btn-wrapper {
    display: flex;
    margin-bottom: 22px;
    /* border: 1px solid black; */
}

.btn {
    font-weight: 600;
    color: var(--vt-c-white-off);
    background: var(--vt-c-blue);

    display: flex;
    align-items: center;
    text-align: center;

    padding-top: 15%;
    padding-bottom: 15%;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-transform: capitalize;
}


.btn:hover {
    background: var(--vt-c-blue-dark);
}
.form-wrapper {
    background-color: var(--vt-c-white-off);
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

</style>