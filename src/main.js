// Import packages
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'

// Import stylesheets
import '../public/assets/base.css'
import 'vuetify/lib/styles/main.css'
import '@mdi/font/css/materialdesignicons.css'
import 'nprogress/nprogress.css'

// Build the app
const app = createApp(App)

import IconLogo from '../src/components/IconLogo.vue'

app.use(createPinia())
app.use(router)
app.use(VueCookies, { expires: '30d', secure: true, sameSite: 'Lax' })
app.use(
    createVuetify({
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi
            },
            values: {
                logo: { // name of our custom icon
                    component: IconLogo, // our custom component
                },
            },
        }
    })
)

app.mount('#app')
