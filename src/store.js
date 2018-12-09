import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import storage from './utils/storage'
import { abilityPlugin, ability as appAbility } from './utils/ability'

export const ability = appAbility

Vue.use(Vuex)
axios.defaults.baseURL = 'https://backend.todovuetest.net/api'

export default new Vuex.Store({
  plugins: [
    storage({
      storedKeys: ['rules', 'token'],
      destroyOn: ['destroySession']
    }),
    abilityPlugin
  ],
  state: {
    todos: [],
    user: '',
    rules: [],
    alert: '',
    passwordalert: '',
    resetToken:'',
    processing: false,
    token: localStorage.getItem('access_token') || null,
  },
  getters: {
    loggedIn(state) {
      return state.token != null;
    },
    resetToken(state) {
      return state.resetToken
    },
    getTodos(state) {
      return state.todos
    },
    createSession(state) {
      return state.rules
    },
    successAlert(state) {
      return state.alert
    },
    userProfile(state) {
      return state.user
    },
    passwordAlert(state) {
      return state.passwordalert
    },
    processing(state) {
      return state.processing
    }
  },
  mutations: {
    userRegistered(state, user) {
      state.user = user
    },
    createSession(state, session) {
      state.rules = session[0]
      state.token = session.access_token
    },
    destroySession(state) {
      state.rules = ''
    },
    resetToken(state, token) {
      state.resetToken = token
    },
    addTodo(state, todo) {
      state.todos.push(todo)
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    retrieveTodos(state, todos) {
      state.todos = todos
    },
    destroyToken(state) {
      state.token = null
    },
    successAlert(state, alert) {
      state.alert = alert
    },
    updatePassword(state, alert) {
      state.passwordalert = alert
    },
    userProfile(state, user) {
      state.user = user
    },
    passwordAlert(state, alert) {
      state.passwordalert = alert
    },
    clearAlert(state) {
      state.passwordalert = ''
    },
    startProcess(state) {
      state.processing = !state.processing
    }
  },
  actions: {
    register(context, data) {
      context.commit('startProcess')
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then(response => {
          context.commit('startProcess')
          context.commit('userRegistered', response.data)
          resolve(response)
        })
        .catch(error => {
          context.commit('startProcess')
          reject(error.response.data)
        })
      })
    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
          .then(response => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            context.commit('destroySession')
            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            reject(error)
          })
        })
      }
    },
    retrieveToken({ commit }, credentials) {
      commit('startProcess')
      return new Promise((resolve, reject) => {
          axios.post('/login', {
              username: credentials.username,
              password: credentials.password,
          })
          .then(response => {
              commit('startProcess')
              const token = response.data.access_token

              localStorage.setItem('access_token', token)
              commit('createSession', response.data)
              resolve(response)
          })
          .catch(error => {
              commit('startProcess')
              console.log(error.response.data)
              reject(error)
          })
      })
    },
    userProfile(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      
      axios.get('/userProfile')
      .then(response => {
        context.commit('userProfile', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    retrieveTodos(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/todos')
      .then(response => {
        context.commit('retrieveTodos', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    addTodo(context, todo) {
      axios.post('/todos',{
        todo: todo.todo,
        complete: false
      })
      .then(response => {
        context.commit('addTodo', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    deleteTodo(context, id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.delete('/todos/' + id)
      .then(() => {
        context.commit('deleteTodo', id)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    requestReset(context, email) {
      context.commit('startProcess')
      axios.post('/password/create', {
        email: email
      })
      .then(response => {
        context.commit('passwordAlert', response.data)
        context.commit('startProcess')
      })
      .catch(error => {
        console.log(error.response.data)
        context.commit('startProcess')
      })
    },
    forgotReset(context, email) {
      context.commit('startProcess')
      axios.post('/password/create', {
        email: email.email
      })
      .then(response => {
        context.commit('passwordAlert', response.data)
        context.commit('startProcess')
      })
      .catch(error => {
        console.log(error.response.data)
        context.commit('passwordAlert', error.response.data)
        context.commit('startProcess')
      })
    },
    retrieveResetToken(context, token) {
      axios.get('/password/find/' + token)
      .then(response => {
        context.commit('resetToken', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    updatePassword(context, data) {
      axios.post('/password/reset', {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        token: data.token
      })
      .then(response => {
        context.commit('updatePassword', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    }
  }
})
