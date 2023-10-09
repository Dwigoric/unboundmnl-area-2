<!-- TODO: Create Button Component for EASE -->

<VBtn type="submit" class="btn capitalize-text" @click.prevent="logIn">Log In</VBtn>

<style>
.btn {
    margin-left: 2%;
    font-weight: 600;
    color: var(--vt-c-white-off);
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
