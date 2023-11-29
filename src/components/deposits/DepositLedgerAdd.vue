<script setup>
// Packages
import { ref, onMounted, reactive, computed } from 'vue'

// Project constants
import { API_URL, FORM_RULES } from '../../constants/index.js'

// Stylesheets
import 'gridjs/dist/theme/mermaid.css'

// Define constants
const rules = {
    isOfficer: (v) => {
        return (
            officers.map((officer) => officer.title).includes(v.title) ||
            'This field must be a valid officer'
        )
    },
    maxDecimalPlaces: (decimalPlaces) => {
        return (v) =>
            ((v) => {
                v = parseFloat(v)
                if (!v) return 0
                if (Math.floor(v) === v) return 0
                return v.toString().split('.')[1].length || 0
            })(v) <= decimalPlaces || `Must not have more than ${decimalPlaces} decimal places`
    }
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
const loading = ref(false)

const props = defineProps({
    depositID: {
        type: [Number, String],
        default: null
    },
    onsubmit: {
        type: Function,
        default: () => () => null
    },
    runningAmount: {
        type: Number,
        default: 0
    }
})

const formData = reactive({
    ORNumber: '',
    transactionDate: '',
    submissionDate: formatDate(Date.now()),
    transactionType: '',
    amount: 0,
    interest: 0,
    balance: 0,
    officerInCharge: ''
})

// TODO: this throws an error, fix it later
// eslint-disable-next-line vue/return-in-computed-property
const newBalance = computed(() => {
    // Compute the new balance differently depending on whether transaction is deposit or withdrawal
    if (formData.transactionType === 'Deposit' || formData.transactionType === 'deposit') {
        return props.runningAmount + Number(formData.amount) + Number(formData.interest)
    } else if (
        formData.transactionType === 'Withdrawal' ||
        formData.transactionType === 'withdrawal'
    ) {
        return props.runningAmount - Number(formData.amount)
    }
})

const officers = reactive([])

const submit = async function () {
    const { valid } = await form.value.validate()
    if (!valid) return

    formData.balance = newBalance

    const preprocessedFormData = { ...formData }
    preprocessedFormData.officerInCharge = { ...preprocessedFormData.officerInCharge.value }

    loading.value = true

    const res = await fetch(`${API_URL}/deposits/${props.depositID}/ledger`, {
        credentials: 'omit',
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

    loading.value = false

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
        credentials: 'omit',
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
            <!-- Only show form once user has selected transaction type -->

            <div class="d-flex flex-row">
                <VTextField
                    class="ml-3"
                    type="date"
                    label="* Date of Payment"
                    v-model="formData.transactionDate"
                    :rules="[FORM_RULES.required]"
                />
                <VTextField
                    class="ml-3"
                    label="* GV/OR Number"
                    v-model="formData.ORNumber"
                    :rules="[FORM_RULES.required]"
                />
            </div>
            <div class="d-flex flex-row">
                <VTextField
                    class="ml-3"
                    type="date"
                    label="* Date of Entry"
                    v-model="formData.submissionDate"
                    :rules="[FORM_RULES.required]"
                />
                <v-combobox
                    class="ml-3"
                    label="* Officer in Charge"
                    :items="officers"
                    v-model="formData.officerInCharge"
                    :rules="[FORM_RULES.required, rules.isOfficer]"
                ></v-combobox>
            </div>
            <VSelect
                class="ml-3"
                label="* Transaction Type"
                v-model="formData.transactionType"
                :items="['Deposit', 'Withdrawal']"
                :rules="[FORM_RULES.required]"
            ></VSelect>

            <div v-if="formData.transactionType !== ''">
                <VTextField
                    v-number-only
                    class="ml-3"
                    type="number"
                    label="Amount"
                    v-model="formData.amount"
                    :rules="[rules.maxDecimalPlaces(2)]"
                />
                <VTextField
                    v-number-only
                    class="ml-3"
                    type="number"
                    label="Balance"
                    v-model="newBalance"
                    :rules="[rules.maxDecimalPlaces(2)]"
                />
                <!-- Only show interest earned if deposit transaction -->
                <div v-if="formData.transactionType === 'Deposit'">
                    <VTextField
                        v-number-only
                        class="ml-3"
                        type="number"
                        label="Interest Earned"
                        v-model="formData.interest"
                        :rules="[rules.maxDecimalPlaces(2)]"
                    />
                </div>
            </div>

            <div class="btn-wrapper">
                <VBtn
                    prepend-icon="mdi-check"
                    class="capitalize btn"
                    :loading="loading"
                    @click.prevent="submit"
                >
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
