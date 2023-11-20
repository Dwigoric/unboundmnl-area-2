<script setup>
// Import vue components
import { ref } from 'vue'

import ContentBlock from '../../components/ContentBlock.vue'
import LoanSettingsTable from '../../components/settings/LoanSettingsTable.vue'

const tab = ref('option-1')
</script>

<template>
    <ContentBlock :width="100" :height="100" :unit="'%'" :padding="3">
        <h3>Loan Settings</h3>
        
        <div class="d-flex flex-row mt-2">
            <v-tabs
                v-model="tab"
                direction="vertical"
                color="primary">

                <v-tab value="emergency">
                    <div class="capitalize">Emergency</div>
                </v-tab>

                <v-tab value="educational">
                    <div class="capitalize">Educational</div>
                </v-tab>

                <v-tab value="petty-cash">
                    <div class="capitalize">Petty Cash</div>
                </v-tab>

                <v-tab value="multipurpose-cash">
                    <div class="capitalize">Multipurpose Cash</div>
                </v-tab>

                <v-tab value="commercial">
                    <div class="capitalize">Commercial</div>
                </v-tab>

                <v-tab value="agriculture">
                    <div class="capitalize">Agriculture</div>
                </v-tab>
            </v-tabs>

            <v-window v-model="tab" class="ml-2 mt-2">
                <v-window-item value="emergency">
                        <LoanSettingsTable :header="`Emergency`"/>
                </v-window-item>

                <v-window-item value="educational">
                        <LoanSettingsTable :header="`Educational`"/>
                </v-window-item>

                <v-window-item value="petty-cash">
                        <LoanSettingsTable :header="`Petty Cash`"/>
                </v-window-item>

                <v-window-item value="multipurpose-cash">
                        <LoanSettingsTable :header="`Multipurpose Cash`"/>
                </v-window-item>

                <v-window-item value="commercial">
                        <LoanSettingsTable :header="`Commercial`"/>
                </v-window-item>

                <v-window-item value="agriculture">
                        <LoanSettingsTable :header="`Agriculture`"/>
                </v-window-item>
            </v-window>

        </div>
    </ContentBlock>
</template>