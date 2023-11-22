<script setup>
// Import vue components
import { ref } from 'vue'

import ContentBlock from '../../components/ContentBlock.vue'

const tab = ref('emergency')
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
                            <v-chip 
                                size="small"
                                class="ml-2"
                                color="blue">
                                Blue
                            </v-chip>
                        </div>

                        <div class="w-25">
                            <VTextField
                                class="mt-1 center-affix"
                                variant="underlined"
                                placeholder="Unit"
                                suffix="days"
                            />
                        </div>
                    </div>

                    <!-- Notification 2 -->
                    <div class="row-tab mb-n5">
                        <div class="label d-flex">
                            <div>Notification Period 2</div>
                            <v-chip 
                                size="small"
                                class="ml-2"
                                color="orange">
                                Orange
                            </v-chip>
                        </div>

                        <div class="w-25">
                            <VTextField
                                class="mt-1 center-affix"
                                variant="underlined"
                                placeholder="Unit"
                                suffix="days"
                            />
                        </div>
                    </div>

                    <!-- Notification 2 -->
                    <div class="row-tab mb-n5">
                        <div class="label d-flex">
                            <div>Notification Period 3</div>
                            <v-chip 
                                size="small"
                                class="ml-2"
                                color="red">
                                Red
                            </v-chip>
                        </div>

                        <div class="w-25">
                            <VTextField
                                class="mt-1 center-affix"
                                variant="underlined"
                                placeholder="Unit"
                                suffix="days"
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
