<template>
  <div class="profile d-flex justify-content-center" v-if="userProfile">
    <div class="col-lg-6 col-sm-12 card-body shadow-sm border">
      <i class="fa fa-user fa-5x mb-3"></i>
      <h1 class="mb-3">{{ userProfile[0].name }}</h1>
      <h2 class="mb-3">{{ userProfile[0].email }}</h2>
      <div class="d-flex justify-content-center my-3">
        <button class="btn btn-secondary mr-3" type="button">Edit Profile</button>
        <button class="btn btn-primary" type="button" @click="requestReset">Reset Password</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'profile',
  computed: {
    ...mapGetters(['userProfile'])
  },
  methods: {
    requestReset() {

    }
  },
  created() {
    this.$store.dispatch('userProfile')
  }
}
</script>

