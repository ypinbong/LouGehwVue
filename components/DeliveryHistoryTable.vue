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
      aria-controls="deliveryHistoryTable"
      align="right"
      class="mt-1"
      @change="scrollBot()"
    ></b-pagination>
    <b-table
      id="deliveryHistoryTable"
      :items="deliveriesState"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      show-empty
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :key="deliveriesState.deliveryTransactionId"
      head-variant="dark"
      empty-text="Fetching data..."
    >
      <!-- <template #cell(grandTotal)="row">
        <b>{{ deliveryList.grandtotal }}</b>
      </template> -->
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
      aria-controls="deliveryHistoryTable"
      align="right"
    ></b-pagination>
    <b-modal
      :id="itemModal.id"
      class="modalContainer"
      size="lg"
      centered
      title="Fill in customer details"
      header-class="justify-content-center"
      no-close-on-backdrop
      hide-footer
    >
      <!-- <pre> {{ itemsList.deliveryList }} </pre> -->
      <b-table
        :items="itemsList.deliveryList"
        :fields="itemsListFields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        head-variant="light"
      >
        <template #cell(price)="data"> Php {{ data.item.price }}.00 </template>
        <template #cell(subTotal)="data">
          Php {{ data.item.subTotal }}.00
        </template>
      </b-table>
      <!-- <b-col class="tableFooter">
        <th class="tableFooter__TH" scope="row">Grand Total:</th>
        <td class="tableFooter__TD">Php {{ data.item.grandTotal }}.00</td>
      </b-col> -->
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
      grandTotal: '',
      // isBusy: true,
      itemModal: {
        id: 'item-modal',
      },
      itemsList: {
        deliveryList: {},
      },
      fields: [
        { key: 'deliveryTransactionId', label: 'ID', sortable: true },
        { key: 'grandTotal', label: 'Amount', sortable: true },
        { key: 'supName', label: 'Supplier', sortable: true },
        { key: 'deliveryDate', label: 'Delivery Date', sortable: true },
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
    await this.$store.dispatch('Transactions/getDeliveryHistory', {
      token: localStorage.token,
    })
    await this.$store.dispatch('Suppliers/getSuppliers', {
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
      deliveriesState: 'Transactions/allDeliveries',
      suppliersState: 'Suppliers/allSuppliers',
    }),
    rows() {
      return this.deliveriesState.length
    },
    async fetch() {
      this.deliveriesState = await this.$store('Transactions/deliveriesState')
        .search(this.q)
        .fetch()
    },
  },
  methods: {
    getItemsList(item, button) {
      this.$root.$emit('bv::show::modal', this.itemModal.id, button)
      this.itemsList.deliveryList = item.itemsListRows
      // console.log('click', this.itemsList.deliveryList)
      // console.log('click2', this.itemsList)
    },
    // async storeToLocal() {
    //   this.deliveriesState = await this.$store('Transaction/deliveriesState')
    //   this.localGrandTotal = this.deliveriesState.grandTotal
    // },
    scrollBot() {
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

.tableFooter {
  color: white;
  background-color: #e54f60;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: 30px;
}
.tableFooter__TH {
  grid-column: 4;
  margin-top: auto;
  margin-bottom: auto;
}
.tableFooter__TD {
  padding-left: 11px;
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
