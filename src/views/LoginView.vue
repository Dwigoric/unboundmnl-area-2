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

<!-- TODO: Create Login Page -->

<template>
    <div class="wrapper">
        <div class="login">
            <div class="header">Log In</div>
            <VForm id="login-form" ref="form">
                <VTextField
                    v-model="username"
                    id="login-username"
                    class="username-pw-input"
                    label="Username"
                    required
                />
                <VTextField
                    v-model="password"
                    id="login-pw"
                    class="username-pw-input"
                    label="Password"
                    required
                />

                <!--<div class="rememberMe">-->
                <!--    <label><input type="checkbox" id="login-rememberMe" />Remember Me </label>-->
                <!--</div>-->

                <VBtn type="submit" class="btn" @click.prevent="logIn">Log In</VBtn>
                <div v-if="errorMessage" class="error" id="login-error">{{ errorMessage }}</div>
            </VForm>
        </div>
    </div>
</template>
