<script setup>
import StepCounterTimelineItem from '../components/StepCounterTimelineItem.vue'

let props = defineProps({
    step: String
})

// 0 - not current, 1 - current, 2 - done

let step1DotColor = 'var(--vt-c-blue)'
let step1Icon = 1
let step2DotColor = 'var(--vt-c-blue)'
let step2Icon = 2
let step3DotColor = 'var(--vt-c-blue)'
let step3Icon = 3

if (props.step === 1){
    step1DotColor = 'var(--vt-c-blue-dark)'
}

else if (props.step === 2){
    step2DotColor = 'var(--vt-c-blue-dark)'
    step1DotColor = 'var(--vt-c-green)'
    step1Icon = 0
}

else if (props.step === 3) {
    step3DotColor = 'var(--vt-c-blue-dark)'
    step2DotColor = 'var(--vt-c-green)'
    step2Icon = 0
    step1DotColor = 'var(--vt-c-green)'
    step1Icon = 0
}

</script>

<template>
<!-- TODO: Make this much more skinnier -->
<div class="step-wrapper">
    <v-timeline 
        direction="horizontal"
        line-thickness="3"
        truncate-line="both"
        line-inset="5"
        side="end"
        >

        <StepCounterTimelineItem 
            :dotColor="step1DotColor"
            :icon="step1Icon"
            :def="'Search Existing Member or Create Member Profile'">
        </StepCounterTimelineItem>

        <StepCounterTimelineItem 
            :dotColor="step2DotColor"
            :icon="step2Icon"
            :def="'Fill up Loan Application Form'">
        </StepCounterTimelineItem>

        <StepCounterTimelineItem 
            :dotColor="step3DotColor"
            :icon="step3Icon"
            :def="'Save and export form as PDF'">
        </StepCounterTimelineItem>
    </v-timeline>
</div>
    
</template>

<style scoped>
.step-wrapper {
    padding: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    overflow: auto;
}
</style>