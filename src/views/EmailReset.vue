<template>
  <div class="login  d-flex justify-content-center">
    <div class="d-flex flex-column col-lg-4 col-sm-12">
      <div class="shadow card border">
        <div class="card-header border  header text-left h3 d-flex justify-content-between">
          <span class="align-self-center font-weight-bold text-primary">Request Reset Link</span>
          <router-link class="btn btn-sm btn-outline-light" to="/login">Back To Login</router-link>
        </div>
        <form @submit.prevent="reset" class="card-body text-left">
          <div class="input-group mb-3 text-left">
              <input class="form-control" type="email" v-model="email" placeholder="Enter Email">
          </div>
          <span class="font-weight-bold">We will email a reset link to the given email!</span>
          <button type="submit" class="btn btn-block btn-primary my-4 d-flex justify-content-center">
              <span v-show="!processing">Submit</span>
              <div v-if="processing">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'reset-email-link',
  data() {
    return {
      email: ''
    }
  },
  computed: {
    ...mapGetters(['processing'])
  },
  methods: {
    ...mapActions(['forgotReset']),
    reset(){
      this.forgotReset({
        email: this.email,
      })
      .then(response => {
        this.$router.push({path: '/login'})
      })
    },
  },
}
</script>

<style scoped>

.header {
    background: #2c2c35;
  }

</style>

