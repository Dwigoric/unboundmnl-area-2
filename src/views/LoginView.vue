<script setup>
// Import packages
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import jwt_decode from 'jwt-decode'

// Import vue components
import router from '../router'

// Import constants
import { API_URL } from '../constants'

// Import stores
import { useCurrentUserStore } from '../stores/currentUser'

// Define stores
const currentUserStore = storeToRefs(useCurrentUserStore())

// Define refs
const username = ref('')
const password = ref('')
const form = ref(null)
const errorMessage = ref('')
const remember = ref(false)

// Define methods
const logIn = async () => {
    const { token, name, message } = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    }).then((res) => res.json())

    if (!token) {
        errorMessage.value = message
        return
    }

    // If name exists, it means that the user is an officer
    if (name) {
        // Store name to currentUserStore
        currentUserStore.name.given = name.given
        currentUserStore.name.middle = name.middle
        currentUserStore.name.last = name.last
    }

    // Decode token
    const { uuid, role } = jwt_decode(token)
    currentUserStore.id = uuid
    currentUserStore.role = role

    // TODO: Use refresh token instead of storing token itself in cookies
    // Set cookie
    window.$cookies.set(
        'credentials',
        { token, persist: remember.value },
        remember.value ? '30d' : 0
    )

    // TODO: Redirect admin to admin dashboard?
    // Redirect to dashboard
    return router.replace({ name: 'Dashboard' })
}
</script>

<template>
    <div class="bg">
        <div class="wrapper">
            <div class="login">
                <div class="header">CSVMC</div>
                <VForm id="login-form" ref="form">
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

                    <div class="rememberMe">
                        <VCheckbox id="checkbox" v-model="remember" label="Remember Me" />
                    </div>

                    <VBtn type="submit" class="btn capitalize-text" @click.prevent="logIn">
                        Log In
                    </VBtn>

                    <div v-if="errorMessage" class="error" id="login-error"></div>
                </VForm>
            </div>
        </div>
    </div>
</template>

<!-- Stylesheet -->
<style scoped>
.bg {
    height: 100vh;
    width: 100vw;
    background-image: url('../assets/bg.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-color: var(--vt-c-blue-very-dark);
    overflow: hidden;

    display: flex;
    justify-content: center; /* Horizontal centering */
    align-items: center;
}

.wrapper {
    min-width: 20vw;
    min-height: 50vh;

    background: var(--vt-c-white);
    border-radius: 5px;

    display: flex;
    justify-content: center;
    overflow: auto;
}

.login {
    width: 15vw;
    min-width: 10vw;
    height: 40vh;
    margin: auto;
    /* border: 1px solid black; */
}

.header {
    font-size: 1.5rem;
    font-weight: bold;

    color: var(--vt-c-black);
    text-align: center;
    margin-bottom: 20%;
}

.username-pw-input {
    position: relative;
    width: 100%;
}

.btn {
    width: 100%;
    padding: 2%;

    color: var(--vt-c-white-off);
    font-weight: 600;
    background: var(--vt-c-blue);

    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20%;
    margin-bottom: 5%;
}

.checkbox-label {
    margin-left: 2%;
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
