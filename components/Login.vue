<template>
  <div>
    <section class="bodyContent">
      <div
        class="container d-flex justify-content-center align-self-center"
        style="min-height: 100vh"
      >
        <form class="my-auto">
          <h1 class="mb-5">Welcome to Lou Geh Supermarket</h1>
          <img
            class="mb-5"
            src="undraw_shopping_app_flsj.svg"
            alt=""
            width="400"
            height="200"
          />
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Username..."
              required
              v-model="username"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password..."
              required
              v-model="password"
            />
          </div>
          <button @click="login()" class="btn-danger mt-4 py-2">
            LOG IN <i class="fas fa-sign-in-alt"></i>
          </button>
          <div class="mt-5">Copyright &copy; 2021 Yong Pin L. Bong</div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
