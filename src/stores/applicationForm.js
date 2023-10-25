// Import packages
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApplicationFormStore = defineStore('applicationForm', () => {
    const loaneeId = ref('')
    const date = ref('')
    const amount = ref(0)
    const term = ref(0)
    const newLoan = ref(false)
    const renewal = ref(false)
    const type = ref('')
    const status = ref('')

    const reset = () => {
        loaneeId.value = ''
        amount.value = 0
        term.value = 0
        newLoan.value = false
        renewal.value = false
        type.value = ''
        status.value = ''
    }

    const getLoanData = () => {
        return {
            loaneeId: loaneeId.value,
            date: date.value,
            amount: amount.value,
            term: term.value,
            new: newLoan.value,
            renewal: renewal.value,
            type: type.value,
            status: status.value
        }
    }

    const setLoaneeId = (id) => {
        loaneeId.value = id
    }

    const setLoanData = (loan) => {
        date.value = loan.date
        amount.value = loan.amount
        term.value = loan.term
        type.value = loan.type
        status.value = loan.status || 'pending'

        if (loan.classification === 'new') {
            newLoan.value = true
            renewal.value = false
        } else {
            newLoan.value = false
            renewal.value = true
        }
    }

    return { getLoanData, setLoaneeId, setLoanData, reset }
})
