<template>
  <div class="login  d-flex justify-content-center">
    <div class="col-lg-4 col-sm-12">
      <div class="server-error" v-if="serverError">{{ serverError }}</div>
      <div class="bg-light align-self-center p-3 font-weight-bold d-flex justify-content-between" v-if="passwordAlert">
      <div class="align-self-center">
        {{ passwordAlert.message }}
        </div>
        <button type="button" class="btn btn-primary btn-sm" @click="clearAlert">X</button>  
      </div>
      <div class="shadow card border">
        <div class="card-header border  header text-left">
          <span class="font-weight-bold h3 text-primary">Login</span>
        </div>
        <form @submit.prevent="login" class="card-body">
          <div class="form-group mt-3 text-left">
              <label>Email address</label>
              <input type="email" name="email" class="form-control" placeholder="Enter email" v-model="username">
          </div>
          <div class="form-group mb-3 text-left">
              <label >Password</label>
              <input type="password" name="password" class="form-control" placeholder="Password"  v-model="password">
          </div>
          <button type="submit" class="btn btn-block btn-primary py-2 d-flex justify-content-center">
              <span>Login</span>
          </button>
        </form>
        <span class="mb-3">Forgot Password? <router-link to="/get-reset-link">Click Here</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      serverError: '',
    }
  },
  computed: {
    ...mapGetters(['passwordAlert'])
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
    },
    clearAlert() {
      this.$store.commit('clearAlert')
    }
  }
}
</script>

<style>

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


