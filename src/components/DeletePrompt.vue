<script setup>
// Import packages
import { ref } from 'vue'

// Import constants
import { API_URL } from '../constants'

// Define reactive variables
const errorMessage = ref('')
const errorAlert = ref(false)

// Props
const props = defineProps({
    profileType: {
        type: String,
        required: true,
        validator: (value) => {
            return ['Member', 'Officer'].includes(value)
        }
    },
    name: {
        type: String,
        required: true
    },
    // unique identifier for profile to be deleted
    identifier: {
        type: String,
        required: true
    },
    onsubmit: {
        type: Function,
        default: () => () => null
    }
})

// Define methods
const deleteMember = async function () {
    const result = await fetch(API_URL + '/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: props.identifier })
    })

    errorMessage.value = ''

    if (result.status === 200) {
        props.onsubmit()
    } else if (result.status === 400) {
        const jsonRes = await result.json()
        errorMessage.value = jsonRes.message
        errorAlert.value = true
    } else if (result.status === 500) {
        errorMessage.value = 'Internal Server Error'
        errorAlert.value = true
    }
}

const deleteOfficer = async function () {
    console.log('hello')

    // Retrieve token from cookies
    const credentials = window.$cookies.get('credentials')
    if (!credentials) return
    const { token } = credentials

    const result = await fetch(`${API_URL}/officers/${props.identifier}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    })

    errorMessage.value = ''

    if (result.status === 200) {
        props.onsubmit()
    } else if (result.status === 400) {
        const jsonRes = await result.json()
        errorMessage.value = jsonRes.message
        errorAlert.value = true
    } else if (result.status === 500) {
        errorMessage.value = 'Internal Server Error'
        errorAlert.value = true
    }
}
</script>

<template>
    <div class="wrapper">
        <div class="header">
            <div class="header-text ">
                Are you sure you want to delete this {{ profileType }} Profile {{ name }}?
            </div>
        </div>

        <div class="btn-wrapper">
            <VBtn
                type="submit"
                class="btn capitalize-text"
                @click.prevent="
                    () => (profileType === 'Officer' ? deleteOfficer() : deleteMember())
                "
            >
                Delete {{ profileType }} Profile
            </VBtn>
        </div>

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
</template>

<style scoped>
.wrapper {
    padding: 6%;
    background-color: var(--vt-c-white);
}

.header {
    margin-bottom: 7%;
}

.btn {
    font-weight: 600;
    color: var(--vt-c-white-off);
    background: var(--vt-c-red);

    border-radius: 5px;
    text-transform: capitalize;
}

.btn:hover {
    background: var(--vt-c-red);
}

.btn-wrapper {
    margin-top: 2%;
    display: flex;
    justify-content: flex-end;
}
</style>
