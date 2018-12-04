<template>
  <div class="profile d-flex flex-column justify-content-center" v-if="userProfile">
    <div class="bg-light col-lg-6 col-sm-12 align-self-center p-3 font-weight-bold d-flex justify-content-between" v-if="passwordAlert">
      <div class="align-self-center">
        {{ passwordAlert.message }}
      </div>
      <button type="button" class="btn btn-primary btn-sm" @click="clearAlert">X</button>  
    </div>
    <div class="col-lg-6 col-sm-12 align-self-center shadow card p-0">
      <div class="card-header border text-left">
        <h2 class="mb-0">Profile</h2>
      </div>
      <div class="card-body border d-flex justify-content-around">
        <div class="d-flex">
          <i class="fa fa-user fa-7x align-self-center"></i>
        </div>
        <div class="text-left">
          <h2 class="mb-3">Name: {{ userProfile[0].name }}</h2>
          <h2 class="mb-4">Email: {{ userProfile[0].email }}</h2>
          <div class="d-flex justify-content-start my-3">
            <button class="btn btn-secondary mr-3" type="button">Edit Profile</button>
            <button class="btn btn-primary" type="button" @click="requestReset">Reset Password</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'profile',
  computed: {
    ...mapGetters(['userProfile', 'passwordAlert'])
  },
  methods: {
    requestReset() {
      this.$store.dispatch('requestReset', this.userProfile[0].email)
    },
    clearAlert() {
      this.$store.commit('clearAlert')
    }
  },
  created() {
    this.$store.dispatch('userProfile')
  }
}
</script>


