<template>
  <div class="register">
    <div class="server-error" v-if="serverErrors">
        <div v-for="(value, key) in serverErrors" :key="key">
            {{ value[0] }}
        </div>
    </div>
    <form @submit.prevent="register">
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
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
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

