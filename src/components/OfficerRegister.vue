<script setup>
// Import packages
import { ref } from 'vue'

// Import components
import CloseButton from '../components/CloseButton.vue'

// Import constants
import { API_URL } from '../constants'

// Props
defineProps({
    togglePopup: Function
})

// Define refs
const given_name = ref('')
const last_name = ref('')
const username = ref('')
const password = ref('')
const form = ref(null)
const errorMessage = ref('')

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
            name: {
                given: given_name.value,
                last: last_name.value
            }
        })
    }).then((res) => res.json())

    // If UUID is not returned, show error message
    if (!uuid) {
        errorMessage.value = message
        return
    }

    errorMessage.value = ''
    // Reset form
    form.value.reset()
}
</script>

<template>
    <div class="bg">
        <div class="wrapper">
            <div class="header">
                <CloseButton @click="() => togglePopup('createOfficerProfile')" />
                <div class="header-text">Register Officer</div>
            </div>
            <div class="infoFields">
                <div class="login">
                    <VForm id="login-form" ref="form">
                        <!-- TODO: Create proper fields -->
                        <VTextField
                            class="username-pw-input"
                            v-model="given_name"
                            id="login-pw"
                            label="Given Name"
                            required
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="last_name"
                            id="login-pw"
                            label="Last Name"
                            required
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="username"
                            id="login-username"
                            label="Username"
                            required
                        />
                        <VTextField
                            class="username-pw-input"
                            v-model="password"
                            id="login-pw"
                            label="Password"
                            required
                        />

                        <!-- <div class="rememberMe">
                            <label><input type="checkbox" id="login-rememberMe" />Remember Me </label>
                            </div> -->

                        <VAlert v-if="errorMessage" type="error" variant="tonal" closable="">
                            {{ errorMessage }}
                        </VAlert>
                        <div class="btnWrapper">
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

    width: 30%;

    /* display: flex;
    justify-content: center; */
    overflow: auto;

    display: flex;
    flex-direction: column;
}

.login {
    /* border: 1px solid black; */
}

.header {
    background-color: var(--vt-c-white-off);
    width: 100%;
    padding-bottom: 3%;
    padding-left: 2%;
    padding-right: 2%;
    padding-top: 1%;

    position: sticky;
    top: 0;
    z-index: 1000;

    font-size: 1.5rem;
    font-weight: bold;

    text-align: center;
    margin-bottom: 3%;
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

.btnWrapper {
    display: flex;
    justify-content: flex-end;
}
</style>
