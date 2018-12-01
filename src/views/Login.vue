<template>
  <div class="login  d-flex justify-content-center">
    <div class="d-flex flex-column col-lg-4 col-sm-12">
      <div class="server-error" v-if="serverError">{{ serverError }}</div>
      <div class="shadow card border">
        <div class="card-header border  header text-left">
          <span class="font-weight-bold h3 text-primary">Login</span>
        </div>
        <form @submit.prevent="login" class="card-body">
          <div class="form-group mt-3 text-left">
              <label>Email address</label>
              <input type="text" name="email" class="form-control" placeholder="Enter email" v-model="username">
          </div>
          <div class="form-group mb-3 text-left">
              <label >Password</label>
              <input type="password" name="password" class="form-control" placeholder="Password"  v-model="password">
          </div>
          <button type="submit" class="btn btn-block btn-primary py-2 mb-3 d-flex justify-content-center">
              <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      serverError: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('retrieveToken', {
          username: this.username,
          password: this.password,
      })
      .then(response => {
          this.$router.push('/')
      })
      .catch(error => {
          this.serverError = error.response.data
          this.password = ''
      })
    }
  }
}
</script>

<style scoped>

  .server-error {
      margin-bottom: 15px;
      font-size: 16px;
      padding: 10px 16px;
      color: #a94442;
      background: #F3DEDE;
      border-radius: 4px;
  }

  .header {
    background: #2c2c35;
  }

</style>


