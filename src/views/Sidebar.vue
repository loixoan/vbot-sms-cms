
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
                      :class="{ active: route.path === '/' }"
                      to="/">
            <div class="sb-nav-link-icon"><i class="fas fa-angle-right"></i></div>
            DashBoard
          </RouterLink>
          <div class="sb-sidenav-menu-heading">
            Brandname Price
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
            Giá
          </RouterLink>
          <div class="sb-sidenav-menu-heading">
            Template
          </div>
          <RouterLink class="nav-link link-menu"
             :class="{ active: route.path === '/template' }"
             to="/template">
            <div class="sb-nav-link-icon"><i class="fas fa-angle-right"></i></div>
            Template
          </RouterLink>
          <div class="sb-sidenav-menu-heading">
            Chiến dịch
          </div>
          <RouterLink class="nav-link link-menu"
                      :class="{ active: route.path === '/campaign-group' }"
                      to="/campaign-group">
            <div class="sb-nav-link-icon"><i class="fas fa-angle-right"></i></div>
            Nhóm chiến dịch
          </RouterLink>
          <RouterLink class="nav-link link-menu"
                      :class="{ active: route.path === '/campaign-phone' }"
                      to="/campaign-phone">
            <div class="sb-nav-link-icon"><i class="fas fa-angle-right"></i></div>
            Số điện thoại
          </RouterLink>
          <RouterLink class="nav-link link-menu"
                      :class="{ active: route.path === '/campaign' }"
                      to="/campaign">
            <div class="sb-nav-link-icon"><i class="fas fa-angle-right"></i></div>
            Chiến dịch
          </RouterLink>
          <div class="sb-sidenav-menu-heading">
            Custom Field
          </div>
          <RouterLink class="nav-link link-menu"
                      :class="{ active: route.path === '/field' }"
                      to="/field">
            <div class="sb-nav-link-icon"><i class="fas fa-angle-right"></i></div>
            Field
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