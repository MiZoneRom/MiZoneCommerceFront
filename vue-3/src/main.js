import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import installElementPlus from '@/plugins/element'
import axios from '@/plugins/axios';

console.log(process.env);

const app = createApp(App).use(router)
installElementPlus(app);
axios(app);
app.mount('#app');