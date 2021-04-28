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
      aria-controls="supplier-table"
      align="right"
    ></b-pagination>
    <b-table
      id="supplier-table"
      :items="suppliersState"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      show-empty
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :key="suppliersState.supid"
      head-variant="dark"
    >
      <template v-slot:cell(action)="row">
        <b-button
          @click="edit(row.item, row.index)"
          size="sm"
          class="editBtn mr-2"
          variant="none"
          aria-label="editButton"
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
      aria-controls="supplier-table"
      align="right"
    ></b-pagination>
    <b-modal
      @submit.prevent
      id="editingSupplierModal"
      class="modalContainer"
      centered
      title="Fill in supplier details"
      header-class="justify-content-center"
      no-close-on-backdrop
      hide-footer
    >
      <div>
        <img
          class="mb-3 col-12 text-center"
          src="undraw_wall_post_83ul.svg"
          alt="undraw_wall_post_83ul.svg"
          width="200"
          height="120"
        />
      </div>
      <div class="form-group">
        <label>Supplier ID:</label>
        <input
          type="text"
          class="form-control"
          v-model="edited.supid"
          required
          readonly
        />
      </div>
      <div class="form-group">
        <label>Supplier Name:</label>
        <input
          type="text"
          class="form-control"
          v-model="edited.supName"
          required
        />
      </div>
      <div class="form-group">
        <label>Address:</label>
        <input
          type="text"
          class="form-control"
          v-model="edited.supAddress"
          required
        />
      </div>
      <div class="form-group">
        <label>Contact #:</label>
        <input
          type="text"
          class="form-control"
          v-model="edited.supContact"
          required
        />
      </div>
      <b-form-group>
        <label>Status:</label>
        <b-form-select
          class="selectEditBtn"
          id="custStatus"
          v-model="edited.supStatus"
          :options="status"
          aria-describedby="input-2-live-feedback"
          data-vv-as="Status"
        ></b-form-select>
      </b-form-group>
      <!-- //? button inside b-row and b-col to adjust it's size and center it -->
      <b-row align-h="center">
        <b-col cols="6" class="text-center">
          <!-- //*ANCHOR TRIGGERS `submitChange()` FUNCTION WHEN THE BUTTON IS CLICKED -->
          <button @click="submitChange()" class="btn-danger mt-3 py-2">
            Confirm
          </button>
        </b-col>
      </b-row>
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
        { key: 'supid', label: 'ID', sortable: true },
        { key: 'supName', label: 'Name', sortable: true },
        { key: 'supAddress', label: 'Address', sortable: true },
        { key: 'supContact', label: 'Contact#', sortable: false },
        { key: 'supStatus', label: 'Status', sortable: true },
        { key: 'action', label: 'Action', sortable: false },
      ],
      status: [
        { value: '', text: 'Status...', disabled: true },
        { value: 'Active', text: 'Active' },
        { value: 'Inactive', text: 'Inactive' },
      ],
      edited: {
        supid: null,
        supName: null,
        supAddress: null,
        supContact: null,
        supStatus: '',
      },
    }
  },
  beforeCreate() {
    this.$store.dispatch('Suppliers/getSuppliers', {
      token: localStorage.token,
    })
  },
  computed: {
    ...mapGetters({
      suppliersState: 'Suppliers/allSuppliers',
    }),
    rows() {
      return this.suppliersState.length
    },
    async fetch() {
      this.suppliersState = await this.$content('Suppliers/suppliersState')
        .search(this.q)
        .fetch()
    },
  },
  methods: {
    edit(item, index) {
      // console.log('edit', item)
      this.edited.supid = item.supid
      this.edited.supName = item.supName
      this.edited.supAddress = item.supAddress
      this.edited.supContact = item.supContact
      this.edited.supStatus = item.supStatus
      this.$bvModal.show('editingSupplierModal')
    },
    submitChange() {
      this.$store
        .dispatch('Suppliers/editSupplier', {
          supid: this.edited.supid,
          supName: this.edited.supName,
          supAddress: this.edited.supAddress,
          supContact: this.edited.supContact,
          supStatus: this.edited.supStatus,
          token: localStorage.token,
        })
        .then((res) => {
          // console.log("err", res);
          this.$bvModal.hide('editingSupplierModal')
          this.showResult(res.result.message, 'success')
          this.$store.dispatch('Suppliers/getSuppliers', {
            token: locatStorage.token,
          })
        })
        .catch((err) => {
          // console.log('AHDH', err)
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
