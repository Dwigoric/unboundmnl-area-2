<script setup>
// Import packages
import { ref, reactive } from 'vue'

// Import router
import router from '../router'

// Import constants
import { LOAN_TYPES } from '../constants'

// Import stores
import { useApplicationFormStore } from '../stores/applicationForm'
const appFormStore = useApplicationFormStore()

// Define constants
const rules = {
    required: (v) => !!v || 'This field is required'
}

// Define reactive variables
const errorAlert = ref(false)
const errorMessage = ref('')
const form = ref(null)
const hasCoborrower = ref(false)

// Define form fields
const loanData = reactive({
    date: '',
    classification: '',
    term: '',
    type: '',
    paymentFrequency: '',
    amount: 0,
    minAmount: 0,
    maxAmount: 0,
    coborrower: {
        name: {
            given: '',
            middle: '',
            last: ''
        },
        birthday: '',
        birthplace: '',
        occupation: '',
        contact_no: ''
    }
})

// Define Loan types
const loanTypes = reactive(
    Object.keys(LOAN_TYPES).map((key) => {
        return {
            title: LOAN_TYPES[key],
            value: key
        }
    })
)

// Define loan ranges depending on type (TENTATIVE VALUES)
const loanRanges = {
    emergency: { min: 100, max: 7000 },
    'multi-purpose': { min: 100, max: 6000 },
    educational: { min: 100, max: 6000 },
    'petty cash': { min: 100, max: 1000 },
    commercial: { min: 100, max: 2500 },
    livelihood: { min: 100, max: 2500 }

    // education: { min: 100, max: 5000 },
    // personal: { min: 100, max: 2500 },
    // micro: { min: 100, max: 1000 },
    // utilities: { min: 100, max: 3000 },
    // construction: { min: 100, max: 6000 },
    // emergency: { min: 100, max: 7000 },
    // commodity: { min: 100, max: 2500 }
}

// Define payment frequencies
const paymentFrequencies = [
    { title: 'Daily', value: 'daily' },
    { title: 'Weekly', value: 'weekly' },
    { title: 'Monthly', value: 'monthly' }
]

// Define methods
/**
 * Saves form data to the application form store.
 * @returns {Promise<void>}
 */
const prefillForm = async function () {
    // Check if form is valid
    const { valid } = await form.value.validate()
    if (!valid) return

    // Save data to store
    appFormStore.setLoanData(loanData)

    // Send to application details page
    await router.push({ name: 'Export Application Form' })
}

// Function that changes loan range depending on type of loan selected.
const changeLoanRange = function () {
    // Stores a string indicating the loan type selected
    const loanType = loanData.type

    // Queries the loanRanges object for the corresponding minimum and maximum amounts.
    const min = loanRanges[loanType].min
    const max = loanRanges[loanType].max
    // Then modifies the minimum and maximum amounts accordingly
    loanData.amount = min
    loanData.minAmount = min
    loanData.maxAmount = max
}
</script>

