// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vuetify/dist/vuetify.min.css';
import store from '@/store';
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';


Vue.config.productionTip = false;

Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
