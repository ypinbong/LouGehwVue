<template>
  <div class="bodyContent">
    <div class="container py-3" style="min-height: 100vh">
      <div class="container mt-2 mb-2">
        <div>
          <img
            class="mt-5"
            src="undraw_online_transactions_02ka.svg"
            alt=""
            width="200"
            height="120"
          />
        </div>
        <h1 class="text-center mt-3">Transaction History</h1>
        <div>
          <NuxtLink class="btn-danger mt-3 px-3 py-2" to="/makeTransactions"
            >Make a Transaction <i class="fas fa-plus"></i
          ></NuxtLink>
        </div>
        <div class="text-center mt-4">
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio
              size="lg"
              v-model="selected"
              :aria-describedby="ariaDescribedby"
              name="Delivery"
              value="Delivery"
              @change="scrollBot()"
            >
              Delivery
            </b-form-radio>
            <b-form-radio
              size="lg"
              v-model="selected"
              :aria-describedby="ariaDescribedby"
              name="Sales"
              value="Sales"
              @change="scrollBot()"
            >
              Sales
            </b-form-radio>
          </b-form-group>
          <div class="mt-3">
            Type of Transaction: <strong>{{ selected }}</strong>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <div v-if="selected === 'Delivery'"><DeliveryHistoryTable /></div>
        <div v-else-if="selected === 'Sales'"><SalesHistoryTable /></div>
        <div v-else><h3 class="fw-bold">Choose a Transaction Above</h3></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Transactions',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Lou Geh App',
        },
      ],
    }
  },
  name: 'Transactions',
  data() {
    return {
      selected: '',
    }
  },
  async beforeCreate() {
    await this.$store.dispatch('Transactions/getDeliveryHistory', {
      token: localStorage.token,
    })
    await this.$store.dispatch('Transactions/getSalesHistory', {
      token: localStorage.token,
    })
  },
  methods: {
    scrollBot() {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-control {
  padding-left: 0;
}
h3 {
  color: gray;
}
</style>
