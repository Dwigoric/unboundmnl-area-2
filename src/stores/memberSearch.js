// Packages
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useMemberSearchStore = defineStore('memberSearch', () => {
    const data = reactive({})

    const setData = (providedData) => {
        Object.assign(data, providedData)
    }

    return { data, setData }
})
