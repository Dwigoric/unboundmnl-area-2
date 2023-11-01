<script setup>
// Import vue components
import NavigationDrawer from '../components/NavigationDrawer.vue'
import ContentBlock from '../components/ContentBlock.vue'
import LoanLedger from '../components/LoanLedger.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'

import LoanStatusItem from '../components/LoanStatusItem.vue'
import { Grid } from 'gridjs'
import "gridjs/dist/theme/mermaid.css";


document.addEventListener("DOMContentLoaded", function () {
    new Grid({
        columns: ["Type of Loan", "Amount of Loan", "Loanee", "Processor", "Status"],
        data: [
            ["John", "john@example.com", "(353) 01 222 3333"],
            ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
            ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
            ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
            ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
        ]
    }).render(document.getElementById("wrapper"));
});


</script>

<template>
    <div class="bg-off-white d-flex px-4 py-2">
        <NavigationDrawer />

        <div class="d-flex flex-column w-100 pl-8">
            <!-- Top Bar of Dashboard -->
            <DashboardTopBar :breadcrumbs="['Home', 'Dashboard']"/>

            <!-- Main Dashboard Body -->
            <div class="dashboard-body d-flex flex-column h-100 py-4">
                
                <ContentBlock
                :width="100"
                :height="100"
                :maxWidth="1600"
                :unit="'%'"
                :maxUnit="'px'"
                :bg-color="'#FFF'"
                >
                    <LoanStatusItem :givenName='Mama' :lastName='Mo' :username='Panot' />
                    <div id="wrapper"></div>
                    <!-- Temporarily placing this here, simply remove this if testing needs to be done on Dashboard. -->
                    <!--<LoanLedger/>-->
                </ContentBlock>
            </div>
        </div>
    </div>
</template>

<style>
</style>
