// Packages
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useMemberSearchStore = defineStore('memberSearch', () => {
    const data = reactive({})

    const setData = (data) => {
        Object.assign(data, data)
    }

    return { data, setData }
})
