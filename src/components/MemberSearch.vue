<script setup>
// Import packages
import { ref } from 'vue'

// Import router
import router from '../router'

// Import components
import MemberProfileRegister from '../components/MemberProfileRegister.vue'

// Import constants
import { API_URL } from '../constants'

// Import stores
import { useMemberSearchStore } from '../stores/memberSearch'
const memberSearchStore = useMemberSearchStore()

// Props
const props = defineProps({
    to: {
        type: String,
        required: true
    },
    canCreateNewMember: {
        type: Boolean,
        default: true
    }
})

// Define reactive variables
const searchUsername = ref(null)
const errorAlert = ref(false)
const errorMessage = ref('')

// Define methods
const getUserData = async () => {
    if (!searchUsername.value) {
        errorAlert.value = true
        errorMessage.value = 'Please enter a username'
        return
    }

    const credentials = window.$cookies.get('credentials')

    if (!credentials) {
        errorAlert.value = true
        errorMessage.value = 'Please log in as officer to continue'
        return
    }

    const { token } = credentials

    if (!token) {
        errorAlert.value = true
        errorMessage.value = 'Please log in as officer to continue'
        return
    }

    const params = new URLSearchParams()
    params.set('access_token', token)
    params.set('username', searchUsername.value)
    const loanees = await fetch(`${API_URL}/users/search?${params}`).then((res) => res.json())

    if (!loanees.length || loanees[0].username !== searchUsername.value) {
        errorAlert.value = true
        errorMessage.value = 'No user found with that username'
    } else {
        errorAlert.value = false
        errorMessage.value = ''
        console.log(loanees[0])
        memberSearchStore.setData(loanees[0])
    }
}

const sendToNext = async () => {
    await getUserData()

    if (errorAlert.value) return

    router.push({ name: props.to })
}
</script>

<template>
    <div class="wrapper">
        <VForm>
            <div class="header2">Search Existing Member or Create Member Profile</div>

            <!-- Search bar -->
            <div class="search-wrapper">
                <v-text-field
                    v-model="searchUsername"
                    prepend-inner-icon="mdi-magnify"
                    label="Search Member by Username"
                    clearable=""
                    hide-details
                />
                <VAlert
                    v-if="errorAlert"
                    v-model="errorAlert"
                    type="error"
                    closable=""
                    density="comfortable"
                    elevation="5"
                >
                    {{ errorMessage }}
                </VAlert>
            </div>
            <div class="create-member" v-if="canCreateNewMember">
                <v-dialog width="1200">
                    <template v-slot:activator="{ props }">
                        <!-- Create Member Profile Button -->
                        <v-btn
                            class="capitalize-text mt-2"
                            v-bind="props"
                            variant="plain"
                            text="New Member? Click here to create Member Profile instead"
                            flat=""
                        >
                        </v-btn>
                    </template>

                    <!-- Form popup -->
                    <template v-slot:default="{ isActive }">
                        <v-card close-on-back contained class="form-wrapper">
                            <v-container>
                                <v-row justify="end">
                                    <v-card-actions>
                                        <v-btn
                                            class="ma-2 capitalize-text"
                                            color="var(--vt-c-blue)"
                                            @click="isActive.value = false"
                                            icon="mdi-close"
                                        >
                                        </v-btn>
                                    </v-card-actions>
                                </v-row>
                            </v-container>

                            <MemberProfileRegister />
                        </v-card>
                    </template>
                </v-dialog>
            </div>

            <div class="btn-wrapper">
                <VBtn type="submit" class="btn capitalize-text" @click.prevent="sendToNext">
                    Next
                </VBtn>
            </div>
        </VForm>
    </div>
</template>

<style scoped>
.wrapper {
    padding: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    overflow: auto;
    /* border: 1px solid black; */
}

.header2 {
    font-size: 1.2rem;
    margin-bottom: 3%;
    font-weight: bold;
}

.create-member {
    color: var(--vt-c-blue-dark);
    font-weight: 500;
}

.btn {
    color: var(--vt-c-white-off);
    font-weight: 600;
    background: var(--vt-c-blue);

    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-wrapper {
    height: min-content;
    display: flex;
    justify-content: flex-end;
    margin-top: 2%;
}

.capitalize-text {
    text-transform: capitalize;
}

.btn:hover {
    background: var(--vt-c-blue-dark);
    text-decoration: underline;
}
</style>
