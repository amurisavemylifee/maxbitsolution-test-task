import { createApp } from 'vue'
import App from './app/App.vue'
import { createAppRouter } from './app/providers/router'
import { createAppStore } from './app/providers/store'
import './shared/styles/base.css'

const app = createApp(App)
const router = createAppRouter()
const pinia = createAppStore()

app.use(pinia)
app.use(router)
app.mount('#app')
