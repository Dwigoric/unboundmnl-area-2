<template>
    <div class="profile-box d-flex rounded-lg elevation-5 hover-scale-md">
        <div class="d-flex justify-center align-center px-2">
            <v-avatar class="user-avatar" size="large">
                <v-icon icon="mdi-account"></v-icon>
            </v-avatar>
        </div>
        <div class="d-flex justify-center align-center flex-column px-3 py-2">
            <!-- note: change these dynamically  -->
            <p class="font-weight-bold name-text">Terence Galarpe</p> 
            <p class="title-text">Loan Officer</p>
        </div>
    </div>
</template>

<style scoped>
    .profile-box {
        background-color: var(--vt-c-white);
    }

    .user-avatar {
        background-color: gray;
    }

    .name-text {
        font-size: 1.25rem;
    }

    .title-text {
        color: var(--vt-c-gray);
    }

</style>