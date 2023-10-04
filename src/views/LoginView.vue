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
            <div class="header">Caluag St. Vincent</div>
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

                
                <!-- <div class="rememberMe">
                   <label><input type="checkbox" id="login-rememberMe" />Remember Me </label>
                </div> -->

                <VBtn type="submit" class="btn capitalize-text" @click.prevent="logIn">Log In</VBtn>
                <div v-if="errorMessage" class="error" id="login-error">{{ errorMessage }}</div>
            </VForm>
        </div>
    </div>
</template>
