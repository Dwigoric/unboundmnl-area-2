// Import packages
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useApplicationFormStore = defineStore('applicationForm', () => {
    const emptyCoborrower = Object.freeze({
        name: {
            given: '',
            middle: '',
            last: ''
        },
        birthday: '',
        birthplace: '',
        occupation: '',
        contact_no: ''
    })

    const date = ref('')
    const amount = ref(0)
    const term = ref(0)
    const paymentFrequency = ref('')
    const classification = ref('')
    const type = ref('')
    const status = ref('')
    const coborrower = reactive({ ...emptyCoborrower })

    const reset = () => {
        date.value = ''
        amount.value = 0
        term.value = 0
        paymentFrequency.value = ''
        classification.value = ''
        type.value = ''
        status.value = ''
        Object.assign(coborrower, { ...emptyCoborrower })
    }

    const getLoanData = () => {
        return {
            date: date.value,
            amount: amount.value,
            term: term.value,
            paymentFrequency: paymentFrequency.value,
            classification: classification.value,
            type: type.value,
            status: status.value,
            coborrower
        }
    }

    const setLoanData = (loan) => {
        date.value = loan.date
        amount.value = loan.amount
        term.value = loan.term
        type.value = loan.type
        status.value = loan.status || 'pending'
        paymentFrequency.value = loan.paymentFrequency
        classification.value = loan.classification
        Object.assign(coborrower, loan.coborrower)
    }

    return { getLoanData, setLoanData, reset }
})
