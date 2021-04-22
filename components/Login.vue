<template>
  <div>
    <section class="bodyContent">
      <div
        class="container d-flex justify-content-center align-self-center"
        style="min-height: 100vh"
      >
        <form class="my-auto" @submit.prevent="userLogin">
          <h1 class="mb-5">Welcome to Lou Geh Supermarket</h1>
          <img
            class="mb-5"
            src="undraw_shopping_app_flsj.svg"
            alt=""
            width="400"
            height="200"
          />
          <div class="form-row mb-4">
            <input
              id="loginUsernameId"
              type="text"
              class="form-control"
              placeholder="Username..."
              required
              v-model="userInfo.username"
            />
          </div>
          <div class="form-row">
            <input
              id="loginPasswordId"
              type="password"
              class="form-control"
              placeholder="Password..."
              required
              v-model="userInfo.password"
            />
          </div>
          <button
            @click="userLogin()"
            class="btn-danger mt-4 py-2"
            :disabled="!isComplete"
          >
            LOG IN <i class="fas fa-sign-in-alt"></i>
          </button>
          <div class="mt-5">Copyright &copy; 2021 Lou Geh Supermarket</div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: '',
      },
    }
  },
  computed: {
    isComplete() {
      return this.userInfo.username && this.userInfo.password
    },
  },
  methods: {
    userLogin() {
      console.log('username:', this.userInfo.username)
      console.log('password:', this.userInfo.password)
      this.$store
        .dispatch('Userlogin/tryToLogTheUserIn', {
          userName: this.userInfo.username,
          password: this.userInfo.password,
        })
        .then((res) => {
          console.log('Resdasdada:', res)
          // localStorage.message = res.message
          localStorage.token = res.token
          // console.log('hello tanya markova', localStorage.username)
          this.$router.push({ path: '/Customers' })
          // this.$router.push({ name: 'Customers' })
        })
        .catch((err) => {
          console.log('AHDH', err)
          this.showResult(err.response.data.error, 'danger')
        })
    },
    // async userLogin() {
    //   let userName = this.userInfo.username
    //   let password = this.userInfo.password
    //   await this.$auth
    //     .loginWith('local', {
    //       data: { userName, password },
    //     })
    //     .then((result) => {
    //       console.log('This is the Result1', result)
    //       this.$router.push('/shop')
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    showResult(msg, variant, title) {
      this.$bvToast.toast(`${msg}`, {
        title: title,
        toaster: 'b-toaster-bottom-right',
        solid: true,
        variant: variant,
        appendToast: true,
        noCloseButton: true,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
