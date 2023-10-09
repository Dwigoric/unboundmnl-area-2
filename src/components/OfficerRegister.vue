<!-- Stylesheet -->
<style scoped>
.bg {
    height: 100vh;
    width: 100vw;
    background-image: url('../assets/bg.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-color: var(--vt-c-blue-very-dark);
    overflow: hidden;

    display: flex;
    justify-content: center;
    /* Horizontal centering */
    align-items: center;
}

.wrapper {
    position: sticky;
    
    background: var(--vt-c-white);
    border-radius: 5px;

    width: 30%;
    padding: 3%;
    padding-top: 2%;

    /* display: flex;
    justify-content: center; */
    overflow: auto;
}

.login {
    /* border: 1px solid black; */
}

.header {
    font-size: 1.5rem;
    font-weight: bold;

    color: var(--vt-c-black);
    text-align: center;
    margin-bottom: 3%;
}


.username-pw-input {
}

.btn {
    width: 100%;

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
</style>

<template>
    <div class="bg">
        <div class="wrapper">
            <div class="header">Register Officer</div>
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

                    <VBtn type="submit" class="btn capitalize-text" @click.prevent="logIn">Register Officer</VBtn>
                    <div v-if="errorMessage" class="error" id="login-error"></div>
                </VForm>
            </div>
        </div>
    </div>
</template>