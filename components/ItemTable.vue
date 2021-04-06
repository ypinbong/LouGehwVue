<template>
  <div class="overflow-auto my-4">
    <input
      class="searchBar mb-3"
      type="search"
      v-model="filter"
      placeholder="Type to search..."
    />
    <b-table
      id="items-table"
      :items="itemsState"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      show-empty
      :fields="fields"
      :key="items-table"
    >
      <template v-slot:cell(action)="row">
        <b-button
          @click="edit(row.item, row.index)"
          size="sm"
          class="mr-2"
          variant="primary"
          pill
        >
          edit
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    <!-- // *ANCHOR - Modal for editing item details -->
    <b-modal
      id="editingItem"
      class="modalContainer"
      centered
      title="Fill in product details"
      header-class="justify-content-center"
      no-close-on-backdrop
      hide-footer
    >
      <form action="" method="post">
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
        <div class="form-group">
          <label>Supplier's ID:</label>
          <input
            type="text"
            class="form-control"
            v-model="edited.supid"
            placeholder="Enter supplier id"
            required
            readonly
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
        <div class="form-group">
          <label>Quantity:</label>
          <input
            type="text"
            class="form-control"
            v-model="edited.quantity"
            required
          />
        </div>
        <b-form-group>
          <label>Item Status:</label>
          <b-form-select
            class="selectEditBtn"
            id="custStatus"
            v-model="edited.itemStatus"
            :options="status"
            aria-describedby="input-2-live-feedback"
            data-vv-as="Status"
          ></b-form-select>
        </b-form-group>
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
        { key: 'supid', label: 'Supplier ID', sortable: true },
        { key: 'quantity', label: 'Qty', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'itemStatus', label: 'Item Status', sortable: true },
        { key: 'action', label: 'Action', sortable: false },
      ],
      status: [
        { value: '', text: 'Status...', disabled: true },
        { value: 'Active', text: 'Active' },
        { value: 'Inactive', text: 'Inactive' },
      ],
      edited: {
        id: null,
        name: null,
        barcode: null,
        description: null,
        supid: null,
        quantity: null,
        price: null,
        itemStatus: '',
      },
    }
  },
  beforeCreate() {
    this.$store.dispatch('Items/getItems', {})
    this.$store.dispatch('Items/editItem', {})
  },
  computed: {
    ...mapGetters({
      itemsState: 'Items/allItems',
    }),
    // itemsState() {
    //     return this.$store.state.allItems;
    // },
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
      this.edited.supid = item.supid
      this.edited.quantity = item.quantity
      this.edited.price = item.price
      this.edited.itemStatus = item.itemStatus

      this.$bvModal.show('editingItem')
    },
    submitChange() {
      this.$store
        .dispatch('Items/editItem', {
          id: this.edited.id,
          name: this.edited.name,
          barcode: this.edited.barcode,
          description: this.edited.description,
          supid: this.edited.supid,
          quantity: this.edited.quantity,
          itemStatus: this.edited.itemStatus,
          price: this.edited.price,
        })
        .then((res) => {
          // console.log("err", res);
        })
        .catch((err) => {
          console.log(err)
          window.location.reload()
          //this.showAlert(err.response.data.msg, "danger");
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
