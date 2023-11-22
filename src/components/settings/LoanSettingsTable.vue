<script setup>

import { ref } from 'vue'

const props = defineProps({
    header: {
        type: String,
        required: true,
    }
});

const checkbox_ServiceFee = ref(true)
const checkbox_CBU = ref(true)
const checkbox_Savings = ref(true)


</script>

<template>
    <div>
        <h3>{{ props.header }}</h3>
        <div class="wrapper w-100 rounded-lg pb-5">
            <VForm ref="form">
                <div>
                    <!-- Interest Rate -->
                    <div class="row-tab mb-n5">
                        <div class="label">
                            <div>Interest Rate</div>
                        </div>

                        <div class="w-25 d-flex">
                            <VTextField
                                class="mt-2 center-affix"
                                variant="underlined"
                                placeholder="Unit"
                            />
                        </div>

                        <div class="mt-4 ml-3 w-25">
                            <v-select
                                density="compact"
                                :items="['%', 'Days']"
                            ></v-select>
                        </div>
                    </div>

                    <!-- Time -->
                    <div class="row-tab">
                        <div class="label">
                            <div>Time</div>
                        </div>

                        <div class="w-25 d-flex">
                            <VTextField
                                class="mt-2 center-affix"
                                variant="underlined"
                                placeholder="Unit"
                            />
                        </div>

                        <div class="mt-4 ml-3 w-25">
                            <v-select
                                density="compact"
                                :items="['Day', 'Month', 'Year']"
                            ></v-select>
                        </div>
                    </div>

                    <h4 class="ml-4">Initial Deductions</h4>
                    
                    <!-- Service Fee -->
                    <div class="row-tab mb-n5">
                        <div class="label">
                            <div>Service Fee</div>
                        </div>

                        <div class="w-25 d-flex">
                            <VTextField
                                class="mt-2 center-affix"
                                variant="underlined"
                                placeholder="Unit"
                                :disabled="!checkbox_ServiceFee"
                            />
                        </div>

                        <div class="mt-4 ml-3 w-25">
                            <v-select
                                density="compact"
                                :items="['%', 'Days']"
                                :disabled="!checkbox_ServiceFee"
                            ></v-select>
                        </div>

                        <v-checkbox
                            class="mt-2 mb-n2"
                            v-model="checkbox_ServiceFee"
                        ></v-checkbox>
                    </div>

                    <!-- Capital Build Up (CBU) -->
                    <div class="row-tab mb-n5">
                        <div class="label">
                            <div>Capital Build Up (CBU)</div>
                        </div>

                        <div class="w-25 d-flex">
                            <VTextField
                                class="mt-2 center-affix"
                                variant="underlined"
                                placeholder="Unit"
                                :disabled="!checkbox_CBU"
                            />
                        </div>

                        <div class="mt-4 ml-3 w-25">
                            <v-select
                                density="compact"
                                :items="['%', 'Days']"
                                :disabled="!checkbox_CBU"
                            ></v-select>
                        </div>

                        <v-checkbox
                            class="mt-2 mb-n2"
                            v-model="checkbox_CBU"
                        ></v-checkbox>
                    </div>

                    <!-- Savings -->
                    <div class="row-tab mb-n5">                        
                        <div class="label">
                            
                            <div>Savings</div>
                            
                        </div>

                        <div class="w-25 d-flex">
                            <VTextField
                                class="mt-2 center-affix"
                                variant="underlined"
                                placeholder="Unit"
                                :disabled="!checkbox_Savings"
                            />
                        </div>

                        <div class="mt-4 ml-3 w-25">
                            <v-select
                                density="compact"
                                :items="['%', 'Days']"
                                :disabled="!checkbox_Savings"
                            ></v-select>
                        </div>

                        <v-checkbox
                            class="mt-2 mb-n2"
                            v-model="checkbox_Savings"
                        ></v-checkbox>
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
            </VForm>
        </div>
    </div>
</template>

<style scoped>

.wrapper {
    border: 1px solid black;
    margin-bottom: 2%;    
}

.row-tab {
    /* border: 1px solid black; */
    display: flex;
}

.label {
    margin-top: 5.2%;
    margin-right: 6%;
    
    /* border: 1px solid black; */
    width: 35%;

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
    height: min-content;
    display: flex;
    justify-content: flex-end;
    margin-top: 7%;
    margin-right: 2%;
}

</style>
