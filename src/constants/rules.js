export const FORM_RULES = Object.freeze({
    required: (v) => !!v || 'Required',
    min6: (v) => (v && v.length >= 6) || 'Minimum of 6 characters',
    min8: (v) => (v && v.length >= 8) || 'Minimum of 8 characters',
    max20: (v) => (v && v.length <= 20) || 'Maximum of 20 characters',
    max255: (v) => (v && v.length <= 255) || 'Maximum of 255 characters',
    username: (v) =>
        (v && /^[a-zA-Z0-9_]+$/.test(v)) || 'Username can only be alphanumeric and underscore',
    password: (v) =>
        (v && !/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(v)) ||
        'Password must contain at least one uppercase, one lowercase, one number and one special character'
})
