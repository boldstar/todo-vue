<template>
  <div class="register d-flex justify-content-center">
    <div class="d-flex flex-column col-lg-4 col-sm-12">
      <div class="server-error" v-if="serverErrors">
          <div v-for="(value, key) in serverErrors" :key="key">
              {{ value[0] }}
          </div>
      </div>
      <div class="card border">
       <div class="card-header border  header text-left">
          <span class="font-weight-bold h3 text-primary">Register</span>
        </div>
      <form @submit.prevent="register" class="card-body text-left">
        <div class="form-group mt-3">
            <label>Name</label>
            <input type="text" name="name" class="form-control" placeholder="Enter name"  v-model="name" >
        </div>
        <div class="form-group">
            <label>Email address</label>
            <input type="text" name="email" class="form-control" placeholder="Enter email"  v-model="email"> 
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" class="form-control" placeholder="Password" v-model="password" >    
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input">
            <label class="form-check-label">Agree To Terms: <span><a href="#">Read Here</a></span> </label>
        </div>
        <button type="submit" class="btn btn-block btn-primary mb-3 d-flex justify-content-center">
            <span>Create Account</span>
        </button>
      </form>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
       serverErrors: '',
    }
  },
  methods: {
    register() {
      this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password,
      })
      .then(response => {
          this.$router.push({ name: 'login'})
      })
      .catch(error => {
          this.serverErrors = Object.values(error.response.data.errors)
      })
    }
  }
}
</script>

<style>

.header {
  background: #2c2c35;
}
</style>


