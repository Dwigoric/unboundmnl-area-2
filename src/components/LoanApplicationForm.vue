<script setup>
import { VLabel } from 'vuetify/lib/components/index.mjs';
import CloseButton from '../components/CloseButton.vue'
</script>

<template>

    <div class="info-fields">
        <div class="form-wrapper">
            <VForm id="login-form" ref="form">
                <div class="header2">Borrower's Information</div>

                <!-- Username -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Username:</div>
                    </div>
    
                    <VTextField
                        class="username-pw-input"
                        v-model="username"
                        id="login-username"
                        :rules="[rules.required]"
                        label="Enter Username"
                    />
                </div>

                <!-- First Name -->
                <div class="row-tab">
                    <div class="label">
                        <div>* First name:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="first_name"
                        id="login-first-name"
                        :rules="[rules.required]"
                        label="Enter First Name"
                    />
                </div>

                <!-- Middle Name -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Middle name:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="middle_name"
                        id="login-middle-name"
                        label="Enter Middle Name"
                    />
                </div>

                <!-- Last Name -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Last name:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="last_name"
                        id="login-last-name"
                        :rules="[rules.required]"
                        label="Enter Last Name"
                    />
                </div>

                <!-- Date of Birth -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Date of Birth:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="birthday"
                        id="login-birthday"
                        type="date"
                        :rules="[rules.required]"
                        label="Select Date of Birth"
                    />
                </div>

                <!-- Place of Birth -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Place of Birth:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="birthplace"
                        id="login-birthplace"
                        :rules="[rules.required]"
                        label="Enter Place of Birth"
                    />
                </div>

                <!-- Gender -->
                <!-- XXX: Should this be sex? -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Gender:</div>
                    </div>

                    <VSelect
                        class="username-pw-input"
                        v-model="gender"
                        :items="['M', 'F']"
                        id="login-gender"
                        :rules="[rules.required]"
                        label="Select Gender"
                    /> 
                </div>
                
                <!-- TIN Number -->
                <div class="row-tab">
                    <div class="label">
                        <div>* TIN Number:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="tin_number"
                        id="login-tin-number"
                        :rules="[rules.required]"
                        label="Enter TIN Number (XXX-XXX-XXX-XXX)"
                    />
                </div>

                <!-- Civil Status -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Civil Status:</div>
                    </div>

                    <VSelect
                        class="username-pw-input"
                        v-model="civil_status"
                        :items="['Single', 'Married']"
                        id="login-civil-status"
                        :rules="[rules.required]"
                        label="Select Civil Status"
                    />
                </div>

                <!-- Contact Number -->
                <div class="row-tab">
                    <div class="label">
                        <div>* Contact Number:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="contact_number"
                        id="login-contact-number"
                        :rules="[rules.required]"
                        label="Enter Contact Number"
                    />  
                </div>

                <!-- Monthly Income -->
                <div class="row-tab">
                                    <div class="label">
                                        <div>* Monthly Income:</div>
                                    </div>

                                    <VTextField
                                        class="username-pw-input"
                                        v-model="monthly_income"
                                        id="login-monthly-income"
                                        type="number"
                                        :rules="[rules.required]"
                                        label="Enter Monthly Income"
                                    />
                                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Occupation/Source of Income:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="occupation"
                        id="login-occupation"
                        :rules="[rules.required]"
                        label="Enter Occupation/Source of Income"
                    />
                </div>

                <!-- Borrower's Residence -->
                <div class="header2">Borrower's Residence</div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Street:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="address_street"
                        id="login-address"
                        :rules="[rules.required]"
                        label="Enter Street"
                    />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Barangay:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="address_barangay"
                        id="login-address"
                        :rules="[rules.required]"
                        label="Enter Barangay"
                    />  
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* City:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="address_city"
                        id="login-address"
                        :rules="[rules.required]"
                        label="Enter City"
                    />  
                </div>
            
                <div class="row-tab">
                    <div class="label">
                        <div>* Province:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="address_province"
                        id="login-address"
                        :rules="[rules.required]"
                        label="Enter Province"
                    />    
                </div>
                
                <!-- Spouse's Information -->
                <div class="header2">Spouse's Information</div>


                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's First Name:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="spouse_first_name"
                        id="login-spouse-first-name"
                        :rules="[rules.required]"
                        label="Enter Spouse's First Name"
                    />
                </div>
                
                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's Middle Name:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="spouse_middle_name"
                        id="login-spouse-middle-name"
                        label="Enter Spouse's Middle Name"
                    />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's Last Name:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="spouse_last_name"
                        id="login-spouse-last-name"
                        :rules="[rules.required]"
                        label="Enter Spouse's Last Name"
                    />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's Date of Birth:</div>
                    </div>
    
                    <VTextField
                        class="username-pw-input"
                        v-model="spouse_birthday"
                        id="login-spouse-birthday"
                        :rules="[rules.required]"
                        type="date"
                        label="Select Spouse's Date of Birth"
                    />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's Place of Birth:</div>
                    </div>

                    <VTextField
                        class="username-pw-input"
                        v-model="spouse_birthplace"
                        id="login-spouse-birthplace"
                        :rules="[rules.required]"
                        label="Enter Spouse's Place of Birth"
                    />
                </div>

                <div class="row-tab">
                    <div class="label">
                        <div>* Spouse's Contact Number:</div>
                    </div>
                        
                    <VTextField
                        class="username-pw-input"
                        v-model="spouse_contact_number"
                        id="login-spouse-contact-number"
                        :rules="[rules.required]"
                        label="Enter Spouse's Contact Number"
                    />
                </div>
                
                <VAlert v-if="errorMessage"
                        type="error" 
                        closable=""
                        density="comfortable"
                        elevation="5"
                        >
                    {{ errorMessage }}
                </VAlert>

                <div class="btn-wrapper">
                    <VBtn type="submit" class="btn capitalize-text" @click.prevent="registerUser"
                        >Create User Profile</VBtn
                    >
                </div>
                
            </VForm>
        </div>
    </div>
