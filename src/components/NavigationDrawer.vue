<script setup>
// Import packages
import { storeToRefs } from 'pinia'

// Import router
import router from '../router'

// Import stores
import { useCurrentUserStore } from '../stores/currentUser'

// Define stores
const currentUserStore = storeToRefs(useCurrentUserStore())

// Define methods
const logout = () => {
    // Reset currentUserStore
    currentUserStore.id.value = ''
    currentUserStore.role.value = ''
    currentUserStore.name.given = ''
    currentUserStore.name.middle = ''
    currentUserStore.name.last = ''

    // Remove cookie
    window.$cookies.remove('credentials')

    // Redirect to login page
    router.replace({ name: 'Login' })
}
</script>

<template>
    <!-- TODO: Widen width... putangina di ko mahanap -->
    <v-card class="elevation-13 mr-4">
        <v-layout>
            <v-navigation-drawer class="navigation-drawer py-7" theme="dark" permanent>
                <div class="navigation-title-box">
                    <h1>CSVMC</h1>
                </div>

                <v-list>
                    <v-list-item to="/dashboard" link prepend-icon="mdi-home-account"
                        >Home</v-list-item
                    >
                    <v-list-item
                        to="/newLoanApplication"
                        link
                        prepend-icon="mdi-file-document-edit-outline"
                        >Create New Loan Application</v-list-item
                    >
                    <v-list-item to="/officerProfiles" link prepend-icon="mdi-account-box"
                        >Officer Profiles</v-list-item
                    >
                    <v-list-item to="/memberProfiles" link prepend-icon="mdi-magnify"
                        >Member Profiles</v-list-item
                    >
                </v-list>

                <template v-slot:append>
                    <div class="pa-3">
                        <v-btn class="logout-btn" block @click.prevent="logout"> Logout </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
            <v-main style="height: 97vh"></v-main>
        </v-layout>
    </v-card>
</template>

<style scoped>
.navigation-drawer {
    background: var(--vt-c-blue-med-dark);
    width: 3000px;
}

.navigation-title-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logout-btn {
    background-color: var(--vt-c-white);
    color: var(--vt-c-blue-very-dark);
}

.logout-btn:hover {
    background-color: var(--vt-c-white-off);
    color: var(--vt-c-black);
}
</style>
