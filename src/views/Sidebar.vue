<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">View</div>
          <RouterLink class="nav-link" to="/about">
            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
            Dashboard
          </RouterLink>
          <div class="sb-sidenav-menu-heading">User</div>
          <RouterLink class="nav-link" to="/brandname-price">
            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
            Brandname Price
          </RouterLink>
          <a class="nav-link" href="#">
            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
            Users
          </a>

          <a class="nav-link" href="#">
            <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
            CDR
          </a>
          <div class="sb-sidenav-menu-heading">SYSTEM</div>
          <a class="nav-link" href="#">
            <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
            Trunks <small class="ms-2">(Provider)</small>
          </a>
          <a class="nav-link" href="#">
            <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
            System Users
          </a>

          <a class="nav-link" href="#">
            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
            Logs
          </a>
        </div>
      </div>
      <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        VPM Voice gateway
      </div>
    </nav>
  </div>
</template>