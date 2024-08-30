
<script setup>
import {useRoute} from "vue-router";

const route = useRoute();
</script>
<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">
            Trang chủ
          </div>
          <RouterLink class="nav-link link-menu "
                      :class="{ active: route.path === '/brandname' }"
                      to="/brandname">
            <div class="sb-nav-link-icon"><i class="fas fa-angle-right"></i></div>
            Brandname
          </RouterLink>
          <RouterLink class="nav-link link-menu"
                      :class="{ active: route.path === '/brandname-price' }"
                      to="/brandname-price">
            <div class="sb-nav-link-icon"><i class="fas fa-angle-right"></i></div>
            Price
          </RouterLink>
          <RouterLink class="nav-link link-menu"
             :class="{ active: route.path === '/template' }"
             to="/template">
            <div class="sb-nav-link-icon"><i class="fas fa-angle-right"></i></div>
            Template
          </RouterLink>
          <RouterLink class="nav-link link-menu"
                      :class="{ active: route.path === '/cdr' }"
                      to="/cdr">
            <div class="sb-nav-link-icon"><i class="fas fa-angle-right"></i></div>
            CDR
          </RouterLink>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup lang="ts">
</script>