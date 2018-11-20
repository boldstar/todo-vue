import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import jQuery from 'jquery'
import Popper from 'popper.js'
global.jQuery = jQuery;
global.Popper = Popper;

import Default from './layouts/Default.vue';
Vue.component('default-layout', Default);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
