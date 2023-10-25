<script setup>
// Import router
import router from '../router'

// Import components
import MemberProfileRegister from '../components/MemberProfileRegister.vue'

// Import stores
import { useApplicationFormStore } from '../stores/applicationForm'
const { setLoaneeId } = useApplicationFormStore() // Use the setLoaneeId method to set the loanee UUID

// Define methods
const sendToAppDetails = () => {
    router.push({ name: 'Application Details' })
}
</script>

<template>
    <div class="wrapper">
        <div class="header2">Search Existing Member or Create Member Profile</div>

        <!-- Search bar -->
        <div class="search-wrapper">
            <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="Search Officer"
                clearable=""
                hide-details
            />
        </div>
        <div class="create-member">
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
            <VBtn type="submit" class="btn capitalize-text" @click.prevent="sendToAppDetails">
                Next
            </VBtn>
        </div>
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
