<template>
    <h2 class="header-wrapper">Edit Loan</h2>
    <div class="wrapper">
        <div id="loan-ledger-wrapper" ref="loanLedgerRefTable" class="w-100 px-4"></div>

        <!-- Edit transaction form -->
        <VForm id="loan-ledger-edit-form" ref="form">
            <div class="d-flex flex-row">
                <VTextField class="ml-3" type="date" label="* Date of Payment"/>
                <VTextField class="ml-3" label="* GV/OR Number"/>
            </div>
            <VTextField class="ml-3" type="number" label="Amount Paid"/>
            <VTextField class="ml-3" type="number" label="Balance"/>
            <VTextField class="ml-3" type="number" label="Interest Paid"/>
            <VTextField class="ml-3" type="number" label="Fines Paid"/>
            <div class="d-flex flex-row">
                <VTextField class="ml-3" type="date" label="* Date of Entry"/>
                <v-combobox class="ml-3" label="* Officer in Charge"></v-combobox>
            </div>

            <div class="btn-wrapper">
                <VBtn prepend-icon="mdi-check" class="capitalize btn">
                    Submit
                </VBtn>
            </div>

            <!-- <VAlert v-if="errorAlert" v-model="errorAlert" type="error" closable="" density="comfortable" elevation="5">
                {{ errorMessage }}
            </VAlert> -->
        </VForm>
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
    padding-top: 2%;
    padding-bottom: 3%;
    background-color: var(--vt-c-white);
}
</style>
