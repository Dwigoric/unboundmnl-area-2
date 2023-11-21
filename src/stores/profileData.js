// Packages
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useProfileDataStore = defineStore('profileData', () => {
    const profileData = reactive({})

    const setProfileData = (data) => {
        Object.assign(profileData, data)
    }

    return {
        profileData,
        setProfileData
    }
})
