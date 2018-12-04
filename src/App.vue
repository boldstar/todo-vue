<template>
    <div id="app">

        <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
            
            <component :is="layout"> 
                    <router-view />
            </component>
         
        </transition>

    </div>
</template>

<script>
const default_layout = "default";

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || default_layout) + '-layout';
        },
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

[role="main"] {
  padding-top: 100px; /* Space for fixed navbar  / adds space below navbar */
}

.todo {
  padding: 20px;
  background: #2c2c35;
  border: none;
}

.is-active {
    color: rgb(69, 197, 127);

}

</style>
