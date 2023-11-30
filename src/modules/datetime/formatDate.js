const formatUTC = function (utcString) {
    return utcString.substring(0, 10)
}

// Date formatter
const formatDate = function (date) {
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    return `${year}-${month}-${day}`
}

export { formatUTC, formatDate }
