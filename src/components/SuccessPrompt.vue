<script setup>

import { defineProps, defineEmits } from 'vue'

const { isActive } = defineProps(['isActive'])

const emit = defineEmits()

function handleButtonClick() {
    emit('button-clicked', true)
}

</script>

<template>
    <div v-if="isActive == true" class="center-container">
        <div class="prompt-wrapper">
            <v-banner lines="one" icon="mdi-check" color="success" elevation="5" class="rounded-lg mt-2">
                <v-banner-text>
                    Banner with one line of text.
                </v-banner-text>

                <template v-slot:actions>
                    <v-btn prepend-icon="mdi-check" @click="handleButtonClick">
                        Ok
                    </v-btn>
                </template>
            </v-banner>
        </div>
    </div>
</template>

<style scoped>
.center-container {
    display: flex;
    justify-content: center;
    width: 100vw;
    /* Optional: Set a specific height to center vertically */
}

.prompt-wrapper {
    position: absolute;
    z-index: 9999;
    /* Optionally, add other styling properties as needed */
}
</style>


