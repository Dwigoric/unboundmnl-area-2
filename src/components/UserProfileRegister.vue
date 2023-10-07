<!-- Stylesheet -->
<style scoped>
/* TODO: Scale everything properly !!! */
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
    background: var(--vt-c-white);
    border-radius: 5px;

    width: 80vw;
    max-height: 80vh;

    display: flex;
    flex-direction: column;
    overflow: auto;
}


.formDiv {
}

.header {
    /* border: 1px solid black; */
    background-color: var(--vt-c-white-off);
    width: 100%;
    padding: 2%;
    
    position: sticky;
    top: 0;
    z-index: 1000;

    font-size: 1.5rem;
    font-weight: bold;

    text-align: center;
    margin-bottom: 3%;
}

.header2 {
    font-size: 1.2rem;
    margin-bottom: 3%;
    font-weight: bold;
}

.infoFields {
    padding: 3%;

}


.username-pw-input {}


.btn {
    color: var(--vt-c-white-off);
    font-weight: 600;
    background: var(--vt-c-blue);

    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btnWrapper {
    /* border: 1px solid black; */
    display: flex;
    justify-content: flex-end;
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
            <div class="header">Create a User Profile</div>
            <div class="infoFields">
                <div class="header2">Borrower's Information</div>
                <div class="formDiv">
                    <VForm id="login-form" ref="form">
                        <!-- TODO: [User] Create proper fields -->
                        <VTextField class="username-pw-input" v-model="first_name" id="login-pw" label="Last Name" required />
                        <VTextField class="username-pw-input" v-model="last_name" id="login-pw" label="First Name" required />
                        <VTextField class="username-pw-input" v-model="last_name" id="login-pw" label="Middle Name" required />
                        <VTextField class="username-pw-input" v-model="username" id="login-username" label="Date of Birth" required />
                        <VTextField class="username-pw-input" v-model="password" id="login-pw" label="Age" required />
                        <VTextField class="username-pw-input" v-model="last_name" id="login-pw" label="Gender" required />
                        <VTextField class="username-pw-input" v-model="last_name" id="login-pw" label="Tin Number" required />
                        <VTextField class="username-pw-input" v-model="last_name" id="login-pw" label="Civil Status" required />
                        <VTextField class="username-pw-input" v-model="last_name" id="login-pw" label="Contact Number" required />
                        <VTextField class="username-pw-input" v-model="last_name" id="login-pw" label="Residence Address" required />
                        <VTextField class="username-pw-input" v-model="last_name" id="login-pw" label="Monthly Income" required />
                        <VTextField class="username-pw-input" v-model="last_name" id="login-pw" label="Occupation/Source of Income" required />



                        <!-- <div class="rememberMe">
                        <label><input type="checkbox" id="login-rememberMe" />Remember Me </label>
                        </div> -->

                        <div class="btnWrapper">
                            <VBtn type="submit" class="btn capitalize-text" @click.prevent="logIn">Create User Profile</VBtn>
                        </div>
                        <div v-if="errorMessage" class="error" id="login-error"></div>
                    </VForm>
                    </div>
                </div>
        </div>
    </div>
</template>