<script setup>
import { ref, reactive } from 'vue'
import { API_URL } from '../constants'
import { DEPOSIT_CATEGORIES } from '../constants/deposit_categories.js'

import { useMemberSearchStore } from '../stores/memberSearch'
const memberSearchStore = useMemberSearchStore()

// Define constants
const rules = {
    required: (v) => !!v || 'This field is required'
}

const formatDate = function (date) {
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    return `${year}-${month}-${day}`
}

const depositData = reactive({
    approvalDate: formatDate(Date.now()),
    category: '',
    originalDepositAmount: '',
    interestRate: ''
})

const form = ref(null)
const disableSubmit = ref(false)
const errorAlert = ref('')
const errorMessage = ref('')
const loading = ref(false)

const depositCategories = reactive(
    Object.keys(DEPOSIT_CATEGORIES).map((key) => {
        return {
            title: DEPOSIT_CATEGORIES[key],
            value: key
        }
    })
)

const submit = async function () {
    const { valid } = await form.value.validate()
    if (!valid) return

    loading.value = true

    const res = await fetch(`${API_URL}/deposits/user/${memberSearchStore.data.username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        },
        body: JSON.stringify({
            ...depositData,
            username: memberSearchStore.data.username
        })
    })

    loading.value = false

    if (res.status === 404) {
        errorAlert.value = true
        errorMessage.value =
            'An error occurred, please go back to member search screen (Step 1) and try again'
        return false
    }

    const { error, message } = await res.json()

    if (error) {
        errorAlert.value = true
        errorMessage.value = message
        return false
    } else {
        errorAlert.value = false
        errorMessage.value = ''
        disableSubmit.value = true
        alert('Deposit was processed!')
        return true
    }
}
</script>

<template>
    <h2 class="header-wrapper pt-3">Enter Deposit Information</h2>
    <div class="wrapper">
        <!-- Deposit form -->
        <VForm id="deposit-form" ref="form">
            <v-select
                class="ml-3"
                label="* Deposit Category"
                :items="depositCategories"
                v-model="depositData.category"
                :rules="[rules.required]"
            ></v-select>

            <VTextField
                type="date"
                label="* Approval Date"
                class="ml-3"
                v-model="depositData.approvalDate"
                :rules="[rules.required]"
            ></VTextField>

            <!-- TODO: Will be autofilled for Sprint 4 using Settings Tab -->
            <VTextField
                class="ml-3"
                label="* Interest Rate %"
                type="number"
                :min="0"
                :max="100"
                v-model="depositData.interestRate"
                :rules="[rules.required]"
            />
            <!-- <VTextField class="ml-3" label="Time" /> -->
            <VTextField
                class="ml-3"
                label="* Deposit Amount"
                v-model="depositData.originalDepositAmount"
                type="number"
                :min="0"
                :rules="[rules.required]"
            />

            <!-- TODO: Connect this button to a method to add to the database -->
            <div class="btn-wrapper">
                <VBtn
                    prepend-icon="mdi-check"
                    class="capitalize btn"
                    :loading="loading"
                    @click.prevent="submit"
                    :disabled="disableSubmit"
                >
                    {{ disableSubmit ? 'Submitted' : 'Submit' }}
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
        </VForm>
    </div>
</template>

<style scoped>
.btn {
    font-weight: 600;
    color: var(--vt-c-white-off);
    background: var(--vt-c-blue);

    display: flex;
    align-items: center;
    text-align: center;

    border-radius: 5px;
    text-transform: capitalize;
}

.btn-wrapper {
    height: min-content;
    display: flex;
    justify-content: flex-end;
}

.btn:hover {
    background: var(--vt-c-blue-dark);
}

.header-wrapper {
    padding-left: 7%;
    padding-bottom: 2%;
}

.row-tab {
    /* border: 1px solid black; */
    display: flex;
    margin-bottom: 1%;
}

.label {
    margin-top: 15px;
    margin-right: 2%;
    /* border: 1px solid black; */
    width: 10%;

    display: inline-block;
    text-align: right;
    vertical-align: top;
}

.wrapper {
    padding: 6%;
    padding-top: 1%;
    padding-bottom: 3%;
    background-color: var(--vt-c-white);
}
</style>
