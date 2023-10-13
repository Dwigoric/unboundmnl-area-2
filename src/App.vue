<script setup>
// Import packages
import { inject } from 'vue'
import { RouterView } from 'vue-router'
import jwt_decode from 'jwt-decode'

// Import router
import router from './router'

// Import stores
import { useCurrentUserStore } from './stores/currentUser'

// Define stores
const currentUserStore = useCurrentUserStore()

// Cookies
const $cookies = inject('$cookies')
const credentials = $cookies.get('credentials')
if (credentials) {
    // Decode the token
    const { uuid, role } = jwt_decode(credentials.token)
    currentUserStore.id = uuid
    currentUserStore.role = role

    // Redirect to dashboard
    router.replace({ name: 'Dashboard' })
}
</script>

<template>
    <RouterView />
</template>
