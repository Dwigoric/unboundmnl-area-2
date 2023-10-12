// Import packages
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCurrentUserStore = defineStore('currentUser', () => {
    const name = reactive({ given: '', middle: '', last: '' })
    const id = ref('')

    return { name, id }
})