</template>

<script>
import { API_URL } from '../constants/api_url.js'

const form_fields = {
    username: '',
    password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    birthday: '',
    birthplace: '',
    gender: '',
    tin_number: '',
    civil_status: '',
    contact_number: '',
    address_street: '',
    address_barangay: '',
    address_city: '',
    address_province: '',
    monthly_income: '',
    occupation: '',
    spouse_first_name: '',
    spouse_last_name: '',
    spouse_middle_name: '',
    spouse_contact_number: '',
    spouse_birthplace: '',
    spouse_birthday: ''
}

// const validationRules = {
//     required:
// }

export default {
    data: function () {
        return {
            ...form_fields,
            rules: {
                required: (v) => !!v || 'This field is required'
            },
            errorMessage: ''
        }
    },
    props: {
        togglePopup: Function
    },
    methods: {
        closePopup() {
            this.togglePopup('createMemberProfile')
        },
        registerUser: async function () {
            // const validationResult = await this.$refs.form.validate()
            // if (validationResult.valid) {
            //     const result = await fetch(API_URL + '/users/add', {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify(this.preprocessData())
            //     })

            //     this.errorMessage = ''

            //     if (result.status === 200) {
            //         this.$refs.form.reset()
            //     } else if (result.status === 400) {
            //         const jsonRes = await result.json()
            //         this.errorMessage = jsonRes.message
            //     } else if (result.status === 500) {
            //         this.errorMessage = 'Internal Server Error'
            //     }
            // }
        },
        preprocessData: function () {
            return {
                username: this.username,
                name: {
                    given: this.first_name,
                    middle: this.middle_name,
                    last: this.last_name
                },
                birthday: this.birthday,
                birthplace: this.birthplace,
                gender: this.gender,
                tin_no: this.tin_number,
                civil_status: this.civil_status,
                contact_no: this.contact_number,
                address: {
                    street: this.address_street,
                    barangay: this.address_barangay,
                    city: this.address_city,
                    province: this.address_province
                },
                monthly_income: this.monthly_income,
                occupation: this.occupation,
                spouse: {
                    name: {
                        given: this.spouse_first_name,
                        middle: this.spouse_middle_name,
                        last: this.spouse_last_name
                    },
                    contact_no: this.spouse_contact_number,
                    birthplace: this.spouse_birthplace,
                    birthday: this.spouse_birthday
                }
            }
        }
    }
}
</script>

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

.formDiv {
}

.header {
    /* border: 1px solid black; */
    background-color: var(--vt-c-white-off);
    width: 100%;
    padding-bottom: 3%;
    padding-left: 2%;
    padding-right: 1%;
    padding-top: 1%;

    position: sticky;
    top: 0;
    z-index: 1000;

    font-size: 1.5rem;
    font-weight: bold;

    text-align: center;
    margin-bottom: 3%;
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
    padding: 2%;
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
