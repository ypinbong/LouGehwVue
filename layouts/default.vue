<template>
  <div>
    <header class="sticky-top">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="header__logo">
          <a href="index.html"
            ><img src="LGlongLogo.png" alt="Lou Geh Logo"
          /></a>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
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
              <a class="nav-link active" href="shop.html">Shop</a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link" href="customers.html">Customers</a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link" href="suppliers.html">Suppliers</a>
            </li>
            <b-nav-item-dropdown id="dropdown-1" text="Transactions">
              <b-dropdown-item href="#">All Transactions</b-dropdown-item>
              <b-dropdown-item href="#">Make a Transaction</b-dropdown-item>
            </b-nav-item-dropdown>
            <li class="nav-item mx-2">
              <a class="nav-link" href="index.html">Logout</a>
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
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
