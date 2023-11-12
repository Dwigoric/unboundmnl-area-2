<script setup>
import { ref, onMounted } from 'vue'
import { Grid} from 'gridjs';
import "gridjs/dist/theme/mermaid.css";

//const loanLedgerRefTable = ref();
//const loanLedgerRef = ref();
</script>

<template>
    <h2 class="header-wrapper">Add New Transaction</h2>
    <div class="wrapper">
        <h3 class="w-100 px-4 mb-3">Current Loan Data</h3>
        <div id="loan-ledger-wrapper" ref="loanLedgerRefTable" class="w-100 px-4"></div>
        
        <h3 class="w-100 px-4 mb-3 mt-5">Edit the data below</h3>
        <!-- TODO: Will fix layout - anaj00 -->
        <VTextField class="ml-3" type="date" label="Date of Payment" />
        <VTextField class="ml-3" label="GV/OR Number" />
        <VTextField class="ml-3" label="Amount Paid" />
        <VTextField class="ml-3" label="Balance" />
        <VTextField class="ml-3" label="Interest Paid" />
        <VTextField class="ml-3" label="Fines Paid" />
        <VTextField class="ml-3" label="Term of Loan" />
        <VTextField class="ml-3" type="date" label="Date of Entry" />
        <v-select
            class="ml-3"
            label="Officer in Charge"
            :items="['Capy', 'Booboo', 'Baabaa']"
        ></v-select>
        <!-- TODO: Connect this button to a method to add to the database -->
        <VBtn block size="large" rounded="lg" prepend-icon="mdi-check" color="green-darken-1" class="hover-scale-sm">SUBMIT</VBtn>
    </div>
</template>

<style scoped>
.header-wrapper {
    padding-left: 7%;
    padding-bottom: 2%;
}

.row-tab {
    /* border: 1px solid black; */
    display: flex;
    margin-bottom: 1%;
}

.label {
    margin-top: 15px;
    margin-right: 2%;
    /* border: 1px solid black; */
    width: 10%;

    display: inline-block;
    text-align: right;
    vertical-align: top;
}

.wrapper {
    padding: 6%;
    padding-top: 2%;
    padding-bottom: 3%;
    background-color: var(--vt-c-white);
}
</style>