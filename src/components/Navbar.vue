<template>
     <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <router-link class="navbar-brand" to="/">TodoVue</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" v-bind:class="{ 'active': isActive }">
            <router-link class="nav-link" to="/" >Home <span class="sr-only">Home</span></router-link>
          </li>
          <li class="nav-item" v-bind:class="{ 'active': isActive }">
            <router-link class="nav-link" to="/admin" v-bind:class="{ 'active': isActive }">Admin</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link class="nav-link" to="/logout">Logout</router-link>
            </li>
        </ul>
      </div>
    </nav>

</template>

<script>
export default {
    name: 'navbar',
    data () {
        return {
            isActive: false
        }
    }
}
</script>

<style>

.active {
    color: white;

}

</style>

