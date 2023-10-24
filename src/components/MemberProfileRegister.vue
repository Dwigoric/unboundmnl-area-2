<script setup>
// Import packages
import { ref, reactive } from 'vue'

// Import constants
import { API_URL } from '../constants'

// Define reactive variables
const errorMessage = ref('')
const errorAlert = ref(false)
const form = ref(null)

// Define form fields
const userData = reactive({
    username: '',
    name: {
        given: '',
        middle: '',
        last: ''
    },
    birthday: '',
    birthplace: '',
    gender: '',
    civil_status: '',
    tin_no: '',
    monthly_income: '',
    contact_no: '',
    address: {
        street: '',
        barangay: '',
        city: '',
        province: ''
    },
    occupation: '',
    spouse: {
        name: {
            given: '',
            middle: '',
            last: ''
        },
        birthday: '',
        birthplace: '',
        contact_no: ''
    }
})

// Define constants
const rules = {
    required: (v) => !!v || 'This field is required'
}

const props = defineProps({
    action: {
        type: String,
        default: () => 'register',
        validator: (value) => {
            return ['register', 'update'].includes(value)
        }
    },
    autofill: {
        type: Object,
        default: () => {}
    }
})

const submitForm = async function () {
    console.log(props.action)

    const validationResult = await form.value.validate()
    const fn = props.action === 'update' ? updateUser : registerUser
    if (validationResult.valid) {
        await fn();
    }
}

