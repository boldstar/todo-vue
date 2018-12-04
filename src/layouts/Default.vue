<template>
  <div id="app">

    <Navbar  />

<!-- this section is controling the main content section -->
    <main role="main" class="col-lg-12 px-3"> 
      <div class="page-wrapper">
        <slot />
      </div>
    </main>
        
          
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
  computed: {
   
  },
}
</script>


