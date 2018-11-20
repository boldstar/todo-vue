import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      { 
        id: 1,
        todo: 'Clean dishes',
        complete: false
      },
      { 
        id: 2,
        todo: 'Do homework',
        complete: false
      },
      { 
        id: 3,
        todo: 'Win at life',
        complete: false
      },
    ]
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
    }
  },
  actions: {

  }
})