// Define methods
const updateUser = async function () {
    const validationResult = await form.value.validate()
    if (validationResult.valid) {
        const result = await fetch(API_URL + '/users/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })

        errorMessage.value = ''

        if (result.status === 200) {
            form.value.reset()
        } else if (result.status === 400) {
            const jsonRes = await result.json()
            errorMessage.value = jsonRes.message
            errorAlert.value = true
        } else if (result.status === 500) {
            errorMessage.value = 'Internal Server Error'
            errorAlert.value = true
        }
    }
}

const registerUser = async function () {
    const validationResult = await form.value.validate()
    if (validationResult.valid) {
        const result = await fetch(API_URL + '/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })

        errorMessage.value = ''

        if (result.status === 200) {
            form.value.reset()
        } else if (result.status === 400) {
            const jsonRes = await result.json()
            errorMessage.value = jsonRes.message
            errorAlert.value = true
        } else if (result.status === 500) {
            errorMessage.value = 'Internal Server Error'
            errorAlert.value = true
        }
    }
}



</script>

<template>
    <div class="header">
        <div class="header-text">Create Member Profile</div>
    </div>
    <div class="info-fields">
        <div class="form-wrapper">
            <VForm id="login-form" ref="form">
                <div class="header2">Borrower's Information</div>

                <!-- Username -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Username:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.username" id="login-username"
                        :rules="[rules.required]" label="Enter Username" />
                </div>

                <!-- First Name -->
                <div class="row-tab">
                    <div class="label">
                        <div>* First name:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.name.given" id="login-first-name"
                        :rules="[rules.required]" label="Enter First Name" />
                </div>

                <!-- Middle Name -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Middle name:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.name.middle" id="login-middle-name"
                        label="Enter Middle Name" />
                </div>

                <!-- Last Name -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Last name:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.name.last" id="login-last-name"
                        :rules="[rules.required]" label="Enter Last Name" />
                </div>

                <!-- Date of Birth -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Date of Birth:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.birthday" id="login-birthday" type="date"
                        :rules="[rules.required]" label="Select Date of Birth" />
                </div>

                <!-- Place of Birth -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Place of Birth:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.birthplace" id="login-birthplace"
                        :rules="[rules.required]" label="Enter Place of Birth" />
                </div>

                <!-- Gender -->
                <!-- XXX: Should this be sex? -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Gender:</div>
                    </div>

                    <VSelect class="username-pw-input" v-model="userData.gender" :items="['M', 'F']" id="login-gender"
                        :rules="[rules.required]" label="Select Gender" />
                </div>

                <!-- TIN Number -->
                <div class="row-tab">
                    <div class="label">
                        <div>* TIN Number:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.tin_no" id="login-tin-number"
                        :rules="[rules.required]" label="Enter TIN Number (XXX-XXX-XXX-XXX)" />
                </div>

                <!-- Civil Status -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Civil Status:</div>
                    </div>

                    <VSelect class="username-pw-input" v-model="userData.civil_status" :items="['Single', 'Married']"
                        id="login-civil-status" :rules="[rules.required]" label="Select Civil Status" />
                </div>

                <!-- Contact Number -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Contact Number:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.contact_no" id="login-contact-number"
                        :rules="[rules.required]" label="Enter Contact Number" />
                </div>

                <!-- Monthly Income -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Monthly Income:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.monthly_income" id="login-monthly-income"
                        type="number" :rules="[rules.required]" label="Enter Monthly Income" />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Occupation/Source of Income:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.occupation" id="login-occupation"
                        :rules="[rules.required]" label="Enter Occupation/Source of Income" />
                </div>

                <!-- Borrower's Residence -->
                <div class="header2">Borrower's Residence</div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Street:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.address.street" id="login-address"
                        :rules="[rules.required]" label="Enter Street" />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Barangay:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.address.barangay" id="login-address"
                        :rules="[rules.required]" label="Enter Barangay" />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* City:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.address.city" id="login-address"
                        :rules="[rules.required]" label="Enter City" />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Province:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.address.province" id="login-address"
                        :rules="[rules.required]" label="Enter Province" />
                </div>

                <!-- Spouse's Information -->
                <div class="header2">Spouse's Information</div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's First Name:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.spouse.name.given" id="login-spouse-first-name"
                        :rules="[rules.required]" label="Enter Spouse's First Name" />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's Middle Name:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.spouse.name.middle"
                        id="login-spouse-middle-name" label="Enter Spouse's Middle Name" />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's Last Name:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.spouse.name.last" id="login-spouse-last-name"
                        :rules="[rules.required]" label="Enter Spouse's Last Name" />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's Date of Birth:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.spouse.birthday" id="login-spouse-birthday"
                        :rules="[rules.required]" type="date" label="Select Spouse's Date of Birth" />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's Place of Birth:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.spouse.birthplace" id="login-spouse-birthplace"
                        :rules="[rules.required]" label="Enter Spouse's Place of Birth" />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's Contact Number:</div>
                    </div>

                    <VTextField class="username-pw-input" v-model="userData.spouse.contact_no"
                        id="login-spouse-contact-number" :rules="[rules.required]" label="Enter Spouse's Contact Number" />
                </div>

                <VAlert v-if="errorAlert" v-model="errorAlert" type="error" closable="" density="comfortable" elevation="5">
                    {{ errorMessage }}
                </VAlert>

                <div class="btn-wrapper">
                    <VBtn type="submit" class="btn capitalize-text" @click.prevent="submitForm">Create Member Profile
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

.wrapper {
    background: var(--vt-c-white);
    border-radius: 5px;

    width: 60vw;
    max-height: 80vh;

    display: flex;
    flex-direction: column;
    overflow: auto;
}

.info-fields {
    background-color: var(--vt-c-white);
    padding: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    overflow: auto;
}

.form-wrapper {
    background-color: var(--vt-c-white);
}

.header {
    background-color: var(--vt-c-white-off);
    width: 100%;
    padding-bottom: 3%;

    position: sticky;
    top: 0;
    z-index: 1000;

    font-size: 1.5rem;
    font-weight: bold;

    text-align: center;
}

.header-text {}

.header2 {
    font-size: 1.2rem;
    margin-bottom: 3%;
    font-weight: bold;
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

.error-msg-wrapper {
    width: 100%;
    height: 7vh;
    position: absolute;
    z-index: 999;
}

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
