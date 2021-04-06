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
      <div>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio
            size="lg"
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="Delivery"
            value="Delivery"
          >
            Delivery
          </b-form-radio>
          <b-form-radio
            size="lg"
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="Sales"
            value="Sales"
          >
            Sales
          </b-form-radio>
        </b-form-group>
        <div class="mt-3">
          Type of Transaction: <strong>{{ selected }}</strong>
        </div>
      </div>
      <div class="mt-3">
        <div v-if="selected === 'Delivery'"><makeDeliveryTrans /></div>
        <div v-else-if="selected === 'Sales'"><makeSalesTrans /></div>
        <div v-else>Choose a Transaction</div>
      </div>
    </div>
  </div>
</template>

<script>
// import MakeTransactionForm from '~/components/MakeTransactionForm.vue'
import MakeDeliveryTrans from '~/components/MakeTransactions/MakeDeliveryTrans.vue'
import MakeSalesTrans from '~/components/MakeTransactions/MakeSalesTrans.vue'
export default {
  data() {
    return {
      selected: '',
    }
  },
  layout: 'default',
  name: 'MakeTransactions',
  component: {
    // MakeTransactionForm,
    MakeDeliveryTrans,
    MakeSalesTrans,
  },
}
</script>

<style lang="scss" scoped></style>
