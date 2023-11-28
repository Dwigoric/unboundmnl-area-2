<script setup>
// Packages
import { ref, onMounted, watch, reactive, computed } from 'vue'
import Decimal from 'decimal.js'

// Project constants
import { API_URL, FORM_RULES } from '../constants'

// Stylesheets
import 'gridjs/dist/theme/mermaid.css'

// Import router
import router from '../router'

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

// :rules="[rules.maxDecimalPlaces(2)]"

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

// Props
const props = defineProps({
    loanID: {
        type: [Number, String],
        default: null
    },
    onsubmit: {
        type: Function,
        default: () => () => null
    },
    originalLoanAmount: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    }
})

const formData = reactive({
    ORNumber: '',
    transactionDate: '',
    submissionDate: formatDate(Date.now()),
    amountPaid: 0,
    amountDue: 0,
    balance: props.balance,
    interestPaid: 0,
    finesDue: 0,
    finesPaid: 0,
    interestDue: 0,
    officerInCharge: '',
    transactionType: ''
})

const newBalance = computed(() => {
    const dues = Decimal(formData.interestDue).add(formData.finesDue)
    const payments = Decimal(formData.amountPaid).add(formData.interestPaid).add(formData.finesPaid)

    return parseFloat(Decimal(props.balance).sub(payments).add(dues))
})

const officers = reactive([])

const submit = async function () {
    const { valid } = await form.value.validate()
    if (!valid) return

    loading.value = true

    // If transaction is NOT readjustment
    if (formData.readjustment === false) {
        // Update balance to match that of form input
        formData.balance = newBalance
    }

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

    loading.value = false

    if (error) {
        errorAlert.value = true
        errorMessage.value = message
        return false
    } else {
        errorAlert.value = false
        errorMessage.value = ''
        props.onsubmit()

        // Then reload page to ensure that form saves new value
        // Is there a more elegant way to do this?
        router.go()
        return true
    }
}

// Watch the transaction type to reset formData back to default if switching transaction type
watch(
    () => formData.transactionType,
    (transaction) => {
        console.log(`I PICKED THIS TRANSACTION TYPE: ${transaction}`)

        // If selected transaction is payments
        if (transaction === 'payments') {
            formData.amountPaid = 0
            formData.amountDue = 0
            formData.interestDue = 0
            formData.balance = props.balance
            formData.payment = true
            formData.dues = false
            formData.readjustment = false
        } else if (transaction === 'dues') {
            formData.amountPaid = 0
            formData.interestPaid = 0
            formData.finesPaid = 0
            formData.balance = props.balance
            formData.payment = false
            formData.dues = true
            formData.readjustment = false
        } else if (transaction === 'readjustment') {
            formData.balance = props.balance
            formData.readjustment = true
            formData.amountDue = 0
            formData.amountPaid = 0
            formData.interestDue = 0
            formData.interestPaid = 0
            formData.finesPaid = 0
        }
    }
)

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
            <h2 class="ml-3 py-3">Transaction Type</h2>
            <div class="d-flex justify-center w-100">
                <v-radio-group v-model="formData.transactionType" inline="">
                    <v-radio label="Payment" value="payment"></v-radio>
                    <v-radio label="Dues" value="dues"></v-radio>
                    <v-radio label="Balance Readjustment" value="readjustment"></v-radio>
                </v-radio-group>
            </div>

            <!-- Only show form once user has selected transaction type -->
            <div v-if="formData.transactionType !== ''">
                <div class="d-flex flex-row mb-3">
                    <VTextField
                        class="ml-3"
                        type="date"
                        label="* Date of Payment"
                        v-model="formData.transactionDate"
                        :rules="[FORM_RULES.required]"
                        hint="When was the payment made?"
                        persistent-hint=""
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
                        hint="When is this entry being created?"
                        persistent-hint=""
                    />
                    <v-combobox
                        class="ml-3"
                        label="* Officer in Charge"
                        :items="officers"
                        v-model="formData.officerInCharge"
                        :rules="[FORM_RULES.required, rules.isOfficer]"
                        hint="Which Loan Officer/Administrator is handling this loan?"
                        persistent-hint=""
                    ></v-combobox>
                </div>

                <!-- Only show payments if Payments is Selected -->
                <div v-if="formData.transactionType === 'payment'">
                    <h3 class="ml-3 py-3">Payments</h3>
                    <VTextField
                        class="ml-3"
                        v-number-only
                        type="number"
                        label="Balance (Automatically Calculated)"
                        disabled=""
                        v-model="newBalance"
                        :min="0"
                        persistent-hint=""
                    />
                    <VTextField
                        class="ml-3"
                        v-number-only
                        type="number"
                        label="Amount Paid"
                        v-model="formData.amountPaid"
                        :rules="[rules.maxDecimalPlaces(2)]"
                        :min="0"
                    />
                    <VTextField
                        class="ml-3"
                        v-number-only
                        type="number"
                        label="Interest Paid"
                        v-model="formData.interestPaid"
                        :rules="[rules.maxDecimalPlaces(2)]"
                        :min="0"
                    />

                    <!-- Fines Paid -->
                    <VTextField
                        class="ml-3"
                        v-number-only
                        type="number"
                        label="Fines Paid"
                        v-model="formData.finesPaid"
                        :rules="[rules.maxDecimalPlaces(2)]"
                        :min="0"
                    />
                </div>

                <!-- Only show dues if Due is selected -->
                <div v-if="formData.transactionType === 'dues'">
                    <!-- Only show dues if Fine/Interest is selected -->
                    <h3 class="ml-3 py-3">Dues</h3>
                    <VTextField
                        class="ml-3"
                        v-number-only
                        type="number"
                        label="Amount Due"
                        v-model="formData.amountDue"
                        :rules="[rules.maxDecimalPlaces(2)]"
                        :min="0"
                    />
                    <!-- TODO: Automatically generate interest value?? -->
                    <VTextField
                        class="ml-3"
                        v-number-only
                        type="number"
                        label="Interest Due"
                        v-model="formData.interestDue"
                        :rules="[rules.maxDecimalPlaces(2)]"
                        :min="0"
                    />

                    <VTextField
                        class="ml-3"
                        v-number-only
                        type="number"
                        label="Fines Due"
                        v-model="formData.finesDue"
                        :rules="[rules.maxDecimalPlaces(2)]"
                        :min="0"
                    />
                </div>

                <div v-if="formData.transactionType === 'readjustment'">
                    <h3 class="ml-3 py-3">Balance Readjustment</h3>
                    <VTextField
                        class="ml-3"
                        v-number-only
                        type="number"
                        label="New Balance"
                        v-model="formData.balance"
                        :min="0"
                        :max="props.originalLoanAmount"
                        :rules="[rules.maxDecimalPlaces(2)]"
                    />
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
            </div>
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
