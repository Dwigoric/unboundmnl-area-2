<script setup>
    defineProps({
        givenName: String,
        lastName: String,
        username: String
    });
</script>

<template>
    <div class="officer-profile-btn w-100 d-flex align-center rounded-lg elevation-2 hover-scale-xs pa-2">
        <!-- Profile Picture -->
        <div class="officer-icon-box">
            <v-icon class="officer-icon w-100" icon="mdi-account-circle"></v-icon>
        </div>

        <!-- Information -->
        <div>
            <h2>{{ lastName }}, {{ givenName }}</h2>
            <p>{{ username }}</p>
        </div>

        <!-- Actions -->
        <div class="officer-actions-box ml-auto d-flex">
            
            <button v-hover="{ hover: true }" v-bind:class="{ 'text-disabled' : hover }" type="button">
                <v-icon  class="officer-action-icon w-100" icon="mdi-square-edit-outline"></v-icon>
            </button>
            <button type="button">
                <v-icon class="officer-action-icon w-100" icon="mdi-trash-can-outline"></v-icon>
            </button>
        </div>
    </div>
</template>

<style>

    .officer-profile-btn {
        background-color: rgba(239, 239, 239, 0.525);
        gap: 1rem;
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