<template>
    <div class="info-fields">
        <div class="form-wrapper">
            <VForm id="login-form" ref="form">
                <div class="header2">Loan Information</div>

                <!-- Loan Classification -->

                <div class="row-tab">
                    <div class="label">
                        <div>* Classification:</div>
                    </div>

                    <VRadioGroup
                        v-model="loanData.classification"
                        id="loan-classification"
                        :rules="[rules.required]"
                    >
                        <VRadio label="New Loan" value="new"></VRadio>
                        <VRadio label="Renewal" value="renewal"></VRadio>
                    </VRadioGroup>
                </div>

                <!-- Term of Loan -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Term:</div>
                    </div>
                    <VTextField
                        class="username-pw-input"
                        v-model="loanData.term"
                        :rules="[rules.required]"
                        label="Enter Term of Loan"
                    />
                </div>

                <!-- Mode of Repayment -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Mode of Repayment:</div>
                    </div>
                    <VSelect
                        class="username-pw-input"
                        v-model="loanData.paymentFrequency"
                        :items="paymentFrequencies"
                        id="payment-frequency"
                        :rules="[rules.required]"
                        label="Mode of Repayment"
                    />
                </div>

                <!-- Type of Loan -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Type:</div>
                    </div>

                    <VSelect
                        class="username-pw-input"
                        v-model="loanData.type"
                        :items="loanTypes"
                        id="loan-type"
                        :rules="[rules.required]"
                        label="Select Loan Type"
                        @update:modelValue="changeLoanRange"
                    />
                </div>

                <div v-if="loanData.type !== ''" class="row-tab">
                    <div class="label">
                        <div>* Amount:</div>
                    </div>

                    <div style="width: 68%">
                        <VTextField
                            v-model="loanData.amount"
                            id="loan-amount"
                            :rules="[
                                rules.required,
                                (v) => {
                                    if (v < loanData.minAmount || v > loanData.maxAmount) {
                                        return (
                                            'Amount must be between ' +
                                            loanData.minAmount +
                                            ' and ' +
                                            loanData.maxAmount
                                        )
                                    }
                                    return true
                                }
                            ]"
                            label="Enter Loan Amount"
                            type="number"
                            :min="loanData.minAmount"
                            :max="loanData.maxAmount"
                            :step="100"
                        />
                        <VSlider
                            v-model="loanData.amount"
                            :min="loanData.minAmount"
                            :max="loanData.maxAmount"
                            :step="10"
                            thumb-label
                            :thumb-size="20"
                        >
                            <!-- Only showcase loanRange if a loan type is selected. -->
                            <template v-if="loanData.type !== ''" #prepend>
                                {{ loanData.minAmount }}
                            </template>
                            <template v-if="loanData.type !== ''" #append>
                                {{ loanData.maxAmount }}
                            </template>
                        </VSlider>
                    </div>
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>Coborrower Needed?</div>
                    </div>
                    <VCheckbox v-model="hasCoborrower"></VCheckbox>
                </div>

                <!-- Coborrower Information -->
                <div v-if="hasCoborrower">
                    <div class="header2">Coborrower's Information</div>

                    <div class="row-tab">
                        <div class="label">
                            <div>Coborrower First Name:</div>
                        </div>
                        <VTextField
                            class="username-pw-input"
                            v-model="loanData.coborrower.name.given"
                            :rules="[rules.required]"
                            label="Enter Coborrower First Name"
                        />
                    </div>
                    <div class="row-tab">
                        <div class="label">
                            <div>Coborrower Middle Name:</div>
                        </div>
                        <VTextField
                            class="username-pw-input"
                            v-model="loanData.coborrower.name.middle"
                            :rules="[rules.required]"
                            label="Enter Coborrower Middle Name"
                        />
                    </div>
                    <div class="row-tab">
                        <div class="label">
                            <div>Coborrower Last Name:</div>
                        </div>
                        <VTextField
                            class="username-pw-input"
                            v-model="loanData.coborrower.name.last"
                            :rules="[rules.required]"
                            label="Enter Coborrower Last Name"
                        />
                    </div>
                    <div class="row-tab">
                        <div class="label">
                            <div>Coborrower Date of Birth:</div>
                        </div>
                        <VTextField
                            class="username-pw-input"
                            v-model="loanData.coborrower.birthday"
                            type="date"
                            :rules="[rules.required]"
                            label="Enter Coborrower Date of Birth"
                        />
                    </div>
                    <div class="row-tab">
                        <div class="label">
                            <div>Coborrower Place of Birth:</div>
                        </div>
                        <VTextField
                            class="username-pw-input"
                            v-model="loanData.coborrower.birthplace"
                            :rules="[rules.required]"
                            label="Enter Coborrower Place of Birth"
                        />
                    </div>
                    <div class="row-tab">
                        <div class="label">
                            <div>Coborrower Occupation/Source of Income:</div>
                        </div>
                        <VTextField
                            class="username-pw-input"
                            v-model="loanData.coborrower.occupation"
                            :rules="[rules.required]"
                            label="Enter Coborrower Occupation/Source of Income"
                        />
                    </div>
                    <div class="row-tab">
                        <div class="label">
                            <div>Coborrower Contact Number:</div>
                        </div>
                        <VTextField
                            class="username-pw-input"
                            v-model="loanData.coborrower.contact_no"
                            :rules="[rules.required]"
                            label="Enter Coborrower Contact Number"
                        />
                    </div>
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

                <div class="btn-wrapper">
                    <VBtn type="submit" class="btn capitalize-text" @click.prevent="prefillForm">
                        Submit and Generate PDF
                    </VBtn>
                </div>
            </VForm>
        </div>
    </div>
</template>

<!-- Stylesheet -->
<style scoped>
.bg {
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    z-index: 9999;

    background-color: rgba(0, 0, 0, 0.5);
}

.form-wrapper {
    background: var(--vt-c-white);
}

.header2 {
    font-size: 1.2rem;
    margin-bottom: 3%;
    font-weight: bold;
}

.info-fields {
    padding: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    overflow: auto;
    /* border: 1px solid black; */
}

.error-msg-wrapper {
    width: 100%;
    height: 7vh;
    position: absolute;
    z-index: 999;
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
    width: 30%;

    display: inline-block;
    text-align: right;
    vertical-align: top;
}

.username-pw-input {
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

.rememberMe {
    font-size: 0.9em;
    color: var(--primary-color-jade);
    font-weight: 500;
    margin: -15px 2 15px;
    display: flex;
    justify-content: right;
    margin-top: 5px;
    margin-bottom: 20px;
}

.error {
    display: flex;
    font-size: 0.9em;
    text-align: center;
    color: red;
    font-weight: 400;
    margin: 25px 1 10px;
    justify-content: center;
}
</style>
