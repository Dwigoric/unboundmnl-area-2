<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <!-- Not sure if we should put this v-app in this App.vue or in specific components lang -->
    <v-app> 
        <RouterView />  
    </v-app>
</template>
