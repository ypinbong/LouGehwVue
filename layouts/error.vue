<template>
  <div class="container">
    <div class="errorContainer">
      <img
        src="undraw_page_not_found_su7k.svg"
        alt="undraw_page_not_found_su7k.svg"
        class="errHeaderImg"
      />
      <div class="errorBody">
        <h1>There was an unexpected Error!!!</h1>
        <h1>
          Try reloading the page or head to a different page using the
          nagivation at the top.
        </h1>
        <b-button class="mt-4" autofocus @click="reload()" variant="danger"
          >Reload</b-button
        >
      </div>
      <img
        src="undraw_not_found_60pq.svg"
        alt="undraw_not_found_60pq.svg"
        class="errFooterImg"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    reload() {
      window.location.reload()
    },
  },
}
</script>

<style lang="scss" scoped></style>
