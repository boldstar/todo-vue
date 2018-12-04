<template>
<div>
    <nav class="navba p-2 d-flex navbar-dark bg-dark fixed-top" v-if="loggedIn">
        <router-link class="navbar-brand" to="/"><img class="logo" src="@/assets/todo.png" alt=""></router-link>     
        <ul class="navbar-nav font-weight-bold ml-lg-auto d-flex flex-row mt-1" v-if="loggedIn">
            <li class="nav-item mr-3" v-bind:class="{ 'is-active': isActive }">
                <router-link class="nav-link text-light" to="/" >Home</router-link>
            </li>
            <li class="nav-item" v-bind:class="{ 'is-active': isActive }">
                <router-link class="nav-link text-light" to="/profile">Profile</router-link>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <button type="button" class="btn btn-dark pt-2" @click="logout">Logout
                    <i class="fas fa-sign-out-alt ml-2"></i>
                </button>
            </li>
        </ul>
    </nav>

    <nav class="navbar fixed-top d-flex justify-content-end">
        <ul class="navbar-nav flex-row font-weight-bold" v-if="!loggedIn">
            <li class="nav-item">
                <router-link class="nav-link mr-4 text-dark" to="/login">Login</router-link>
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
            isActive: false,
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

.is-active {
    color: rgb(69, 197, 127);

}

.logo {
    height: 1.8em;
    margin-left: 10px;
}

</style>

