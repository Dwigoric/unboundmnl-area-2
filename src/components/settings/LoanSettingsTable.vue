<script setup>

const props = defineProps({
    header: {
        type: String,
        required: true,
    }
});

</script>

<template>
    <div>
        <h3>{{ props.header }}</h3>
        <div class="wrapper w-100 rounded-lg">
            asd
        </div>
    </div>
</template>

<style scoped>

.wrapper {
    border: 1px solid black;
}

</style>
