<script setup>
// Import vue components
import { ref } from 'vue'
import router from '../router'

// Import constants
import { API_URL } from '../constants'

// Define refs
const username = ref('')
const password = ref('')
const form = ref(null)
const errorMessage = ref('')

// Define methods
const logIn = async () => {
    const formData = new FormData(form.value)

    // TODO: Finalize login endpoint
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: formData
    })

    // TODO: Finalize response format
    const data = await response.json()
    if (data.success) {
        await router.push('/dashboard')
    } else {
        errorMessage.value = data.message
    }
}
</script>

<template>
    <div class="bg">
        <div class="wrapper">
            <div class="login">
                <div class="header">Caluag St. Vincent</div>
                <VForm id="login-form" ref="form">
                    <VTextField class="username-pw-input" v-model="username" id="login-username" label="Username"
                        required />
                    <VTextField class="username-pw-input" v-model="password" id="login-pw" label="Password" required />


                    <!-- <div class="rememberMe">
                    <label><input type="checkbox" id="login-rememberMe" />Remember Me </label>
                    </div> -->

                    <VBtn type="submit" class="btn capitalize-text" @click.prevent="logIn">Log In</VBtn>
                    <!-- <RouterLink to="/officerRegister" VBtn type="submit" class="btn capitalize-text">Officer Register</RouterLink>
                    <RouterLink to="/userProfileRegister" VBtn type="submit" class="btn capitalize-text">User Profile Register</RouterLink> -->
                    <div v-if="errorMessage" class="error" id="login-error">asd</div>
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

.capitalize-text {
    text-transform: capitalize;
}

.btn:hover {
    background: var(--vt-c-blue-dark);
}

.rememberMe {
    font-size: .9em;
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
    font-size: .9em;
    text-align: center;
    color: red;
    font-weight: 400;
    margin: 25px 1 10px;
    justify-content: center;
}
</style>




