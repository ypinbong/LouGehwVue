<template>
    <div class="bodyContent">
      <div class="container py-3" style="min-height: 100vh">
        <div class="container mt-2 mb-2">
          <img
            class="mt-5"
            src="undraw_add_post_64nu.svg"
            alt=""
            width="200"
            height="120"
          />
          <h1 class="text-center mt-3">Add a New Transaction</h1>
        </div>
        <MakeTransactionForm />
      </div>
    </div>
</template>

<script>

import MakeTransactionForm from "~/components/MakeTransactionForm.vue";
    export default {
        layout: "default",
        name: "MakeTransactions",
        component:{
          MakeTransactionForm
        }
    };
</script>

<style lang="scss" scoped>

</style>