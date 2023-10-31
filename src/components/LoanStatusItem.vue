<script setup>
// TODO: Create proper vars
defineProps({
    givenName: String,
    lastName: String,
    username: String
});
</script>

<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <v-card class="officer-profile-btn w-100 d-flex align-center rounded-lg elevation-2 pa-2 mb-3" v-bind="props"
                :color="isHovering ? 'rgba(239, 239, 239, 20)' : 'rgba(239, 239, 239, 0.525)'">

                <!-- Information -->
                <div class="d-flex flex-row">
                    <h2 class="ml-2">Type of Loan</h2>
                    <div class="memberdiv mt-2 ml-5">Amount of Loan</div>
                    <div class="memberdiv mt-2 ml-5">Loanee</div>
                </div>

                <!-- Actions -->

                <div class="officer-actions-box ml-auto d-flex">
                    <!-- Reject Loan -->
                    <v-btn 
                        icon="mdi-check-bold" 
                        variant="plain"
                        color="green">
                    </v-btn>

                    <!-- Approve Loan -->
                    <v-btn 
                        icon="mdi-close-thick" 
                        variant="plain"
                        color="red">
                    </v-btn>
                    
                </div>
            </v-card>
        </template>
    </v-hover>
</template>

<style>
.form-wrapper {
    background-color: var(--vt-c-white-off);
}

.memberdiv {
    margin-top: -7px;
    padding: 0;
}

.officer-profile-btn {
    background-color: rgba(239, 239, 239, 0.525);
    /* border: 1px solid black */
}

.officer-icon-box {
    min-width: 5.5rem;
}

.officer-icon {
    font-size: 4rem;
}

.officer-actions-box {
    gap: 0.5rem;
}

.officer-action-icon {
    font-size: 2rem;
}

.officer-action-icon:hover {
    opacity: 0.65;
}
</style>