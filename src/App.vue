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
