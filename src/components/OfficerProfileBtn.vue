<script setup>
    defineProps({
        givenName: String,
        lastName: String,
        username: String
    });
</script>

<template>
    <div class="officer-profile-btn w-100 d-flex align-center rounded-lg elevation-2 pa-2">
        <!-- Profile Picture -->
        <div class="officer-icon-box">
            <v-icon class="officer-icon w-100" icon="mdi-account-circle"></v-icon>
        </div>

        <!-- Information -->
        <div class="d-flex flex-column">
            <h2 class="sm='0'" >{{ lastName }}, {{ givenName }}</h2>
            <div class="memberdiv">{{ username }}</div>
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