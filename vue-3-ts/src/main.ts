import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import { axios } from './plugins/axios';

const app = createApp(App);

installElementPlus(app)

app.use(store);
app.use(router);
app.use(axios);
app.mount('#app');