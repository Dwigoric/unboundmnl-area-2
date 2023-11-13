<script setup>
import { ref, onMounted, watch, reactive } from 'vue'
import { Grid } from 'gridjs'
import { API_URL, LOAN_TYPES } from '../constants'

import 'gridjs/dist/theme/mermaid.css'

// Define constants
const rules = {
    required: (v) => !!v || 'This field is required'
}

const formatDate = function (date) {
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    return `${year}-${month}-${day}`
}

const form = ref(null)
const errorAlert = ref(false)
const errorMessage = ref('')

const props = defineProps({
    loanID: {
        type: [Number, String],
        default: null
    },
    onsubmit: {
        type: Function,
        default: () => () => null
    }
})

const formData = reactive({
    ORNumber: '',
    paymentDate: '',
    submissionDate: formatDate(Date.now()),
    amountPaid: 0,
    balance: 0,
    interestPaid: 0,
    finesPaid: 0,
    officerInCharge: ''
})

const officers = reactive([])

const submit = async function () {
    const { valid } = await form.value.validate()
    if (!valid) return

    const preprocessedFormData = { ...formData }
    preprocessedFormData.officerInCharge = { ...preprocessedFormData.officerInCharge.value }

    const res = await fetch(`${API_URL}/loans/${props.loanID}/ledger`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        },
        body: JSON.stringify({
            ...preprocessedFormData
        })
    })
    const { error, message } = await res.json()

    if (error) {
        errorAlert.value = true
        errorMessage.value = message
        return false
    } else {
        errorAlert.value = false
        errorMessage.value = ''
        props.onsubmit()
        return true
    }
}

onMounted(async () => {
    const officersRes = await fetch(`${API_URL}/officers/`, {
        headers: {
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        }
    })
    const officersJson = await officersRes.json()

    for (const officer of officersJson.officers) {
        officers.push({
            title: `${officer.name.last}, ${officer.name.given}`,
            value: officer.name
        })
    }
})
</script>

<template>
    <h2 class="header-wrapper pt-3">Add New Transaction</h2>
    <div class="wrapper">
        <!-- Add transaction form -->
        <VForm id="loan-ledger-form" ref="form">
            <div class="d-flex flex-row">
                <VTextField
                    class="ml-3"
                    type="date"
                    label="* Date of Payment"
                    v-model="formData.paymentDate"
                    :rules="[rules.required]"
                />
                <VTextField
                    class="ml-3"
                    label="* GV/OR Number"
                    v-model="formData.ORNumber"
                    :rules="[rules.required]"
                />
            </div>
            <VTextField
                class="ml-3"
                type="number"
                label="Amount Paid"
                v-model="formData.amountPaid"
            />
            <VTextField class="ml-3" type="number" label="Balance" v-model="formData.balance" />
            <VTextField
                class="ml-3"
                type="number"
                label="Interest Paid"
                v-model="formData.interestPaid"
            />
            <VTextField
                class="ml-3"
                type="number"
                label="Fines Paid"
                v-model="formData.finesPaid"
            />
            <div class="d-flex flex-row">
                <VTextField
                    class="ml-3"
                    type="date"
                    label="* Date of Entry"
                    v-model="formData.submissionDate"
                    :rules="[rules.required]"
                />
                <v-combobox
                    class="ml-3"
                    label="* Officer in Charge"
                    :items="officers"
                    v-model="formData.officerInCharge"
                    :rules="[rules.required]"
                ></v-combobox>
            </div>

            <div class="btn-wrapper">
                <VBtn prepend-icon="mdi-check" class="capitalize btn" @click.prevent="submit">
                    Submit
                </VBtn>
            </div>

            <VAlert
                v-if="errorAlert"
                v-model="errorAlert"
                type="error"
                closable=""
                density="comfortable"
                elevation="5"
            >
                {{ errorMessage }}
            </VAlert>
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
    padding-top: 1%;
    padding-bottom: 3%;
    background-color: var(--vt-c-white);
}
</style>
