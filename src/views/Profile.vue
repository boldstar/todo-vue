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
      <div class="card-body border d-flex flex-wrap justify-content-around">
        <div class="d-flex mb-3">
          <i class="fa fa-user fa-7x align-self-center"></i>
        </div>
        <div class="text-left">
          <h2 class="mb-3">Name: {{ userProfile[0].name }}</h2>
          <h2 class="mb-4">Email: {{ userProfile[0].email }}</h2>
          <div class="d-flex justify-content-start my-3">
            <button class="btn btn-secondary mr-3" type="button">Edit Profile</button>
            <button class="btn btn-primary" type="button" @click="requestReset" :disabled="processing">
             <span v-show="!processing">Reset Password</span> 
              <div v-if="processing">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </div>
            </button>
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
    ...mapGetters(['userProfile', 'passwordAlert', 'processing'])
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

<style scoped>
  .lds-dual-ring {
      display: inline-block;
      width: 64px;
      height: 64px;
      margin-top: 100px;
      margin-bottom: 100px;
  }

  .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 46px;
      height: 46px;
      margin: 1px;
      border-radius: 50%;
      border: 5px solid #0077ff;
      border-color: #0077ff transparent #0077ff transparent;
      animation: lds-dual-ring 1.2s linear infinite;
  }
      @keyframes lds-dual-ring {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }

  .lds-ellipsis-container {
      position: absolute;
      right: 50%;
      padding-right: 20px;
  }

  .lds-ellipsis {
      display: inline-block;
      position: relative;
      width: 64px;
      height: 11px;
  }

  .lds-ellipsis div {
      position: absolute;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #fff;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .lds-ellipsis div:nth-child(1) {
      left: 6px;
      animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
      left: 6px;
      animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
      left: 26px;
      animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
      left: 45px;
      animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
      0% {
          transform: scale(0);
      }
      100% {
          transform: scale(1);
      }
      }
      @keyframes lds-ellipsis3 {
      0% {
          transform: scale(1);
      }
      100% {
          transform: scale(0);
      }
      }
      @keyframes lds-ellipsis2 {
      0% {
          transform: translate(0, 0);
      }
      100% {
          transform: translate(19px, 0);
      }
  }

</style>

