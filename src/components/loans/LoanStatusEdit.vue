<script setup>
// Packages
import { reactive, ref } from 'vue'

// Reactive variables
const loading = ref(false)
const items = reactive([])

// Project constants
import { API_URL } from '../../constants/index.js'

// Define props for the component
const props = defineProps({
    loanID: {
        type: [Number, String],
        default: null
    },
    onsubmit: {
        type: Function,
        default: () => {}
    }
})

const markAsReleased = async () => {
    loading.value = true

    const res = await fetch(`${API_URL}/loans/${props.loanID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        },
        body: JSON.stringify({
            status: 'released'
        })
    })

    console.log('hello from status edit')
    props.onsubmit()
    loading.value = false
}
</script>

<template>
    <h2 class="header-wrapper">Mark Loan as Released</h2>
    <div class="wrapper">
        <div id="loan-ledger-wrapper" ref="loanLedgerRefTable" class="w-10"></div>

        <!-- Edit transaction form -->
        <VForm id="loan-ledger-edit-form" ref="form">
            <p class="ml-3">Are you sure you want to mark this loan as released?</p>

            <!-- Date of Release -->
            <!-- Only if it needs date -->
            <!-- <div class="row-tab mt-5">
                <div class="label">
                    <div>* Date of Release:</div>
                </div>

                <VTextField
                    class="username-pw-input"
                    type="date"
                    label="Select Date of Release"
                />
            </div> -->

            <div class="btn-wrapper">
                <VBtn
                    prepend-icon="mdi-check"
                    class="capitalize btn"
                    :loading="loading"
                    @click.prevent="markAsReleased"
                >
                    Yes
                </VBtn>
            </div>

            <!-- <VAlert v-if="errorAlert" type="error" closable="" density="comfortable" elevation="5">
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

.header2 {
    font-size: 1.2rem;
    margin-bottom: 3%;
    font-weight: bold;
}

.row-tab {
    /* border: 1px solid black; */
    display: flex;
    margin-bottom: 1%;
    width: 60%;
}

.label {
    margin-top: 15px;
    margin-right: 2%;
    /* border: 1px solid black; */
    width: 22%;

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
