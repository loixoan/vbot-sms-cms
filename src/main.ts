
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'select2/dist/css/select2.min.css';
import 'select2/dist/js/select2.min.js';
const app = createApp(App)
app.use(ToastPlugin);
app.use(router)

app.mount('#app')
