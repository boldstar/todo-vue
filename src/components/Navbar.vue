<template>
<div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top" v-if="loggedIn">
      <router-link class="navbar-brand" to="/">TodoVue</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <div v-if="loggedIn">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" v-bind:class="{ 'active': isActive }">
                    <router-link class="nav-link" to="/" >Home <span class="sr-only">Home</span></router-link>
                </li>
                <li class="nav-item" v-bind:class="{ 'active': isActive }">
                    <router-link class="nav-link" to="/admin" v-bind:class="{ 'active': isActive }">Admin</router-link>
                </li>
            </ul>
        </div>
        
      </div>

        <ul class="navbar-nav" v-if="loggedIn">
            <li class="nav-item">
                <button type="button" class="btn btn-dark" @click="logout">Logout</button>
            </li>
        </ul>

        
    </nav>

    <nav class="navbar navbar-expand-md fixed-top d-flex justify-content-end">
        <ul class="navbar-nav" v-if="!loggedIn">
            <li class="nav-item">
                <router-link class="nav-link text-dark" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link text-dark" to="/register">Register</router-link>
            </li>
        </ul>
    </nav>
   
</div>
     

</template>

<script>
export default {
    name: 'navbar',
    data () {
        return {
            isActive: false
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('destroyToken')
            .then(response => {
                    this.$router.push('/login')
            })
        },
    }
}
</script>

<style>

.active {
    color: white;

}

</style>

