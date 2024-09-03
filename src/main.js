import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia();

app.config.globalProperties.$filters = {
    capitalise(value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }
  }

app.use(pinia);
app.mount('#app')
