<script setup>
// Import vue components
import { ref, onMounted, reactive } from 'vue'
import { API_URL } from '../../constants'

import ContentBlock from '../../components/ContentBlock.vue'

const tab = ref('emergency')

const errorMessage = ref('')
const errorAlert = ref(false)

const formData = reactive({
    notification_period_1: 0,
    notification_period_2: 0,
    notification_period_3: 0
})

const updateAutofill = async function () {
    const res = await fetch(`${API_URL}/settings/notifications`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        }
    })

    const resJSON = await res.json()

    Object.assign(formData, resJSON.settings)
}

const submit = async function () {
    const res = await fetch(`${API_URL}/settings/notifications`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.$cookies.get('credentials').token}`
        },
        body: JSON.stringify({ ...formData })
    })

    const { error, message } = await res.json()

    errorAlert.value = false

    if (!error) {
        alert('Successfully updated settings!')
    } else {
        errorAlert.value = true
        errorMessage.value = message
    }
}

onMounted(async () => {
    await updateAutofill()
})
</script>

<template>
    <ContentBlock :width="35" :height="43" :unit="'%'" :padding="3">
        <div class="wrapper w-100 rounded-lg pb-5">
            <VForm ref="form">
                <div>
                    <!-- Notification 1 -->
                    <div class="row-tab mb-n5">
                        <div class="label d-flex">
                            <div>Notification Period 1</div>
                            <v-chip size="small" class="ml-2" color="blue"> Blue </v-chip>
                        </div>

                        <div class="w-25">
                            <VTextField
                                class="mt-1 center-affix"
                                variant="underlined"
                                placeholder="Unit"
                                suffix="days"
                                type="number"
                                v-model="formData.notification_period_1"
                            />
                        </div>
                    </div>

                    <!-- Notification 2 -->
                    <div class="row-tab mb-n5">
                        <div class="label d-flex">
                            <div>Notification Period 2</div>
                            <v-chip size="small" class="ml-2" color="orange"> Orange </v-chip>
                        </div>

                        <div class="w-25">
                            <VTextField
                                class="mt-1 center-affix"
                                variant="underlined"
                                placeholder="Unit"
                                suffix="days"
                                type="number"
                                v-model="formData.notification_period_2"
                            />
                        </div>
                    </div>

                    <!-- Notification 2 -->
                    <div class="row-tab mb-n5">
                        <div class="label d-flex">
                            <div>Notification Period 3</div>
                            <v-chip size="small" class="ml-2" color="red"> Red </v-chip>
                        </div>

                        <div class="w-25">
                            <VTextField
                                class="mt-1 center-affix"
                                variant="underlined"
                                placeholder="Unit"
                                suffix="days"
                                type="number"
                                v-model="formData.notification_period_3"
                            />
                        </div>
                    </div>
                </div>

                <div class="btn-wrapper">
                    <VBtn
                        prepend-icon="mdi-check"
                        class="capitalize btn"
                        :loading="loading"
                        @click.prevent="submit"
                    >
                        Submit
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
    </ContentBlock>
</template>

<style scoped>
.wrapper {
}

.row-tab {
    /* border: 1px solid black; */
    display: flex;
}

.label {
    margin-top: 5.2%;
    margin-right: 6%;

    /* border: 1px solid black; */
    width: 67%;

    display: inline-block;
    text-align: right;
    vertical-align: top;
}

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
    display: flex;
    justify-content: flex-end;
    margin-top: 7%;
    margin-right: 2%;
}
</style>
