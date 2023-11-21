<script setup>
// Import packages
import { ref, reactive } from 'vue'

// Import router
import router from '../router'

// Import constants
import { API_URL, LOAN_TYPES } from '../constants'

// Import stores
import { useApplicationFormStore } from '../stores/applicationForm'
const appFormStore = useApplicationFormStore()

import ContentBlock from '../components/ContentBlock.vue'

const tab = ref('loans')
</script>

<template>
    <!-- Details -->
    <ContentBlock :width="100" :height="100" :unit="'%'">
        <div class="d-flex flex-column mt-2">
            <v-tabs
                v-model="tab"
                color="primary">

                <v-tab value="loans">
                    <div class="capitalize">Loans</div>
                </v-tab>

                <v-tab value="deposits">
                    <div class="capitalize">Deposits</div>
                </v-tab>
            </v-tabs>

            <v-window v-model="tab" class="ml-5 mt-2">
                <v-window-item value="loans">
                    <h3>Loans</h3>
                    <!-- TODO: Add table here -->
                </v-window-item>

                <v-window-item value="deposits">
                    <h3>Deposits</h3>
                    <!-- TODO: Add table here -->
                </v-window-item>

                
            </v-window>

        </div>

    </ContentBlock>
</template>

<!-- Stylesheet -->
<style scoped>
.bborder {
    border: 1px solid black;
}

.form-wrapper {
    background: var(--vt-c-white);
}

.row-tab {
    /* border: 1px solid black; */
    display: flex;
    /* margin-bottom: 1%; */
}

.label {
    margin-right: 2%;
    width: 25%;

    display: inline-block;
    vertical-align: top;
}

.sub-label {
    color: var(--vt-c-gray-dark);
    margin-right: 2%;
    margin-left: 10%;
    width: 30%;

    display: inline-block;
    vertical-align: top;
}

.field {
    text-align: right;
    font-weight: 500;
}

.btn {
    color: var(--vt-c-white-off);
    font-weight: 600;
    background: var(--vt-c-blue);

    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-wrapper {
    height: min-content;
    display: flex;
    justify-content: flex-end;
    margin-top: 2%;
}

.capitalize-text {
    text-transform: capitalize;
}

.btn:hover {
    background: var(--vt-c-blue-dark);
}
</style>
