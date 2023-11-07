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
    <v-card class="mx-auto pa-5">
        <v-layout>
            <v-navigation-drawer
                :width="300"
                :margin="20"
                class="navigation-drawer pa-md-4"
                theme="dark"
                permanent=""
            >
                <div class="navigation-title-box">
                    <h1>CSVMC</h1>
                </div>

                <v-list v-model:opened="open">
                    <v-list-subheader 
                        class="mt-4 mb-n3 ml-n3"
                        >
                        LOANS
                    </v-list-subheader>

                        <v-list-item
                            to="/dashboard"
                            link=""
                            prepend-icon="mdi-home-account"
                            rounded="lg"
                            class="mt-1"
                            >Loan Dashboard</v-list-item
                        >

                        <v-list-item
                            to="/new-loan-application/member-input"
                            link=""
                            prepend-icon="mdi-file-document-edit-outline"
                            rounded="lg"
                            class="mt-1"
                            >New Loan Application</v-list-item
                        >

                        <v-list-item
                            to="/loan-status"
                            link=""
                            prepend-icon="mdi-home-account"
                            rounded="lg"
                            class="mt-1"
                            >Loan Status</v-list-item
                        >

                    <v-list-subheader
                        class="mt-4 mb-n3 ml-n3">
                        SHARED CAPITAL
                    </v-list-subheader>

                        <v-list-item
                            to="/cap-dashboard"
                            link=""
                            prepend-icon="mdi-home-account"
                            rounded="lg"
                            class="mt-1"
                            >Shared Capital Dashboard</v-list-item
                        >

                        <v-list-item
                            to="/new-deposit"
                            link=""
                            prepend-icon="mdi-file-document-edit-outline"
                            rounded="lg"
                            class="mt-1"
                            >Enter deposit</v-list-item
                        >

                    <v-list-subheader
                            class="mt-4 mb-n3 ml-n3">
                            PROFILES
                    </v-list-subheader>

                        <v-list-item
                            to="/officer-profiles"
                            link=""
                            prepend-icon="mdi-account-box"
                            rounded="lg"
                            class="mt-1"
                            >Officer Profiles</v-list-item
                        >

                        <v-list-item
                            to="/member-profiles"
                            link=""
                            prepend-icon="mdi-magnify"
                            rounded="lg"
                            class="mt-1"
                            >Member Profiles</v-list-item
                        >
                </v-list>

                <template v-slot:append>
                    <div class="pa-3">
                        <v-btn class="logout-btn" block="" @click.prevent="logout"> Logout </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
            <v-main style="height: 94vh"></v-main>
        </v-layout>
    </v-card>
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
