<template>
    <div>
    <b-form-group label="" v-slot="{ ariaDescribedby }">
      <b-form-radio size="lg" v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Delivery">Delivery</b-form-radio>
      <b-form-radio size="lg" v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Sales">Sales</b-form-radio>
    </b-form-group>

    <div class="mt-3">Type of Transaction: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script setup>

export default {
    data() {
      return {
        selected: ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>