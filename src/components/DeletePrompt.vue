<script setup>

// Import packages
import { ref } from 'vue'

// Import constants
import { API_URL } from '../constants'

// TODO: add visible error messages
const errorMessage = ref('')
const errorAlert = ref(false)

const props = defineProps({
    profileType: {
        type: String,
        // TODO: change default factory to required: true once deletion is implemented for officers
        default: () => 'Member',
        validator: (value) => {
            return ['Member', 'Officer'].includes(value)
        }
    },
    name: {
        type: String,
        // TODO: change default factory to required: true once deletion is implemented for officers
        default: () => ''
    },

    // unique identifier for profile to be deleted 
    identifier: {
        type: String,
        // TODO: change default factory to required: true once deletion is implemented for officers
        default: () => ''
    },

    onsubmit: {
        type: String,
        // TODO: change default factory to required: true once deletion is implemented for officers
        default: () => (() => null)
    }
})


const deleteProfile = async function () {
    if (props.profileType === 'Member') {
        await deleteMember()
    } else {
        await deleteOfficer()
    }
}

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
    console.log('delete officer')
}

</script>

<template>
    <div class="wrapper">
        <div class="header">
            <!-- TODO:  Change 'profileType' to either 'Member' or 'Officer', then add name of profile afterwards in 'name'-->
            <div class="header-text">Are you sure you want to delete this {{ profileType }} Profile {{ name }}?</div>
        </div>

        <div class="btn-wrapper">
            <VBtn type="submit" class="btn capitalize-text" @click.prevent="deleteProfile">
                Delete Officer Profile
            </VBtn>
        </div>
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