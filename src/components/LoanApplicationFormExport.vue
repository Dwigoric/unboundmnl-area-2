<script setup>
// Import packages
import { ref, onMounted } from 'vue'
import { PDFDocument } from 'pdf-lib'

// Import constants
import { API_URL, FILENAMES } from '../constants'

// Import stores
import { useApplicationFormStore } from '../stores/applicationForm'
const appFormStore = useApplicationFormStore()

// Define reactive variables
const pdfUrl = ref('')

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
    if (loanData.classification === 'new') {
        form.getCheckBox('New').check()
    } else {
        form.getCheckBox('Renewal').check()
    }

    // Set term
    form.getTextField('Term').setText(loanData.term)

    // Set amount
    form.getTextField('Amount').setText(loanData.amount.toLocaleString())

    // Set type of loan
    switch (loanData.type) {
        case 'education':
            form.getCheckBox('Education').check()
            break
        case 'personal':
            form.getCheckBox('Personal').check()
            break
        case 'micro':
            form.getCheckBox('Micro').check()
            break
        case 'utilities':
            form.getCheckBox('Utility').check()
            break
        case 'construction':
            form.getCheckBox('House').check()
            break
        case 'emergency':
            form.getCheckBox('Emergency').check()
            break
        case 'commodity':
            form.getCheckBox('Commodity').check()
            break
    }

    // Set borrower's information
    form.getTextField('Last Name').setText(appFormStore.userData.name.last)
    form.getTextField('First Name').setText(appFormStore.userData.name.given)
    form.getTextField('Middle Name').setText(appFormStore.userData.name.middle)
    const birthday = new Date(appFormStore.userData.birthday)
    form.getTextField('Date of Birth').setText(
        birthday.toLocaleDateString('en-PH', { dateStyle: 'long' })
    )
    form.getTextField('Age').setText(
        Math.abs(birthday.getUTCFullYear() - new Date().getUTCFullYear()).toLocaleString()
    )
    form.getTextField('Place of Birth').setText(appFormStore.userData.birthplace)
    if (appFormStore.userData.gender === 'M') form.getCheckBox('Male').check()
    else form.getCheckBox('Female').check()
    form.getTextField('Tin No').setText(appFormStore.userData.tin_no)
    form.getTextField('Civil Status').setText(appFormStore.userData.civil_status)
    form.getTextField('Contact No').setText(appFormStore.userData.contact_no)
    form.getTextField('Address').setText(
        [
            appFormStore.userData.address.street,
            appFormStore.userData.address.barangay,
            appFormStore.userData.address.city,
            appFormStore.userData.address.province
        ].join(', ')
    )
    form.getTextField('Monthly Income').setText(
        appFormStore.userData.monthly_income.toLocaleString()
    )
    form.getTextField('Source of Income').setText(appFormStore.userData.source_of_income)

    // Set spouse's information
    if (appFormStore.userData.civil_status === 'Married') {
        form.getTextField('Spouse Last Name').setText(appFormStore.userData.spouse.name.last)
        form.getTextField('Spouse First Name').setText(appFormStore.userData.spouse.name.given)
        form.getTextField('Spouse Middle Name').setText(appFormStore.userData.spouse.name.middle)
        const spouseBirthday = new Date(appFormStore.userData.spouse.birthday)
        form.getTextField('Spouse Date of Birth').setText(
            spouseBirthday.toLocaleDateString('en-PH', { dateStyle: 'long' })
        )
        form.getTextField('Spouse Age').setText(
            Math.abs(spouseBirthday.getUTCFullYear() - new Date().getUTCFullYear()).toLocaleString()
        )
        form.getTextField('Spouse Place of Birth').setText(appFormStore.userData.spouse.birthplace)
        form.getTextField('Spouse Source of Income').setText(
            appFormStore.userData.spouse.source_of_income
        )
        form.getTextField('Spouse Contact No').setText(appFormStore.userData.spouse.contact_no)
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
</script>

<template>
    <embed :src="pdfUrl" type="application/pdf" width="100%" height="720px" />
    <VBtn :href="pdfUrl" download="Loan Application Form.pdf" class="bg-purple-darken-3">
        Download application form as PDF
    </VBtn>
</template>

<style scoped></style>
