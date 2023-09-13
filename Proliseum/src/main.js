import './assets/main.css'
import 'mosha-vue-toastify/dist/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './axios/axios.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
