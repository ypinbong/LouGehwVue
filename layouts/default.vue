<template>
  <div>
    <header class="navigation sticky-top">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="header__logo">
          <a href="/"
            ><img src="LGlongLogo.png" alt="Lou Geh Logo"
          /></a>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-nav"
          aria-controls="navbar-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item mx-2">
              <NuxtLink class="nav-link" to="/suppliers">Suppliers</NuxtLink>
            </li>
            <li class="nav-item mx-2">
              <NuxtLink class="nav-link" to="/shop">Shop</NuxtLink>
            </li>
            <li class="nav-item mx-2">
              <NuxtLink class="nav-link" to="/customers">Customers</NuxtLink>
            </li>
            <b-nav-item-dropdown class="mx-2" id="dropdown-1" text="Transactions">
              <b-dropdown-item to="/transactions">All Transactions</b-dropdown-item>
              <b-dropdown-item to="/makeTransactions">Make a Transaction</b-dropdown-item>
            </b-nav-item-dropdown>
            <li class="nav-item mx-2">
              <a class="nav-link" href="/">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <Nuxt />
    <footer class="footer fixed-bottom">
      Copyright &copy; 2021 Yong Pin L. Bong
    </footer>
  </div>
</template>

<style>
</style>
