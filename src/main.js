import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from 'jquery'
import Popper from 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { abilitiesPlugin } from '@casl/vue'
import { ability } from './utils/ability'
global.jQuery = jQuery;
global.Popper = Popper;

import Default from './layouts/Default.vue';
import Landing from './layouts/Landing.vue';
import ResetPassword from './layouts/ResetPassword.vue';
Vue.component('default-layout', Default);
Vue.component('landing-layout', Landing);
Vue.component('reset-layout', ResetPassword);
Vue.use(abilitiesPlugin, ability)

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if yes, redirect to home page.
    if (store.getters.loggedIn) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.passwordReset)) {
    // if route to reset password user can access regardless
    if (store.getters.loggedIn || !store.getters.loggIn) {
      next()
    }
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
