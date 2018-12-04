import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        requiresVisitor: true,
        layout: 'landing'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
      meta: {
        requiresVisitor: true,
        layout: 'landing'
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/password-reset/:token',
      name: 'password-reset',
      component: () => import('./views/Reset.vue'),
      meta: {
        passwordReset: true,
        layout: 'reset'
      }
    },
    {
      path: '/get-reset-link',
      name: 'get-reset-link',
      component: () => import('./views/EmailReset.vue'),
      meta: {
        requiresVisitor: true,
        layout: 'landing'
      }
    }
  ],
  mode: 'history'
})
