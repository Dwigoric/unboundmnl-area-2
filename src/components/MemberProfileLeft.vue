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


// Define constants
const rules = {
    required: (v) => !!v || 'This field is required'
}

// Define reactive variables
const errorAlert = ref(false)
const errorMessage = ref('')
const form = ref(null)

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
    coborrowerName: {
        given: '',
        middle: '',
        last: ''
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
    <!-- Details -->
    <ContentBlock :width="100" :height="100" :unit="'%'" :padding="3">
        <div class="d-flex">
            <v-icon icon="mdi-account-circle" size="large" class="mt-1 mr-2"/>
            <h2>Nootnoot</h2>
        </div>

        <div class="ml-9"> 
            <div class="row-tab">
                <div class="label">
                    <h3>Name</h3>
                </div>
            </div>
            <div class="row-tab">
                <div class="sub-label">Last</div>
                <div class="field">Bantolino</div>
            </div>
            <div class="row-tab">
                <div class="sub-label">First</div>
                <div class="field">Jana Marie</div>
            </div>
            <div class="row-tab">
                <div class="sub-label">Middle</div>
                <div class="field">Salud</div>
            </div>

            <v-divider class="mt-2"></v-divider>

            <div class="row-tab pt-2">
                <div class="sub-label">Birthday</div>
                <div class="field">09-05-2022</div>
                <div class="ml-3">(MM-DD-YYYY)</div>
            </div>

            <div class="row-tab pt-2">
                <div class="sub-label">Birthplace</div>
                <div class="field">Manila</div>
            </div>

            <div class="row-tab pt-2">
                <div class="sub-label">Gender</div>
                <div class="field">F</div>
            </div>

            <div class="row-tab pt-2">
                <div class="sub-label">Civil Status</div>
                <div class="field">Widowed</div>
            </div>

            <div class="row-tab pt-2">
                <div class="sub-label">Tin Number</div>
                <div class="field">123-456-789</div>
            </div>

            <div class="row-tab pt-2">
                <div class="sub-label">Occupation</div>
                <div class="field">Penguin</div>
            </div>

            <v-divider class="mt-2"></v-divider>

            <div class="row-tab pt-2">
                <div class="label">
                    <h3>Address</h3>
                </div>
            </div>
            <div class="row-tab">
                <div class="sub-label">Street</div>
                <div class="field">304</div>
            </div>
            <div class="row-tab">
                <div class="sub-label">Barangay</div>
                <div class="field">Gov. A Santos Avenue</div>
            </div>
            <div class="row-tab">
                <div class="sub-label">City</div>
                <div class="field">Paranaque</div>
            </div>
            <div class="row-tab">
                <div class="sub-label">Province</div>
                <div class="field">NCR</div>
            </div>

            <v-divider class="mt-2"></v-divider>

            <div class="row-tab pt-2">
                <h3 class="label">Spouse</h3>
            </div>
            <div class="row-tab">
                <div class="sub-label">Last</div>
                <div class="field">Bantolino</div>
            </div>
            <div class="row-tab">
                <div class="sub-label">First</div>
                <div class="field">Jana Marie</div>
            </div>
            <div class="row-tab">
                <div class="sub-label">Middle</div>
                <div class="field">Salud</div>
            </div>
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
