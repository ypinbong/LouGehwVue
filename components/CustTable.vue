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
      aria-controls="customer-table"
      align="right"
      class="mt-1"
      @change="scrollBot()"
    ></b-pagination>
    <b-table
      show-empty
      id="customer-table"
      :items="customersState"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      show-empty
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :key="customersState.custid"
      head-variant="dark"
      responsive
      empty-text="Fetching data..."
    >
      <!-- <template #table-busy>
        <div class="text-center text-secondary my-2">
          <b-spinner variant="danger" class="align-middle"></b-spinner>
          <strong>&nbsp;Loading...</strong>
        </div>
      </template> -->
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
      aria-controls="customer-table"
      align="right"
    ></b-pagination>
    <!-- //* ANCHOR - MODAL FORM FOR EDITING CUSTOMER DETAILS IN THE TABLE -->
    <b-modal
      id="editingCustomerModal"
      class="modalContainer"
      centered
      title="Fill in customer details"
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
        <label>Customer ID:</label>
        <input
          type="text"
          class="form-control"
          v-model="edited.custid"
          required
          readonly
        />
      </div>
      <div class="form-group">
        <label>Name:</label>
        <input
          type="text"
          class="form-control"
          v-model="edited.custName"
          required
        />
      </div>
      <div class="form-group">
        <label>Address:</label>
        <input
          type="text"
          class="form-control"
          v-model="edited.custAddress"
          required
        />
      </div>
      <div class="form-group">
        <label>Contact #:</label>
        <input
          type="text"
          class="form-control"
          v-model="edited.custContact"
          required
        />
      </div>
      <b-form-group>
        <label>Status:</label>
        <b-form-select
          class="selectEditBtn"
          id="custStatus"
          v-model="edited.custStatus"
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
      fields: [
        { key: 'custid', label: 'ID', sortable: true },
        { key: 'custName', label: 'Name', sortable: true },
        { key: 'custAddress', label: 'Address', sortable: true },
        { key: 'custContact', label: 'Contact#', sortable: false },
        { key: 'custStatus', label: 'Status', sortable: true },
        { key: 'action', label: 'Action', sortable: false },
      ],
      status: [
        { value: '', text: 'Choose status...', disabled: true },
        { value: 'Active', text: 'Active' },
        { value: 'Inactive', text: 'Inactive' },
      ],
      edited: {
        custid: null,
        custName: null,
        custAddress: null,
        custContact: null,
        custStatus: '',
      },
      alert: {
        showResult: 0,
        dismissSecs: 0,
        variant: 'success',
        message: '',
      },
    }
  },
  async beforeCreate() {
    await this.$store.dispatch('Customers/getCustomers', {
      token: localStorage.token,
    })
    this.isBusy = false
    await window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
    // console.log('Token: ', localStorage.token)
  },
  computed: {
    ...mapGetters({
      customersState: 'Customers/allCustomers',
    }),
    rows() {
      return this.customersState.length
    },
    async fetch() {
      this.customersState = await this.$store('Customers/customersState')
        .search(this.q)
        .fetch()
    },
  },
  methods: {
    edit(item, index) {
      // this.Module = { ...data };
      // this.$bvModal.show("modal-edit");
      // console.log("ahsjkdha")
      // console.log(data);
      // console.log('edit', item)

      this.edited.custid = item.custid
      this.edited.custName = item.custName
      this.edited.custAddress = item.custAddress
      this.edited.custContact = item.custContact
      this.edited.custStatus = item.custStatus
      this.$bvModal.show('editingCustomerModal')
    },
    submitChange() {
      this.$store
        .dispatch('Customers/editCustomer', {
          custid: this.edited.custid,
          custName: this.edited.custName,
          custAddress: this.edited.custAddress,
          custContact: this.edited.custContact,
          custStatus: this.edited.custStatus,
          token: localStorage.token,
        })
        .then((res) => {
          // console.log('Customer result message', res.result.message)
          this.$bvModal.hide('editingCustomerModal')
          this.showResult(res.result.message, 'success')
          this.$store.dispatch('Customers/getCustomers', {
            token: localStorage.token,
          })
          // window.scrollTo(0, document.body.scrollHeight)
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          })
          // window.scrollTo({
          //   top: selectedFrame.offsetTop,
          //   left: 0,
          //   behavior: 'smooth',
          // })
        })
        .catch((err) => {
          // console.log('AHDH', err)
          this.showResult(err.response.data.error, 'danger')
        })
    },
    scrollBot() {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
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
