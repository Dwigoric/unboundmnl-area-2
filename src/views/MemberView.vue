<script setup>
// Import vue components
import NavigationDrawer from '../components/NavigationDrawer.vue'
import ContentBlock from '../components/ContentBlock.vue'
import MemberProfileLeft from '../components/MemberProfileLeft.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'

// Import Packages
import { ref, onMounted, watch } from 'vue'

import { API_URL } from '../constants'

const searchQuery = ref('')
const users = ref([])

/**
 * Grabs all officers registered in the database.
 */
async function getAllUsers() {
    const credentials = window.$cookies.get('credentials')
    if (!credentials) return

    const { token } = credentials
    if (!token) return

    let url = ''
    const params = new URLSearchParams()
    params.set('access_token', token)
    if (searchQuery.value !== '') {
        params.set('username', searchQuery.value)
        url += `search?${params}`
    } else {
        url += `?${params}`
    }

    try {
        const response = await fetch(`${API_URL}/users/${url}`)
        users.value = await response.json()
    } catch (e) {
        console.error(e)
    }
}

// Refresh users listing when there is a change in the searchbar
watch(searchQuery, getAllUsers)

// Upon loading the page
onMounted(getAllUsers)
</script>

<template>
    <div class="bg-off-white d-flex px-4 py-2">
        <NavigationDrawer />

        <div class="d-flex flex-column w-100 pl-8">
            <!-- Top Bar of Dashboard -->
            <DashboardTopBar :breadcrumbs="['Home', 'Member Profiles']" />

            <!-- Main Dashboard Body -->
            <div class="dashboard-body d-flex flex-column h-100 py-3">
                <h2>Member Profiles</h2>

                <ContentBlock :width="100" :height="102" :unit="'%'" :bg-color="'#FFF'">
                    <div class="d-flex flex-row h-100">
                        <div class="left pa-2">
                            <MemberProfileLeft></MemberProfileLeft>
                        </div>

                        <v-divider vertical
                            :thickness="2" 
                            class="mt-3 mb-3 border-opacity-70" 
                        />

                        <div class="right pa-2">
                            asdasd
                        </div>
                    </div>
                </ContentBlock>
            </div>
        </div>
    </div>
</template>

<style scoped>
.left {
    border: 1px solid black;
    width: 30%;
    height: 100%;
}

.right {
    border: 1px solid black;
    width: 70%;
    height: 100%;
}
.header {
    font-size: 1.7rem;
}
.dashboard-body {
    gap: 1.25rem;
}

.dashboard-body {
    gap: 1.25rem;
}

.bg-off-white {
    background-color: var(--vt-c-white-off);
}
</style>