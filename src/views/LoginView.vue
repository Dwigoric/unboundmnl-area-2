<!-- TODO: Create Login Page -->

<template>
<main>
    <div class="wrapper">
            <div class="login">
                <div class="header">Log In</div>
                <form id="login-form">
                    <div class="username-pw-input">
                        <input type="text" id="login-username" required>
                        <label>Username</label>
                    </div>

                    <div class="username-pw-input">
                        <input type="password" id="login-pw" required>
                        <label>Password</label>
                    </div>

                    <!-- <div class="rememberMe">
                        <label><input type="checkbox" id="login-rememberMe">Remember Me </label>
                    </div> -->
                    
                    <button type="submit" class="btn" onclick="logIn">Log In</button>
                    <div class="error" id="login-error"> </div>
                </form>
            </div>
        </div>
</main>
</template>

<!-- <script src="/src/js/login.js"></script> -->

