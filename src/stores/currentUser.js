// Import packages
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

// Import constants
import { API_URL } from '../constants'

export const useCurrentUserStore = defineStore('currentUser', () => {
    const name = reactive({ given: '', middle: '', last: '' })
    const id = ref('')
    const role = ref('')

    const fetchUser = async () => {
        const credentials = window.$cookies.get('credentials')

        if (!credentials || !credentials.token) return

        const { officer } = await fetch(`${API_URL}/officers/${id.value}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${credentials.token}` }
        }).then((res) => res.json())

        if (officer) {
            const isAdmin = officer.username === 'admin'
            name.given = isAdmin ? 'Admin' : officer.name.given
            name.middle = isAdmin ? '' : officer.name.middle
            name.last = isAdmin ? ' ' : officer.name.last
            id.value = officer.uuid
            role.value = isAdmin ? 'System Administrator' : officer.role
        }
    }

    return { name, id, role, fetchUser }
})
