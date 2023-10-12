<template>
    <div class="profile-box d-flex rounded-lg elevation-5 hover-scale-md">
        <div class="d-flex justify-center align-center px-2">
            <v-avatar class="user-avatar" size="large">
                <v-icon icon="mdi-account"></v-icon>
            </v-avatar>
        </div>
        <div class="d-flex flex-column px-3">
            <!-- note: change these dynamically  -->
            <p class="font-weight-bold name-text">Terence Galarpe</p> 
            <p class="title-text">Secretary</p>
        </div>
    </div>
</template>

<style scoped>
    .profile-box {
        background-color: var(--vt-c-white);
        padding-top: .2%;
        padding-bottom: .2%;
    }

    .user-avatar {
        background-color: gray;
    }

    .name-text {
        font-size: 1.25rem;
        height: 25px;
    }

    .title-text {
        color: var(--vt-c-gray);
    }

</style>