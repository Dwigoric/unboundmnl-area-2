<script setup>
// Import packages
import { ref } from 'vue'

// Import constants
import { API_URL } from '../constants'

// Define refs
const given_name = ref('')
const last_name = ref('')
const role = ref('')
const username = ref('')
const password = ref('')
const form = ref(null)
const errorMessage = ref('')
const errorAlert = ref(false)

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

    // Reset form
    form.value.reset()
}
</script>

<template>
    <div class="wrapper">
        <div class="header">
            <div class="header-text">Register Officer</div>
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
                            id="login-pw"
                            label="Enter Last Name"
                            required
                        />
                    </div>

                    <div class="row-tab">
                        <div class="label">
                            <div>* Role:</div>
                        </div>
                        <VTextField
                            class="username-pw-input"
                            v-model="role"
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
                            v-model="username"
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
                            v-model="password"
                            id="login-pw"
                            label="Enter Password"
                            required
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
                        >
                            Register Officer
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
