<template>
  <div class="overflow-auto my-4">
    <!-- // * ANCHOR - Displaying the table -->
    <input
      class="searchBar mt-1"
      type="search"
      v-model="filter"
      placeholder="Type to search..."
    />
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="salesHistoryTable"
      align="right"
      class="mt-1"
      @change="scrollBot()"
    ></b-pagination>
    <b-table
      id="salesHistoryTable"
      :items="salesState"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      show-empty
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :key="salesState.salesTransactionId"
      head-variant="dark"
      empty-text="Fetching data..."
    >
      <!-- <template #table-busy>
        <div class="text-center text-secondary my-2">
          <b-spinner variant="danger" class="align-middle"></b-spinner>
          <strong>&nbsp;Loading...</strong>
        </div>
      </template> -->
      <template #cell(action)="row">
        <b-button
          size="sm"
          @click="getItemsList(row.item)"
          class="viewBtn mr-2"
          pill
        >
          <i class="fas fa-eye"></i> Show items
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="salesHistoryTable"
      align="right"
    ></b-pagination>
    <b-modal
      class="modalContainer"
      size="lg"
      :id="itemModal.id"
      centered
      title="Fill in customer details"
      header-class="justify-content-center"
      no-close-on-backdrop
      hide-footer
    >
      <!-- <pre> {{ itemsList.salesList }} </pre> -->
      <b-table
        hover
        :items="itemsList.salesList"
        :fields="itemsListFields"
        head-variant="light"
      ></b-table>
    </b-modal>
  </div>
</template>

<script>
// import customersList from 'customers/list'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      filter: '',
      perPage: 10,
      currentPage: 1,
      sortBy: 'id',
      sortDesc: false,
      // isBusy: true,
      itemModal: {
        id: 'item-modal',
      },
      itemsList: {
        salesList: {},
      },
      fields: [
        { key: 'salesTransactionId', label: 'ID', sortable: true },
        { key: 'grandTotal', label: 'Amount', sortable: true },
        { key: 'custName', label: 'Customer', sortable: true },
        { key: 'date', label: 'Transaction Date', sortable: true },
        { key: 'action', label: 'Action', sortable: false },
      ],
      itemsListFields: [
        { key: 'id', lable: 'ID' },
        { key: 'name', lable: 'name' },
        { key: 'barcode', lable: 'Barcode' },
        { key: 'quantity', lable: 'Qty' },
        { key: 'price', lable: 'Price' },
        { key: 'subTotal', lable: 'Sub Total' },
      ],
    }
  },
  async beforeCreate() {
    await this.$store.dispatch('Transactions/getSalesHistory', {
      token: localStorage.token,
    })
    await this.$store.dispatch('Customers/getCustomers', {
      token: localStorage.token,
    })
    // this.isBusy = false
    await window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  },
  computed: {
    ...mapGetters({
      salesState: 'Transactions/allSales',
      customersState: 'Customers/allCustomers',
    }),
    rows() {
      return this.salesState.length
    },
    async fetch() {
      this.salesState = await this.$store('Transactions/salesState')
        .search(this.q)
        .fetch()
      // this.isBusy = true
      // console.log('Some', this.salesState)
      // this.isBusy = false
    },
  },
  methods: {
    getItemsList(item, button) {
      this.$root.$emit('bv::show::modal', this.itemModal.id, button)
      this.itemsList.salesList = item.itemsListRows
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })

      // console.log('click', this.itemsList.salesList)
    },
    scrollBot() {
      console.log('didScroll')
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style lang="css" scoped>
@media (min-width: 992px) .modal-lg {
  max-width: auto !important;
}

@media (min-width: 576px) .modal-dialog {
  max-width: auto !important;
}
</style>
