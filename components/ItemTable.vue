<template>
  <div class="overflow-auto my-4">
    <input
      class="searchBar mb-3"
      type="search"
      v-model="filter"
      placeholder="Type to search..."
    />
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="right"
    ></b-pagination>
    <b-table
      id="items-table"
      :items="itemsState"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      show-empty
      :fields="fields"
      :key="itemsState.id"
      head-variant="dark"
    >
      <template #cell(price)="data"> Php {{ data.item.price }}.00 </template>
      <template v-slot:cell(action)="row">
        <b-button
          @click="edit(row.item, row.index)"
          size="sm"
          class="editBtn mr-2"
          variant="none"
          pill
        >
          <i class="fas fa-pencil-alt"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="right"
    ></b-pagination>
    <!-- // *ANCHOR - Modal for editing item details -->
    <b-modal
      id="editingItemModal"
      class="modalContainer"
      centered
      title="Fill in product details"
      header-class="justify-content-center"
      no-close-on-backdrop
      hide-footer
    >
      <form @submit.prevent>
        <div>
          <img
            class="mb-3 col-12 text-center"
            src="undraw_publish_post_vowb.svg"
            alt="undraw_publish_post_vowb.svg"
            width="200"
            height="120"
          />
        </div>
        <div class="form-group">
          <label>Item ID:</label>
          <input
            type="text"
            class="form-control"
            v-model="edited.id"
            required
            readonly
          />
        </div>
        <div class="form-group">
          <label>Item Name:</label>
          <input
            type="text"
            class="form-control"
            v-model="edited.name"
            required
          />
        </div>
        <div class="form-group">
          <label>Barcode:</label>
          <input
            type="text"
            class="form-control"
            v-model="edited.barcode"
            required
          />
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input
            type="text"
            class="form-control"
            v-model="edited.description"
            required
          />
        </div>
        <label>Supplier</label>
        <b-form-input
          type="text"
          list="suppliersList"
          id="supplierInput"
          class="form-control"
          placeholder="Enter supplier name"
          v-model="edited.supName"
        >
        </b-form-input>
        <b-form-datalist id="suppliersList">
          <option
            v-for="suppliersList in suppliersState"
            :key="suppliersList.supid"
            :value="suppliersList.supName"
          >
            ID#: {{ suppliersList.supid }} | Name: {{ suppliersList.supName }} |
            Contact#: {{ suppliersList.supContact }}
          </option>
        </b-form-datalist>
        <div class="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            class="form-control"
            v-model="edited.quantity"
            required
          />
        </div>
        <div class="form-group">
          <label>Item Price:</label>
          <input
            type="text"
            class="form-control"
            v-model="edited.price"
            required
          />
        </div>
        <b-row align-h="center">
          <b-col cols="6" class="text-center">
            <button @click="submitChange()" class="btn-danger mt-3 py-2">
              Confirm<span>&plus;</span>
            </button>
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      filter: '',
      perPage: 10,
      currentPage: 1,
      sortBy: 'id',
      sortDesc: false,
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'barcode', label: 'Barcode#', sortable: true },
        { key: 'description', label: 'Description', sortable: false },
        { key: 'supName', label: 'Supplier', sortable: true },
        { key: 'quantity', label: 'Qty', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'action', label: 'Action', sortable: false },
      ],
      edited: {
        id: null,
        name: null,
        barcode: null,
        description: null,
        supName: null,
        quantity: null,
        price: null,
      },
    }
  },
  beforeCreate() {
    this.$store.dispatch('Items/getItems', {})
    this.$store.dispatch('Suppliers/getSuppliers', {})
  },
  computed: {
    ...mapGetters({
      itemsState: 'Items/allItems',
      suppliersState: 'Suppliers/allSuppliers',
    }),
    rows() {
      return this.itemsState.length
    },
    async fetch() {
      this.itemsState = await this.$content('Items/itemsState')
        .search(this.q)
        .fetch()
    },
  },
  methods: {
    edit(item, index) {
      console.log('edit', item)

      this.edited.id = item.id
      this.edited.name = item.name
      this.edited.barcode = item.barcode
      this.edited.description = item.description
      this.edited.supName = item.supName
      this.edited.quantity = item.quantity
      this.edited.price = item.price
      this.$bvModal.show('editingItemModal')
    },
    submitChange() {
      this.$store
        .dispatch('Items/editItem', {
          id: this.edited.id,
          name: this.edited.name,
          barcode: this.edited.barcode,
          description: this.edited.description,
          supName: this.edited.supName,
          quantity: this.edited.quantity,
          price: this.edited.price,
        })
        .then((res) => {
          console.log('Item result message', res.result.message)
          this.$bvModal.hide('editingItemModal')
          this.showResult(res.result.message, 'success')
          this.$store.dispatch('Items/getItems', {})
        })
        .catch((err) => {
          console.log('The Error is this:', err)
          this.showResult(err.response.data.error, 'danger')
        })
    },
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
