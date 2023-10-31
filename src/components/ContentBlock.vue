<script setup>

    // Dynamically define the width and height of the block.
    defineProps({
        width: Number,
        height: Number,
        unit: String,
        bgColor: {
            type: String,
            default: '#FFF'
        },
        margin: {
            type: String,
            default: '0' // Default margin value
        },
        padding: {
            type: String,
            default: '0.5' // Default padding value
        }
    });
</script>

<template>
    <!-- Dynamically set the width and height of the content block  -->
    <div class="elevation-5 rounded-lg" 
        :style="
            {width: `${width}${unit}`, 
            height: `${height}${unit}`, 
            backgroundColor: `${bgColor}`,
            margin: `${margin}${unit}`,
            padding: `${padding}${unit}`,
        }"
    >
        <slot></slot>
    </div>
</template>
