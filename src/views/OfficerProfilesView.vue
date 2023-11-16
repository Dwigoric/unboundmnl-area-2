<script setup>
// Import Packages
import { reactive, onMounted } from 'vue'
import jwt_decode from 'jwt-decode'

// Import Components
import NavigationDrawer from '../components/NavigationDrawer.vue'
import ContentBlock from '../components/ContentBlock.vue'
import OfficerRegister from '../components/OfficerRegister.vue'
import OfficerProfileBtn from '../components/OfficerProfileBtn.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'

// Important Constants
import { API_URL } from '../constants'

// Define reactive variables
const officers = reactive([])

// Grab token from cookies
const { token } = window.$cookies.get('credentials')
const { type } = jwt_decode(token)

/**
 * Grabs all officers registered in the database.
 */
async function getAllOfficers() {
    // retrieve token
    const params = new URLSearchParams()
    params.set('access_token', token)

    try {
        const response = await fetch(`${API_URL}/officers?${params}`)
        const officersResponse = await response.json()
        const officersArray = officersResponse.officers
        addToOfficers(...officersArray)
    } catch (error) {
        console.error('Error: ', error)
    }
}

function addToOfficers(...newOfficers) {
    officers.push(...newOfficers)
}

function removeOfficer(officerUuid) {
    const index = officers.findIndex((officer) => officer.uuid === officerUuid)
    officers.splice(index, 1)
}

// Upon loading the page
onMounted(getAllOfficers)
</script>

<template>
    <div class="bg-off-white d-flex px-4 py-2">
        <NavigationDrawer />

        <div class="d-flex flex-column w-100 pl-8">
            <!-- Top Bar of Dashboard -->
            <DashboardTopBar :breadcrumbs="['Profiles', 'Officer Profiles']" />

            <!-- Main Dashboard Body -->
            <div class="dashboard-body d-flex flex-column h-100 py-3">
                <h2>Officer Profiles</h2>

                <div class="upper-wrapper">
                    <div class="btn-wrapper" v-if="type === 'admin'">
                        <v-dialog width="900">
                            <template v-slot:activator="{ props }">
                                <!-- Create Officer Profile Button -->
                                <v-btn
                                    class="btn capitalize-text"
                                    v-bind="props"
                                    text="Create Officer Profile"
                                >
                                </v-btn>
                            </template>

                            <!-- Form popup -->
                            <template v-slot:default="{ isActive }">
                                <v-card close-on-back contained class="form-wrapper">
                                    <v-container>
                                        <v-row justify="end">
                                            <v-card-actions>
                                                <v-btn
                                                    class="ma-2 capitalize-text"
                                                    color="var(--vt-c-blue)"
                                                    @click="isActive.value = false"
                                                    icon="mdi-close"
                                                >
                                                </v-btn>
                                            </v-card-actions>
                                        </v-row>
                                    </v-container>

                                    <!-- TODO: officerAction must be 'Register' -->
                                    <OfficerRegister
                                        :add-to-officers="addToOfficers"
                                        :close-dialog="() => (isActive.value = false)"
                                    />
                                </v-card>
                            </template>
                        </v-dialog>
                    </div>
                </div>
                <!--
                <div v-for="officer in officersArray" :key="officer">
                    <h2>cool</h2>
                </div>
                -->
                <ContentBlock :width="100" :height="100" :unit="'%'" :bg-color="'#FFF'">
                    <!-- Render list of officers-->
                    <div
                        v-for="officer in officers"
                        :key="officer.uuid"
                        class="officer-list-box d-flex flex-column"
                    >
                        <OfficerProfileBtn
                            :officer="officer"
                            :removeFunc="() => removeOfficer(officer.uuid)"
                        />
                    </div>
                </ContentBlock>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard-top {
    width: 100%;
    height: 58px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.dashboard-top-right {
    display: flex;
    gap: 1.5rem;
}

.breadcrumbs-wrapper {
    margin-left: -15px;
    font-weight: 600;
}

.dashboard-body {
    gap: 1.25rem;
}

.upper-wrapper {
    height: 10%;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    /* border: 1px solid black; */
}

.search-wrapper {
    display: flex;
    width: 85%;
}

.btn-wrapper {
    display: flex;
    margin-bottom: 22px;
    /* border: 1px solid black; */
}

.btn {
    font-weight: 600;
    color: var(--vt-c-white-off);
    background: var(--vt-c-blue);

    display: flex;
    align-items: center;
    text-align: center;

    padding-top: 15%;
    padding-bottom: 15%;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-transform: capitalize;
}

.btn:hover {
    background: var(--vt-c-blue-dark);
}

.form-wrapper {
    background-color: var(--vt-c-white-off);
}

.dashboard-body {
    gap: 1.25rem;
}

.gap-1_25 {
    gap: 1.25rem;
}

.bg-off-white {
    background-color: var(--vt-c-white-off);
}

.officer-list-box {
    gap: 0.8rem;
}
</style>
