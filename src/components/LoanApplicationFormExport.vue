<script setup>
// Import packages
import { ref, onMounted } from 'vue'
import { PDFDocument } from 'pdf-lib'

// Import constants
import { API_URL, FILENAMES } from '../constants'

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

    // TODO: Fill form fields
    // const form = pdfDoc.getForm()

    // Flatten form fields
    // await form.flatten()

    // Save PDF bytes
    const pdfBytes = await pdfDoc.save()
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })
    pdfUrl.value = URL.createObjectURL(pdfBlob)
}

// Define lifecycle hooks
onMounted(fetchPDF)
</script>

<template>
    <embed :src="pdfUrl" type="application/pdf" width="100%" height="1080px" />
</template>

<style scoped></style>
