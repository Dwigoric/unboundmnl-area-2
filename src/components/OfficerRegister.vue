<script setup>
// Import packages
import { ref } from 'vue'

// Import constants
import { API_URL } from '../constants'

// Define constants
const validationRules = {
    required: (v) => !!v || 'Required',
    min6: (v) => (v && v.length >= 6) || 'Minimum of 6 characters',
    min8: (v) => (v && v.length >= 8) || 'Minimum of 8 characters',
    max20: (v) => (v && v.length <= 20) || 'Maximum of 20 characters',
    max255: (v) => (v && v.length <= 255) || 'Maximum of 255 characters',
    username: (v) =>
        (v && /^[a-zA-Z0-9_]+$/.test(v)) || 'Username can only be alphanumeric and underscore',
    password: (v) =>
        (v && !/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(v)) ||
        'Password must contain at least one uppercase, one lowercase, one number and one special character'
}

// Define refs
const given_name = ref('')
const last_name = ref('')
const role = ref(null)
const username = ref('')
const password = ref('')
const form = ref(null)
const errorMessage = ref('')
const errorAlert = ref(false)
const submitBtnLoading = ref(false)
const showPassword = ref(false)

// Props
const props = defineProps({
    addToOfficers: {
        type: Function,
        required: true
    },
    closeDialog: {
        type: Function,
        required: true
    }
})

// Define methods
const createOfficer = async () => {
    // Validate form
    const { valid } = await form.value.validate()
    if (!valid) return

    // TODO: Implement token refresh
    const credentials = window.$cookies.get('credentials')
    if (!credentials) return

    // Set submit button to loading
    submitBtnLoading.value = true

    // Send request
    const { uuid, message } = await fetch(`${API_URL}/auth/register-officer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.token}`
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            role: role.value,
            name: {
                given: given_name.value,
                last: last_name.value
            }
        })
    }).then((res) => res.json())

    // If UUID is not returned, show error message
    if (!uuid) {
        errorMessage.value = message
        errorAlert.value = true
        submitBtnLoading.value = false
        return
    }

    errorMessage.value = ''
    errorAlert.value = false

    // Add to officers
    props.addToOfficers({
        uuid,
        username: username.value,
        role: role.value,
        name: {
            given: given_name.value,
            last: last_name.value
        }
    })

    // Close dialog
    props.closeDialog()

    // Set submit button to not loading
    submitBtnLoading.value = false

    // Reset form
    form.value.reset()
}
</script>

<!-- TODO: Fields should have proper data when it is UPDATE -->
<template>
    <div class="wrapper">
        <div class="header">
            <!-- TODO: Have officerAction input Update/Register -->
            <div class="header-text">{{ officerAction }} Officer</div>
        </div>

        <div class="info-fields-wrapper">
            <div class="login">
                <VForm id="login-form" ref="form">
                    <!-- Username -->
                    <div class="row-tab">
                        <div class="label">
                            <div>* Given Name:</div>
                        </div>

                        <VTextField
                            class="username-pw-input"
                            v-model="given_name"
                            :rules="[validationRules.required]"
                            id="login-pw"
                            label="Enter Given Name"
                            required
                        />
                    </div>

                    <div class="row-tab">
                        <div class="label">
                            <div>* Last Name:</div>
                        </div>

                        <VTextField
                            class="username-pw-input"
                            v-model="last_name"
                            :rules="[validationRules.required]"
                            id="login-pw"
                            label="Enter Last Name"
                            required
                        />
                    </div>

                    <div class="row-tab">
                        <div class="label">
                            <div>* Role:</div>
                        </div>
                        <VSelect
                            class="username-pw-input"
                            v-model="role"
                            :rules="[validationRules.required]"
                            :items="[
                                { name: 'Manager', value: 'manager' },
                                { name: 'Treasurer', value: 'treasurer' },
                                { name: 'Credit Committee', value: 'credit committee' }
                            ]"
                            item-title="name"
                            item-value="value"
                            id="login-pw"
                            label="Enter Role"
                            required
                        />
                    </div>

                    <div class="row-tab">
                        <div class="label">
                            <div>* Username:</div>
                        </div>

                        <VTextField
                            class="username-pw-input"
                            name="username"
                            v-model="username"
                            :rules="[
                                validationRules.required,
                                validationRules.min6,
                                validationRules.max20,
                                validationRules.username
                            ]"
                            id="login-username"
                            label="Enter Username"
                            required
                        />
                    </div>

                    <div class="row-tab">
                        <div class="label">
                            <div>* Password:</div>
                        </div>

                        <VTextField
                            class="username-pw-input"
                            name="password"
                            v-model="password"
                            :rules="[
                                validationRules.required,
                                validationRules.min8,
                                validationRules.max255,
                                validationRules.password
                            ]"
                            id="login-pw"
                            label="Enter Password"
                            required
                            :type="showPassword ? 'text' : 'password'"
                            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append-inner="showPassword = !showPassword"
                        />
                    </div>

                    <!-- <div class="rememberMe">
                            <label><input type="checkbox" id="login-rememberMe" />Remember Me </label>
                            </div> -->

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
                        <VBtn
                            type="submit"
                            class="btn capitalize-text"
                            @click.prevent="createOfficer"
                            :loading="submitBtnLoading"
                        >
                            <!-- TODO: Have officerAction input Update/Register -->
                            {{ officerAction }} Create Profile
                        </VBtn>
                    </div>
                </VForm>
            </div>
        </div>
    </div>
</template>

<!-- Stylesheet -->
<style scoped>
.wrapper {
    background: var(--vt-c-white);
    overflow: auto;

    display: flex;
    flex-direction: column;
}

.login {
    /* border: 1px solid black; */
}

.header {
    background-color: var(--vt-c-white-off);
    font-size: 1.5rem;
    font-weight: bold;

    text-align: center;
    margin-bottom: 3%;
}

.header-text {
    margin-bottom: 3%;
}

.info-fields-wrapper {
    padding: 3%;
    padding-top: 0%;
    /* border: 1px solid black; */
}

.row-tab {
    /* border: 1px solid black; */
    display: flex;
    margin-bottom: 1%;
    margin-left: 3%;
    margin-right: 3%;
}

.label {
    margin-top: 15px;
    margin-right: 2%;
    /* border: 1px solid black; */
    width: 20%;

    display: inline-block;
    text-align: right;
    vertical-align: top;
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

.btn:hover {
    background: var(--vt-c-blue-dark);
}

.btn-wrapper {
    margin-top: 2%;
    display: flex;
    justify-content: flex-end;
}
</style>
