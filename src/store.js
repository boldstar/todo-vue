import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import storage from './utils/storage'
import { abilityPlugin, ability as appAbility } from './utils/ability'

export const ability = appAbility

Vue.use(Vuex)
axios.defaults.baseURL = 'https://todolaraveltest.club/api'

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
    token: localStorage.getItem('access_token') || null,
  },
  getters: {
    loggedIn(state) {
      return state.token != null;
    },
    getTodos(state) {
      return state.todos
    },
    createSession(state) {
      return state.rules
    },
    successAlert(state) {
      return state.alert
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
    importTodos(state, todos) {
      state.todos = todos
    },
    successAlert(state, alert) {
      state.alert = alert
    }
  },
  actions: {
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then(response => {
          context.commit('userRegistered', response.data)
          resolve(response)
        })
        .catch(error => {
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

      return new Promise((resolve, reject) => {
          axios.post('/login', {
              username: credentials.username,
              password: credentials.password,
          })
          .then(response => {
              const token = response.data.access_token

              localStorage.setItem('access_token', token)
              commit('createSession', response.data)
              resolve(response)
          })
          .catch(error => {
              console.log(error.response.data)
              reject(error)
          })
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
    downloadTodos(context) {
      axios.get('/download',{responseType: 'blob'})
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export_data.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.log(error)
      })
    },
    uploadTodos(context, file) {
      let formData = new FormData();
      formData.append('file', file);
      axios.post('/import', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then(response => {
        context.commit('successAlert', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    }
  }
})
