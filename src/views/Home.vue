<template>
  <div class="home">
    
    <div class="d-flex align-items-center flex-column">
      <div class="col-6 px-0 card-header shadow border d-flex justify-content-between">
      <h2 class="text-left px-3 mb-0 font-weight-bold">Todo List</h2>
      <h2 class="mb-0 font-weight-bold todo-count text-light">{{ getTodos.length }}</h2>
      </div>
      <input type="text" v-model="todo" placeholder="What needs to be done..." class="col-6 h4 text-light mb-0 px-4" @keyup.enter="addTodo">
      <ul class="col-6 shadow p-0">
        <li class="card-body border text-left d-flex justify-content-between" v-for="todo in getTodos" :key="todo.id">
          {{ todo.todo }}
          <button class="btn btn-sm btn-danger font-weight-bold" @click="deleteTodo(todo.id)">X</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'home',
  data () {
    return {
    
        idForTodo: 4,
        todo: '',
        complete: false

    }
  },
  computed: {
    ...mapGetters(['getTodos']),
  },
  methods: {
     addTodo() {
      this.$store.commit('addTodo', 
        {
          id: this.idForTodo,
          todo: this.todo,
          complete: this.complete
        })
      this.todo = ""
      this.idForTodo++
    },
    deleteTodo(id) {
      this.$store.commit('deleteTodo', id)
    }
  }
}
</script>

<style>

ul {
  list-style: none;
}

input {
  padding: 20px;
  background: #2c2c35;
  border: none;
}

.todo-count {
  padding: 0 10px;
  margin-right: 20px;
  border: 1px solid;
  border-radius: 10px;
  background: #2c2c35;
}

</style>

