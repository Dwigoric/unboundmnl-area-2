
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
                    <h2>Create a New Loan Application</h2>

                    <ContentBlock :width="100" :height="102" :unit="'%'" :bg-color="'#FFF'">
                        <LoanApplicationForm />
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
import LoanApplicationForm from '../components/LoanApplicationForm.vue'
</script>
