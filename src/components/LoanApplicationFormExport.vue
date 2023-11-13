<script setup>
// Import packages
import { ref, onMounted, onUnmounted } from 'vue'
import { PDFDocument, TextAlignment } from 'pdf-lib'

// Import constants
import { API_URL, FILENAMES } from '../constants'

// Import stores
import { useApplicationFormStore } from '../stores/applicationForm'
import { useMemberSearchStore } from '../stores/memberSearch'
const appFormStore = useApplicationFormStore()
const memberSearchStore = useMemberSearchStore()

// Define reactive variables
const pdfUrl = ref('')
const errorAlert = ref(false)
const errorMessage = ref('')
const disableSubmit = ref(false)

// Submit loan application
const submit = async () => {
    const { error, message } = await fetch(
        `${API_URL}/loans/new/${memberSearchStore.data.username}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${window.$cookies.get('credentials').token}`
            },
            body: JSON.stringify(appFormStore.getLoanData())
        }
    ).then((res) => res.json())

    if (error) {
        errorAlert.value = true
        errorMessage.value = message
        return false
    } else {
        errorAlert.value = false
        errorMessage.value = ''
        disableSubmit.value = true
        return true
    }
}

// Fetch PDF file from API
const fetchPDF = async () => {
    const { token } = window.$cookies.get('credentials')

    const params = new URLSearchParams()
    params.set('access_token', token)

    // Fetch PDF file
    const formBytes = await fetch(
        `${API_URL}/private/${FILENAMES.LOAN_APPLICATION}?${params}`
    ).then((res) => res.arrayBuffer())

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(formBytes)

    // ----- Fill form fields -----
    const form = pdfDoc.getForm()
    const loanData = appFormStore.getLoanData()

    // Set date field
    form.getTextField('Date').setText(new Date().toLocaleDateString('en-PH', { dateStyle: 'long' }))

    // Set classification
    form.getCheckBox({ new: 'New', renewal: 'Renewal' }[loanData.classification]).check()

    // Set term
    const termTextField = form.getTextField('Term of Loan')
    termTextField.setAlignment(TextAlignment.Center)
    termTextField.setText(loanData.term)

    // Set amount
    form.getTextField('Amount').setText(loanData.amount.toLocaleString())

    // Set type of loan
    const loanTypes = Object.freeze({
        emergency: 'Emergency',
        'multi-purpose': 'Multi-Purpose',
        educational: 'Educational',
        'petty cash': 'Petty Cash',
        commercial: 'Commercial',
        livelihood: 'Livelihood'
    })
    form.getCheckBox(loanTypes[loanData.type]).check()

    // Set borrower's information
    form.getTextField('Surname').setText(memberSearchStore.data.name.last)
    form.getTextField('Given Name').setText(memberSearchStore.data.name.given)
    form.getTextField('Middle Name').setText(memberSearchStore.data.name.middle)
    const birthday = new Date(memberSearchStore.data.birthday)
    form.getTextField('Date of Birth').setText(
        birthday.toLocaleDateString('en-PH', { dateStyle: 'long' })
    )
    const ageTextField = form.getTextField('Age')
    ageTextField.setAlignment(TextAlignment.Center)
    ageTextField.setText(
        Math.abs(birthday.getUTCFullYear() - new Date().getUTCFullYear()).toLocaleString()
    )
    form.getTextField('Place of Birth').setText(memberSearchStore.data.birthplace)
    form.getCheckBox({ M: 'Male', F: 'Female' }[memberSearchStore.data.sex]).check()
    const civilStatusTextField = form.getTextField('Civil Status')
    civilStatusTextField.setAlignment(TextAlignment.Center)
    civilStatusTextField.setText(memberSearchStore.data.civil_status)
    form.getTextField('TIN').setText(memberSearchStore.data.tin_no)
    const contactNumberTextField = form.getTextField('Contact No')
    contactNumberTextField.setAlignment(TextAlignment.Center)
    contactNumberTextField.setText(memberSearchStore.data.contact_no)
    form.getTextField('Residence Address').setText(
        [
            memberSearchStore.data.address.street,
            memberSearchStore.data.address.barangay,
            memberSearchStore.data.address.city,
            memberSearchStore.data.address.province
        ].join(', ')
    )
    form.getTextField('Monthly Income').setText(
        memberSearchStore.data.monthly_income.toLocaleString()
    )
    form.getTextField('Source of Income').setText(memberSearchStore.data.occupation)

    // Set spouse's information
    if (memberSearchStore.data.civil_status === 'Married') {
        form.getTextField('Spouse Surname').setText(memberSearchStore.data.spouse.name.last)
        form.getTextField('Spouse Given Name').setText(memberSearchStore.data.spouse.name.given)
        form.getTextField('Spouse Middle Name').setText(memberSearchStore.data.spouse.name.middle)
        const spouseBirthday = new Date(memberSearchStore.data.spouse.birthday)
        form.getTextField('Spouse Date of Birth').setText(
            spouseBirthday.toLocaleDateString('en-PH', { dateStyle: 'long' })
        )
        const spouseAgeTextField = form.getTextField('Spouse Age')
        spouseAgeTextField.setAlignment(TextAlignment.Center)
        spouseAgeTextField.setText(
            Math.abs(spouseBirthday.getUTCFullYear() - new Date().getUTCFullYear()).toLocaleString()
        )
        form.getTextField('Spouse Place of Birth').setText(memberSearchStore.data.spouse.birthplace)
        form.getTextField('Spouse Source of Income').setText(
            memberSearchStore.data.spouse.occupation
        )
        const spouseContactNumberTextField = form.getTextField('Spouse Contact No')
        spouseContactNumberTextField.setAlignment(TextAlignment.Center)
        spouseContactNumberTextField.setText(memberSearchStore.data.spouse.contact_no)
    }

    // TODO: Coborrower section

    // Flatten form fields
    form.flatten()

    // Save PDF bytes
    const pdfBytes = await pdfDoc.save()
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })
    pdfUrl.value = URL.createObjectURL(pdfBlob)
}

// Define lifecycle hooks
onMounted(fetchPDF)
onUnmounted(() => URL.revokeObjectURL(pdfUrl.value))
</script>

<template>
    <embed :src="pdfUrl" type="application/pdf" width="100%" height="720px" />
    <VBtn :href="pdfUrl" download="Loan Application Form.pdf" class="bg-purple-darken-3">
        Download application form as PDF
    </VBtn>
    <VBtn
        type="submit"
        class="bg-orange-darken-4"
        @click.prevent="submit"
        :disabled="disableSubmit"
    >
        {{ disableSubmit ? 'Form Submitted' : 'Submit application form' }}
    </VBtn>
    <VAlert
        v-if="errorAlert"
        v-model="errorAlert"
        type="error"
        closable=""
        density="comfortable"
        elevation="5"
    >
        {{ errorMessage }}
    </VAlert>
</template>

<style scoped></style>
