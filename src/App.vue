<script setup>
// Import packages
import { inject } from 'vue'
import { RouterView } from 'vue-router'
import jwt_decode from 'jwt-decode'

// Import stores
import { useCurrentUserStore } from './stores/currentUser'

// Define stores
const currentUserStore = useCurrentUserStore()

// Cookies
const $cookies = inject('$cookies')
const credentials = $cookies.get('credentials')
if (credentials) {
    // Decode the token
    const { uuid } = jwt_decode(credentials.token)
    currentUserStore.id = uuid

    // TODO: Modify for 'remember me' feature
    // Extend the cookie if it is set to persist
    if (credentials.persist) $cookies.set('credentials', credentials, 0)
}
</script>

<template>
    <RouterView />
</template>
