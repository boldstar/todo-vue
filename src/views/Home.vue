<template>
  <div class="home">
    
    <span v-if="successAlert">{{ successAlert }}</span>
    <div class="d-flex align-items-center flex-column">
      <div class="col-lg-6 col-sm-12 px-0 card-header shadow border d-flex justify-content-between">
      <h2 class="text-left px-3 mb-0 font-weight-bold">Todo List</h2>
      <h2 class="mb-0 font-weight-bold todo-count" v-if="getTodos">{{ getTodos.length }}</h2>
      </div>
      <input type="text" v-model="todo" placeholder="What needs to be done..." class="col-lg-6 col-sm-12 h4 text-light mb-0 px-4 todo" @keyup.enter="addTodo">
      <ul class="col-lg-6 col-sm-12 shadow p-0">
        <li class="card-body border text-left d-flex justify-content-between" v-for="todo in getTodos" :key="todo.id">
          <span class="align-self-center">{{ todo.todo }}</span>
          <div  v-if="$can('delete', todo)">
            <button class="btn btn-sm btn-light font-weight-bold text-danger" @click="deleteTodo(todo.id)">X</button>
          </div>
        </li>
      </ul>
    
    <div class="card-body shadow col-lg-6 col-sm-12" v-if="getTodos.length <= 0">
      <span>You Have No Todos!</span>
    </div>
 
  </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'home',
  data () {
    return {
        todo: '',
        complete: false,
        rulesData: false,
    }
  },
  computed: {
    ...mapGetters(['getTodos', 'createSession', 'successAlert']),
  },
  methods: {
     addTodo() {
      this.$store.dispatch('addTodo', 
        {
          todo: this.todo,
          complete: this.complete
        })
      this.todo = ""
    },
    deleteTodo(id) {
      this.$store.dispatch('deleteTodo', id)
    },
  },
  created() {
    this.$store.dispatch('retrieveTodos')
    var self = this
    setTimeout(() => {
      if(self.createSession.length > 0) {
        self.$store.dispatch('retrieveTodos')
        self.rulesData = true
      } else {
        self.rulesData = false
      }
    }, 3000)
  }
}
</script>

<style>

ul {
  list-style: none;
}

.todo-count {
  padding: 0 10px;
  margin-right: 20px;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 10px;
  background: #ffffff;
}

</style>

