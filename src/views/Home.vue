<template>
  <div class="home">
    
    <span v-if="successAlert">{{ successAlert }}</span>
    <div class="d-flex align-items-center flex-column">
      <div class="col-6 px-0 card-header shadow border d-flex justify-content-between">
      <h2 class="text-left px-3 mb-0 font-weight-bold">Todo List</h2>
      <h2 class="mb-0 font-weight-bold todo-count">{{ getTodos.length }}</h2>
      </div>
      <input type="text" v-model="todo" placeholder="What needs to be done..." class="col-6 h4 text-light mb-0 px-4" @keyup.enter="addTodo">
      <ul class="col-6 shadow p-0">
        <li class="card-body border text-left d-flex justify-content-between" v-for="todo in getTodos" :key="todo.id">
          <span class="align-self-center">{{ todo.todo }}</span>
          <div  v-if="$can('delete', todo)">
            <button class="btn btn-sm btn-light font-weight-bold text-danger" @click="deleteTodo(todo.id)">X</button>
          </div>
        </li>
      </ul>
      <div class="d-flex">
        <div>
          <button class="btn btn-secondary mr-3" @click="downloadTodos">Download Todos</button>
        </div>
        <div class="d-flex">

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupFileAddon01">Upload Todos</span>
            </div>
            <div class="custom-file">
              <input type="file" class="custom-file-input" name="import_file" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" v-on:change="selectedFile($event)">
              <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
            </div>
          </div>
          <div>
            <button class="btn btn-primary ml-2" @click="uploadTodos">Submit</button>
          </div>
      
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <div class="card-body shadow col-6" v-if="getTodos.length <= 0">
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
        file:''
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
    downloadTodos() {
      this.$store.dispatch('downloadTodos')
    },
    selectedFile(event) {
      this.file = event.target.files[0]
    },
    uploadTodos() {
      this.$store.dispatch('uploadTodos', this.file);
    }
  },
  created() {
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

input {
  padding: 20px;
  background: #2c2c35;
  border: none;
}

.todo-count {
  padding: 0 10px;
  margin-right: 20px;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 10px;
  background: #ffffff;
}

</style>

