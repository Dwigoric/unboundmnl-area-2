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

</script>

<template>
    <!-- Details -->
    <ContentBlock :width="100" :height="100" :unit="'%'">
        <v-tabs
            v-model="tab"
            slider-color="var(--vt-c-blue-dark)"
            class="mt-1"
        >
            <v-tab href="#loan" class="capitalize mt-n1 mb-n1">Loans</v-tab>
            <v-tab href="#deposit" class="capitalize mt-n1 mb-n1">Deposits</v-tab>
        </v-tabs>

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
