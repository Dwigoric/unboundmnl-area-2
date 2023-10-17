<template>
    <div class="wrapper-close-btn">
        <div class="closeButton">X</div>
    </div>

</template>

<style scoped>

.wrapper-close-btn {
    display: flex;
    justify-content: flex-end;
}
.closeButton {
    color: var(--vt-c-blue);
    display: flex;
    font-size: 1rem;
    font-family: 'Montserrat';
    

    width: fit-content;
    height: min-content;

}

.closeButton:hover {
    color: var(--vt-c-black);
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 2);

    cursor: pointer;
}

</style>
