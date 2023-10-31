<script setup>

defineProps({
    dotColor: {
        type: String,
        default: 'var(--vt-c-green)'
    },
    icon: {
        type: Number, 
        default: 0
    },
    opp: String, 
    def: String
})

</script>

<template>
<v-timeline-item 
    :dot-color="dotColor" 
    elevation="2" 
    fill-dot size="35">
    
    <template v-slot:icon>
        <v-icon v-if='icon === 0' icon="mdi-check text-white" />
        <v-icon v-else><div class="font-weight-bold text-white ">{{ icon }}</div></v-icon>
    </template>

    <template v-slot:opposite>
        {{ opp }}
    </template>

    <template v-slot:default>
        {{ def }}
    </template>
</v-timeline-item>
</template>

<style scoped>

</style>