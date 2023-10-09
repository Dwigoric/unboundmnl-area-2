<template>
    <v-card class="notification-bell-box d-flex flex-column justify-center align-center elevation-5 hover-scale-md">
        <!-- Change the look of the notification bell dynamically if there are notifs -->
        <v-icon class="notification-bell" icon="mdi-bell-outline" size="large"></v-icon>
    </v-card>
</template>

<style scoped>

    .notification-bell-box {
        min-width: 3rem;
        height: 3.5rem;
    }

    .notification-bell {
        color: var(--vt-c-gray);
        
        font-size: 2rem;
    }

</style>