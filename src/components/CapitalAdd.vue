<script setup>
import { ref, onMounted, watch } from 'vue'
import { Grid } from 'gridjs';
import "gridjs/dist/theme/mermaid.css";

//const loanLedgerRefTable = ref();
//const loanLedgerRef = ref();
</script>

<template>
    <h2 class="header-wrapper pt-3">Add New Transaction</h2>
    <div class="wrapper">

        <!-- Add transaction form -->
        <div class="d-flex flex-row">
            <VTextField class="ml-3" type="date" label="Date of Payment" />
            <VTextField class="ml-3" label="GV/OR Number" />
        </div>
        <VTextField class="ml-3" label="Amount Paid" />
        <VTextField class="ml-3" label="Balance" />
        <VTextField class="ml-3" label="Interest Paid" />
        <VTextField class="ml-3" label="Fines Paid" />
        <VTextField class="ml-3" label="Term of Loan" />
        <div class="d-flex flex-row">
            <VTextField class="ml-3" type="date" label="Date of Entry" />
            <!-- TODO: Retrieve list of officers from the database -->
            <v-select class="ml-3" label="Officer in Charge" :items="['Capy', 'Booboo', 'Baabaa']"></v-select>
        </div>

        <!-- TODO: Connect this button to a method to add to the database -->
        <div class="btn-wrapper">
            <VBtn prepend-icon="mdi-check" class="capitalize btn">
                Submit
            </VBtn>
        </div>
    </div>
</template>

<style scoped>
.btn {
    font-weight: 600;
    color: var(--vt-c-white-off);
    background: var(--vt-c-blue);

    display: flex;
    align-items: center;
    text-align: center;

    border-radius: 5px;
    text-transform: capitalize;
}

.btn-wrapper {
    height: min-content;
    display: flex;
    justify-content: flex-end;
}

.btn:hover {
    background: var(--vt-c-blue-dark);
}

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
    padding-top: 1%;
    padding-bottom: 3%;
    background-color: var(--vt-c-white);
}
</style>