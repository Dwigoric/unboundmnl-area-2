<template>
    <div class="wrapper">
        <div class="header2">Search Existing Member or Create Member Profile</div>

        <!-- Search bar -->
        <div class="search-wrapper">
            <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="Search Officer"
                clearable=""
                hide-details
            />
        </div>
        <div class="create-member mt-2">
            New Member? Create Member Profile instead
        </div>
    </div>

</template>

<style scoped>

.wrapper {
    padding: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    overflow: auto;
    /* border: 1px solid black; */
}

.header2 {
    font-size: 1.2rem;
    margin-bottom: 3%;
    font-weight: bold;
}

.create-member {
    text-align: right;
    color: var(--vt-c-blue-dark);
    font-weight: 500;
}

</style>