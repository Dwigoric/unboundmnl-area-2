// Import packages
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useApplicationFormStore = defineStore('applicationForm', () => {
    const date = ref('')
    const amount = ref(0)
    const term = ref(0)
    const classification = ref('')
    const type = ref('')
    const status = ref('')
    const userData = reactive({})

    const reset = () => {
        amount.value = 0
        term.value = 0
        classification.value = false
        type.value = ''
        status.value = ''
    }

    const getLoanData = () => {
        return {
            date: date.value,
            amount: amount.value,
            term: term.value,
            classification: classification.value,
            type: type.value,
            status: status.value
        }
    }

    const setUserData = (data) => {
        Object.assign(userData, data)
    }

    const setLoanData = (loan) => {
        date.value = loan.date
        amount.value = loan.amount
        term.value = loan.term
        type.value = loan.type
        status.value = loan.status || 'pending'
        classification.value = loan.classification
    }

    return { userData, getLoanData, setUserData, setLoanData, reset }
})
