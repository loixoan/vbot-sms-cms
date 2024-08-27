<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import Header from "@/views/Header.vue";
import Sidebar from "@/views/Sidebar.vue";
import Footer from "@/views/Footer.vue";
</script>
<template>
  <Header/>

  <div id="layoutSidenav">
    <Sidebar/>
    <div id="layoutSidenav_content">
      <main>
        <RouterView/>
      </main>
      <Footer/>
    </div>
  </div>
</template>

<style scoped>
</style>
