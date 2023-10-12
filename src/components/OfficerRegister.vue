<script setup>
    import CloseButton from '../components/CloseButton.vue';

</script>

<template>
    <div class="bg">
        <div class="wrapper">
            <div class="header">
                <CloseButton @click="() => togglePopup('createOfficerProfile')" />
                    <div class="header-text">
                        Register Officer
                    </div>
                </div>
                <div class="infoFields">
                    <div class="login">
                        <VForm id="login-form" ref="form">
                            <!-- TODO: Create proper fields -->
                            <VTextField class="username-pw-input" v-model="first_name" id="login-pw" label="Last Name" required /> 
                            <VTextField class="username-pw-input" v-model="last_name" id="login-pw" label="First Name" required />
                            <VTextField class="username-pw-input" v-model="username" id="login-username" label="Username" required />
                            <VTextField class="username-pw-input" v-model="password" id="login-pw" label="Password" required />


                            <!-- <div class="rememberMe">
                            <label><input type="checkbox" id="login-rememberMe" />Remember Me </label>
                            </div> -->

                            <div class="btnWrapper">
                                <VBtn type="submit" class="btn capitalize-text" @click.prevent="logIn">Register Officer</VBtn>
                            </div>
                            <div v-if="errorMessage" class="error" id="login-error"></div>
                        </VForm>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        togglePopup: Function,
    }
}
</script>

<!-- Stylesheet -->
<style scoped>
.bg {
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    z-index: 9999;

    background-color: rgba(0, 0, 0, 0.5);
}

.wrapper {
    background: var(--vt-c-white);
    border-radius: 5px;

    width: 30%;

    /* display: flex;
    justify-content: center; */
    overflow: auto;

    display: flex;
    flex-direction: column;
}

.login {
    /* border: 1px solid black; */
}

.header {
    background-color: var(--vt-c-white-off);
    width: 100%;
    padding-bottom: 3%;
    padding-left: 2%;
    padding-right: 2%;
    padding-top: 1%;

    position: sticky;
    top: 0;
    z-index: 1000;

    font-size: 1.5rem;
    font-weight: bold;

    text-align: center;
    margin-bottom: 3%;
}

.infoFields {
    padding: 3%;
    padding-top: 0%;

}


.username-pw-input {}

.btn {
    padding: 2%;

    color: var(--vt-c-white-off);
    font-weight: 600;
    background: var(--vt-c-blue);

    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.capitalize-text {
    text-transform: capitalize;
}

.btn:hover {
    background: var(--vt-c-blue-dark);
}

.rememberMe {
    font-size: .9em;
    color: var(--primary-color-jade);
    font-weight: 500;
    margin: -15px 2 15px;
    display: flex;
    justify-content: right;
    margin-top: 5px;
    margin-bottom: 20px;
}

.error {
    display: flex;
    font-size: .9em;
    text-align: center;
    color: red;
    font-weight: 400;
    margin: 25px 1 10px;
    justify-content: center;
}

.btnWrapper {
    display: flex;
    justify-content: flex-end;
}
</style>