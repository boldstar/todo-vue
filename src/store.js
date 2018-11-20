import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://todo-laravel.test/api'

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
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
    }
  },
  actions: {
    retrieveTodos(context) {
      axios.get('/todos')
      .then(response => {
        context.commit('retrieveTodos', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    }
  }
})
