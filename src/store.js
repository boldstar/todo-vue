import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://todo-laravel.test/api'

export default new Vuex.Store({
  state: {
    todos: [],
    token: localStorage.getItem('access_token') || null,
  },
  getters: {
    loggedIn(state) {
      return state.token != null;
    },
    getTodos(state) {
      return state.todos
    }
  },
  mutations: {
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
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
  },
  actions: {
    register(data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then(response => {
          console.log(response)
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
    retrieveToken({ commit}, credentials) {

      return new Promise((resolve, reject) => {
          axios.post('/login', {
              username: credentials.username,
              password: credentials.password,
          })
          .then(response => {
              const token = response.data.access_token

              localStorage.setItem('access_token', token)
              commit('retrieveToken', token)
              resolve(response)
          })
          .catch(error => {
              console.log(error)
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
      axios.post('/todos/' + todo.id, {
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
      axios.delete('/todos' + id)
      .then(() => {
        context.commit('deleteTodo', id)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    }
  }
})
