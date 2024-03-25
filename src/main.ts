import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { setupDevtools } from './customDevtools'

const app = createApp(App)

app.use(createPinia())

setupDevtools(app)

app.mount('#app')
