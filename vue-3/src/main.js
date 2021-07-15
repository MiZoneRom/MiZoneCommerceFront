import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store';
import router from '@/router'

//ElementUI
import installElementPlus from '@/plugins/element'
//axios
import axios from '@/plugins/axios';

import remoteRouter from '@/plugins/remoteRouter';

const app = createApp(App).use(store).use(router).use(axios);

//ElementPlus
installElementPlus(app);

remoteRouter(app, router);

app.mount('#app');