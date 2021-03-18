import Vue from 'vue';
import '@/plugins/axios';
import App from '@/App.vue';

import vuetify from '@/plugins/vuetify';
import VuetifyDialog from 'vuetify-dialog';
import 'vuetify-dialog/dist/vuetify-dialog.css';
Vue.use(VuetifyDialog, { context: { vuetify } });

import store from '@/store';
import router from '@/router';
import './plugins/remoteRouter';

import 'babel-polyfill';

Vue.config.productionTip = false

new Vue({
	vuetify,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
