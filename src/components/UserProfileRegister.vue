<script setup>
import CloseButton from '../components/CloseButton.vue'
</script>

<template>
    <div class="bg">
        <div class="wrapper">
            <div class="header">
                <div class="header-text">
                    <CloseButton @click="() => togglePopup('createMemberProfile')" />
                    Create a Member Profile
                </div>
            </div>
            <div class="infoFields">
                <div class="formDiv">
                    <VForm id="login-form" ref="form">
                        <div class="header2">Borrower's Information</div>
                        <VTextField
                            class="username-pw-input"
                            v-model="username"
                            id="login-username"
                            :rules="[rules.required]"
                            label="Username"
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="first_name"
                            id="login-first-name"
                            :rules="[rules.required]"
                            label="First Name"
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="middle_name"
                            id="login-middle-name"
                            label="Middle Name"
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="last_name"
                            id="login-last-name"
                            :rules="[rules.required]"
                            label="Last Name"
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="birthday"
                            id="login-birthday"
                            type="date"
                            :rules="[rules.required]"
                            label="Date of Birth"
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="birthplace"
                            id="login-birthplace"
                            :rules="[rules.required]"
                            label="Place of Birth"
                        />
                        <VSelect
                            class="username-pw-input"
                            v-model="gender"
                            :items="['M', 'F']"
                            id="login-gender"
                            :rules="[rules.required]"
                            label="Gender"
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="tin_number"
                            id="login-tin-number"
                            :rules="[rules.required]"
                            label="TIN Number"
                        />
                        <VSelect
                            class="username-pw-input"
                            v-model="civil_status"
                            :items="['Single', 'Married']"
                            id="login-civil-status"
                            :rules="[rules.required]"
                            label="Civil Status"
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="contact_number"
                            id="login-contact-number"
                            :rules="[rules.required]"
                            label="Contact Number"
                        />

                        <!-- TODO: Spread the address out more, like in the notes -->
                        <VTextField
                            class="username-pw-input"
                            v-model="address_street"
                            id="login-address"
                            :rules="[rules.required]"
                            label="Residence Address: Street"
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="address_barangay"
                            id="login-address"
                            :rules="[rules.required]"
                            label="Residence Address: Barangay"
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="address_city"
                            id="login-address"
                            :rules="[rules.required]"
                            label="Residence Address: City"
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="address_province"
                            id="login-address"
                            :rules="[rules.required]"
                            label="Residence Address: Province"
                        />
                        
                        <VTextField
                            class="username-pw-input"
                            v-model="monthly_income"
                            id="login-monthly-income"
                            type="number"
                            :rules="[rules.required]"
                            label="Monthly Income"
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="occupation"
                            id="login-occupation"
                            :rules="[rules.required]"
                            label="Occupation/Source of Income"
                        />

                        <div class="header2">Spouse's Information</div>
                        <VTextField class="username-pw-input" v-model="spouse_first_name" id="login-spouse-first-name" :rules="[rules.required]" label="Spouse's First Name" />
                        <VTextField class="username-pw-input" v-model="spouse_middle_name" id="login-spouse-middle-name" label="Spouse's Middle Name" />
                        <VTextField class="username-pw-input" v-model="spouse_last_name" id="login-spouse-last-name" :rules="[rules.required]" label="Spouse's Last Name" />
                        <VTextField class="username-pw-input" v-model="spouse_birthday" id="login-spouse-birthday" :rules="[rules.required]" type="date" label="Spouse's Date of Birth" />
                        <VTextField class="username-pw-input" v-model="spouse_birthplace" id="login-spouse-birthplace" :rules="[rules.required]" label="Spouse's Place of Birth" />
                        <VTextField class="username-pw-input" v-model="spouse_contact_number" id="login-spouse-contact-number" :rules="[rules.required]" label="Spouse's Contact Number" />

                        <VAlert v-if="errorMessage" type="error" variant="tonal" closable="">
                            {{ errorMessage }}
                        </VAlert>
                        <div class="btnWrapper">
                            <VBtn
                                type="submit"
                                class="btn capitalize-text"
                                @click.prevent="registerUser"
                            >
                                Create User Profile
                            </VBtn>
                        </div>
                    </VForm>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { API_URL } from '../constants'

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
            rules: { required: (v) => !!v || 'This field is required' },
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
            const validationResult = await this.$refs.form.validate()
            if (validationResult.valid) {
                const result = await fetch(API_URL + '/users/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.preprocessData())
                })

                this.errorMessage = ''

                if (result.status === 200) {
                    this.$refs.form.reset()
                } else if (result.status === 400) {
                    const jsonRes = await result.json()
                    this.errorMessage = jsonRes.message
                } else if (result.status === 500) {
                    this.errorMessage = 'Internal Server Error'
                }
            }
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

.infoFields {
    padding: 3%;
    padding-top: 0%;
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

.btnWrapper {
    height: min-content;
    display: flex;
    justify-content: flex-end;
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
