<template>
    <div class="bodyContent">
      <div class="container py-3" style="min-height: 100vh">
        <div class="container mt-2 mb-2">
          <img
            class="mt-5"
            src="undraw_online_transactions_02ka.svg"
            alt=""
            width="200"
            height="120"
          />
          <h1 class="text-center mt-3">Transactions</h1>
          <div>
            
          </div>
          <div>
            <NuxtLink class="btn-danger mt-3 px-3 py-2" to="/makeTransactions">Make a Transaction</NuxtLink>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        layout: "default",
        name: "Transactions"
    };
</script>

<style lang="scss" scoped>

</style>