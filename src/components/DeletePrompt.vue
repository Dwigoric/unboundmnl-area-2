<template>
    <div class="wrapper">
        <div class="header">    
            <!-- TODO:  Change 'profileType' to either 'Member' or 'Officer', then add name of profile afterwards in 'name'-->
            <div class="header-text">Are you sure you want to delete this {{profileType}} Profile {{name}}?</div>
        </div>

        <div class="btn-wrapper">
            <VBtn
                type="submit"
                class="btn capitalize-text"
            >
                Delete Officer Profile
            </VBtn>
        </div>
    </div>
</template>

<style scoped>

.wrapper {
    padding: 6%;
    background-color: var(--vt-c-white);
}
.header {
    margin-bottom: 7%;
    
}

.btn {
    font-weight: 600;
    color: var(--vt-c-white-off);
    background: var(--vt-c-red);

    border-radius: 5px;
    text-transform: capitalize;
}

.btn:hover {
    background: var(--vt-c-red);
}


.btn-wrapper {
    margin-top: 2%;
    display: flex;
    justify-content: flex-end;
}

</style>