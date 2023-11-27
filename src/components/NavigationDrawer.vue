<script setup>

import { ref } from 'vue'

// Import packages
import { storeToRefs } from 'pinia'

// Import router
import router from '../router'

// Import stores
import { useCurrentUserStore } from '../stores/currentUser'

// Define stores
const currentUserStore = storeToRefs(useCurrentUserStore())

// Reactive Variables
const rail = ref(false)


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
    <v-layout>
        <v-navigation-drawer
            :width="300"
            :margin="20"
            class="navigation-drawer pa-md-4"
            theme="dark"
            :rail="rail"
            @click="rail = false"
            rail-width="90"
        >   

            <div v-if="rail == false" class="navigation-title-box">
                <svg width="260" height="80" xmlns="http://www.w3.org/2000/svg">
                    <image href="../assets/logo-full.svg" width="250" height="100" />
                </svg>
            </div>

            <div v-if="rail == true" class="navigation-title-box">
                <svg width="50" height="80" xmlns="http://www.w3.org/2000/svg">
                    <image href="../assets/logo.svg" width="45" height="100" />
                </svg>
            </div>

            
            <v-list density="compact">
                <v-list-subheader v-if="rail == false"
                    class="mt-4 mb-n3 ml-n3"
                    title="LOANS">
                </v-list-subheader>

                <v-list-item
                    to="/dashboard"
                    link=""
                    prepend-icon="mdi-bank-transfer-out"
                    rounded="lg"
                    class="mt-1"
                    title="Loan Dashboard"
                    >
                </v-list-item>

                <v-list-item
                    to="/new-loan-application"
                    link=""
                    prepend-icon="mdi-file-sign"
                    rounded="lg"
                    class="mt-1"
                    title="New Loan Application"
                    >
                </v-list-item>

                <v-list-item
                    to="/loan-status"
                    link=""
                    prepend-icon="mdi-list-status"
                    rounded="lg"
                    class="mt-1"
                    title="Pending Loans"
                    >
                </v-list-item>

                <v-list-subheader v-if="rail == false"
                    class="mt-4 mb-n3 ml-n3"
                    title="DEPOSITS">  
                </v-list-subheader>

                <v-list-item
                    to="/deposit-dashboard"
                    link=""
                    prepend-icon="mdi-bank-transfer-in"
                    rounded="lg"
                    class="mt-1"
                    title="Deposit Dashboard"
                    >
                </v-list-item>

                <v-list-item
                    to="/enter-deposit"
                    link=""
                    prepend-icon="mdi-wallet-plus"
                    rounded="lg"
                    class="mt-1"
                    title="Enter Deposit"
                    >
                </v-list-item>

                <v-list-subheader v-if="rail == false"
                    class="mt-4 mb-n3 ml-n3"
                    title="PROFILES">
                </v-list-subheader>

                <v-list-item
                    to="/officer-profiles"
                    link=""
                    prepend-icon="mdi-account-box"
                    rounded="lg"
                    class="mt-1"
                    title="Officer Profiles"
                    >
                </v-list-item>

                <v-list-item
                    to="/member-profiles"
                    link=""
                    prepend-icon="mdi-account-supervisor-circle"
                    rounded="lg"
                    class="mt-1"
                    title="Member Profiles"
                    >
                </v-list-item>

                <v-list-subheader v-if="rail == false"
                    class="mt-4 mb-n3 ml-n3"
                    title="SETTINGS">
                </v-list-subheader>

                <v-list-item
                    to="/settings/loans-and-deposits"
                    link=""
                    prepend-icon="mdi-table-cog"
                    rounded="lg"
                    class="mt-1"
                    title="Loans & Deposits"
                    >
                </v-list-item>

                <v-list-item
                    to="/settings/notification"
                    link=""
                    prepend-icon="mdi-bell-cog"
                    rounded="lg"
                    class="mt-1"
                    title="Notifications"
                    >
                </v-list-item>

                <v-list-item
                    to="/settings/admin"
                    link=""
                    prepend-icon="mdi-account-cog"
                    rounded="lg"
                    class="mt-1"
                    title="Admin"
                    >
                </v-list-item>
            </v-list>

            <template #append>
                <div class="d-flex flex-column w-100" v-if="rail == false">
                    <div class="" >
                        <div class="d-flex justify-end">
                            <v-btn
                                variant="text"
                                icon="mdi-chevron-left"
                                @click.stop="rail = !rail"
                            ></v-btn>
                        </div>
    
                        <v-btn 
                            class="logout-btn w-100" 
                            @click.prevent="logout"
                            > Logout 
                        </v-btn>
                    </div>
                </div>

                <v-slot v-if="rail == true">
                    <v-btn
                    variant="text"
                    icon="mdi-chevron-right"
                    @click.stop="rail = !rail"
                    ></v-btn>
                </v-slot>
            </template>

        </v-navigation-drawer>
        <v-main style="height: 94vh"></v-main>
    </v-layout>
</template>

<style scoped>
.navigation-drawer {
    background: var(--vt-c-blue-med-dark);
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
