<script setup>
// Import packages
import { ref } from 'vue'

// Import vue components
import NavigationDrawer from '../components/NavigationDrawer.vue'
import ContentBlock from '../components/ContentBlock.vue'
import LoanLedger from '../components/LoanLedger.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'

import LoanStatusItem from '../components/LoanStatusItem.vue'
import LoanStatusItemPopup from '../components/LoanStatusItemPopup.vue'
import MemberProfileRegister from '../components/MemberProfileRegister.vue'

// Define reactive variables
const isPopupActive = ref(false)

// Define constant variables
const data = [
    ['id1', 'John Doe', 'Personal Loan', '$10,000'],
    ['id2', 'John Doe', 'Personal Loan', '$10,000'],
    ['id3', 'John Doe', 'Personal Loan', '$10,000'],
    ['id4', 'John Doe', 'Personal Loan', '$10,000'],
    ['id5', 'John Doe', 'Personal Loan', '$10,000'],
    ['id6', 'John Doe', 'Personal Loan', '$10,000'],
    ['id7', 'John Doe', 'Personal Loan', '$10,000'],
    ['id8', 'John Doe', 'Personal Loan', '$10,000'],
    ['id9', 'John Doe', 'Personal Loan', '$10,000'],
    ['id10', 'John Doe', 'Personal Loan', '$10,000'],
    ['id11', 'John Doe', 'Wow Loan', '$10,000'],
    ['id12', 'John Doe', 'Personal Loan', '$10,000'],
    ['id13', 'Jana', 'Personal Loan', '$10,000'],
    ['id14', 'Mama mo', 'Panootie', '$10,000'],
    ['id15', 'Jana', 'Personal Loan', '$10,000']
]

const setPopupLoan = (loanId) => {
    isPopupActive.value = true

    const loan = data.find((loan) => loan[0] === loanId)

    // TODO: Use the loan data to populate the popup
}
</script>

<template>
    <div class="bg-off-white d-flex px-4 py-2">
        <NavigationDrawer />

        <div class="d-flex flex-column w-100 pl-8">
            <!-- Top Bar of Dashboard -->
            <DashboardTopBar :breadcrumbs="['Home', 'Loans', 'Loan Status']" />

            <!-- Main Dashboard Body -->
            <div class="dashboard-body d-flex flex-column h-100 py-4">
                <h2>All Pending Loans</h2>

                <ContentBlock
                    :width="100"
                    :height="100"
                    :maxWidth="1600"
                    :unit="'%'"
                    :maxUnit="'px'"
                    :bg-color="'#FFF'"
                >
                    <VDialog width="1200" v-model="isPopupActive">
                        <!-- Form popup -->
                        <template #default="{ isActive }">
                            <VCard close-on-back contained class="form-wrapper">
                                <VContainer>
                                    <VRow justify="end">
                                        <VCardActions>
                                            <VBtn
                                                class="ma-2 capitalize-text"
                                                color="var(--vt-c-blue)"
                                                @click="isActive.value = false"
                                                icon="mdi-close"
                                            >
                                            </VBtn>
                                        </VCardActions>
                                    </VRow>
                                </VContainer>

                                <LoanStatusItemPopup />
                            </VCard>
                        </template>
                    </VDialog>

                    <LoanStatusItem :data="data" :set-popup-loan="setPopupLoan" />
                </ContentBlock>
            </div>
        </div>
    </div>
</template>

<style></style>
