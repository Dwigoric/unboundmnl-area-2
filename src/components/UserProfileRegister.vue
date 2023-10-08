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
                
                <div class="formDiv">
                    <VForm id="login-form" ref="form">
                        <!-- TODO: [User] Create proper fields -->
                        <!-- 
                            Removed: age
                            Added: spouse info
                        -->
                        <VTextField class="username-pw-input" v-model="username" id="login-username" label="Username" required />
                        <VTextField class="username-pw-input" v-model="password" id="login-password" label="Password" required />
                        
                        <div class="header2">Borrower's Information</div>
                        <VTextField class="username-pw-input" v-model="first_name" id="login-first-name" label="First Name" required />
                        <VTextField class="username-pw-input" v-model="middle_name" id="login-middle-name" label="Middle Name" />
                        <VTextField class="username-pw-input" v-model="last_name" id="login-last-name" label="Last Name" required/>
                        <VTextField class="username-pw-input" v-model="birthday" id="login-birthday" label="Date of Birth" required />
                        <VTextField class="username-pw-input" v-model="birthplace" id="login-birthplace" label="Place of Birth" required />
                        <VTextField class="username-pw-input" v-model="gender" id="login-gender" label="Gender" required />
                        <VTextField class="username-pw-input" v-model="tin_number" id="login-tin-number" label="TIN Number" required />
                        <VTextField class="username-pw-input" v-model="civil_status" id="login-civil-status" label="Civil Status" required />
                        <VTextField class="username-pw-input" v-model="contact_number" id="login-contact-number" label="Contact Number" required />
                        <VTextField class="username-pw-input" v-model="address" id="login-address" label="Residence Address" required />
                        <VTextField class="username-pw-input" v-model="monthly_income" id="login-monthly-income" label="Monthly Income" required />
                        <VTextField class="username-pw-input" v-model="occupation" id="login-occupation" label="Occupation/Source of Income" required />
                        <!-- Spouse info -->
                        <div class="header2">Spouse's Information</div>
                        <VTextField class="username-pw-input" v-model="spouse_first_name" id="login-spouse-first-name" label="Spouse's First Name" />
                        <VTextField class="username-pw-input" v-model="spouse_middle_name" id="login-spouse-middle-name" label="Spouse's Middle Name" />
                        <VTextField class="username-pw-input" v-model="spouse_last_name" id="login-spouse-last-name" label="Spouse's Last Name" />
                        <VTextField class="username-pw-input" v-model="spouse_birthday" id="login-spouse-birthday" label="Spouse's Date of Birth" />
                        <VTextField class="username-pw-input" v-model="spouse_birthplace" id="login-spouse-birthplace" label="Spouse's Place of Birth" />
                        <VTextField class="username-pw-input" v-model="spouse_contact_number" id="login-spouse-contact-number" label="Spouse's Contact Number" />

                        <!-- <div class="rememberMe">
                        <label><input type="checkbox" id="login-rememberMe" />Remember Me </label>
                        </div> -->

                        <div class="btnWrapper">
                            <VBtn type="submit" class="btn capitalize-text" @click.prevent="registerUser">Create User Profile</VBtn>
                        </div>
                        <div v-if="error_message" class="error" id="login-error"></div>
                    </VForm>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            username: "",
            password: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            birthday: "",
            birthplace: "",
            gender: "",
            tin_number: "",
            civil_status: "",
            contact_number: "",
            address: "",
            monthly_income: "",
            occupation: "",
            spouse_first_name: "",
            spouse_last_name: "",
            spouse_middle_name: "",
            spouse_contact_number: "",
            spouse_birthplace: "",
            spouse_birthday: "",
            error_message: ""
        }
    },
    methods: {
        registerUser: function() {
            
        }
    }
}
</script>