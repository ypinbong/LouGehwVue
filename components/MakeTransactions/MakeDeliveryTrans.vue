<template>
  <div class="MakeTransContainer">
    <div class="TransDetailsContainer my-3">
      <h3>Delivery Details</h3>
      <b-container>
        <b-form class="form-inline">
          <label>ID: </label>
          <b-col sm="1" class="form-inline">
            <b-form-input
              class="form-control"
              type="text"
              placeholder="#"
              v-model="supid"
              readonly
            ></b-form-input>
          </b-col>
          <label for="supplierInput">Supplier:</label>
          <b-col sm="3" class="form-inline">
            <b-form-input
              list="suppliersList"
              id="supplierInput"
              placeholder="Enter supplier name"
              v-model="supName"
              @change="selectedSuppliers"
              required
            ></b-form-input>
            <b-form-datalist id="suppliersList">
              <option
                v-for="suppliersList in suppliersState"
                :key="suppliersList.supid"
                :value="suppliersList.supName"
              >
                ID#: {{ suppliersList.supid }} | Name:
                {{ suppliersList.supName }} | Contact#:
                {{ suppliersList.supContact }}
              </option>
            </b-form-datalist>
          </b-col>
          <label>Delivery date:</label>
          <b-col sm="3">
            <b-form-input type="date" v-model="deliveryDate"> </b-form-input>
          </b-col>
        </b-form>
      </b-container>
    </div>
    <div class="AddItemsContainer my-3">
      <h3>Received Items</h3>
      <b-container>
        <b-form class="form-inline">
          <label>ID: </label>
          <b-col sm="1" class="form-inline">
            <b-form-input
              class="form-control"
              type="text"
              placeholder="#"
              v-model="id"
              readonly
            ></b-form-input>
          </b-col>
          <label class="ml-2" for="itemInput">Item:</label>
          <b-col sm="3" class="form-inline">
            <b-form-input
              list="itemsList"
              id="itemInput"
              placeholder="Enter item name"
              v-model="name"
              @change="selectedItems"
              required
            ></b-form-input>
            <b-form-datalist id="itemsList">
              <option
                v-for="itemsList in itemsState"
                :key="itemsList.id"
                :value="itemsList.name"
              >
                ID#: {{ itemsList.id }} | Name: {{ itemsList.name }} | In Stock:
                {{ itemsList.quantity }} | Price: Php {{ itemsList.price }}
              </option>
            </b-form-datalist>
          </b-col>
          <label>Price(Php): </label>
          <b-col sm="2" class="form-inline">
            <b-form-input
              class="form-control"
              type="text"
              placeholder=""
              v-model="price"
              readonly
            ></b-form-input>
          </b-col>
          <label>Quantity: </label>
          <b-col sm="2" class="form-inline">
            <b-form-input
              class="form-control"
              type="number"
              placeholder="0"
              v-model="selectedQuantity"
              @input="calcSubTotal"
              required
            ></b-form-input>
          </b-col>
          <b-button variant="danger" @click="addToPendingItems"
            >Add <i class="fas fa-plus"></i
          ></b-button>
        </b-form>
      </b-container>
    </div>
    <div class="PendingItemsTable">
      <b-table
        id="PendingTable"
        :items="pendingItems"
        show-empty
        :fields="fields"
        :key="suppliersState.supid"
        fixed
      >
        <template #cell(price)="data"> Php {{ data.item.price }}.00 </template>
        <template #cell(subTotal)="data">
          Php {{ data.item.subTotal }}.00
        </template>
        <template v-slot:cell(action)="row">
          <b-button
            @click="deletePendingItem(row.item, row.index)"
            size="sm"
            class="editBtn mr-2"
            variant="none"
            pill
          >
            <i class="fas fa-trash-alt"></i>
          </b-button>
        </template>
      </b-table>
      <b-col class="tableFooter">
        <th class="tableFooter__TH" scrope="row">Grand Total:</th>
        <td class="tableFooter__TD">Php {{ grandTotal }}.00</td>
      </b-col>
    </div>
    <b-button @click="pushPendingItems" size="sm" class="my-5" variant="danger">
      <i class="fas fa-cash-register"></i> Checkout
    </b-button>
  </div>
</template>

<script setup>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      suppliersList: [],
      itemsList: [],
      pendingItems: [],
      supid: '',
      currentTotal: '0',
      grandTotal: '0',
      id: '',
      name: '',
      supName: '',
      quantity: '0',
      price: '0',
      deliveryDate: '',
      selectedQuantity: '',
      subTotal: '',
      fields: [
        { key: 'id', label: 'Item ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'selectedQuantity', label: 'Qty', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'subTotal', label: 'Sub Total', sortable: true },
        { key: 'action', label: 'Action', sortable: false },
      ],
    }
  },
  beforeCreate() {
    this.$store.dispatch('Items/getItems', {
      token: localStorage.token,
    })
    this.$store.dispatch('Suppliers/getSuppliers', {
      token: localStorage.token,
    })
    this.$store.dispatch('Transactions/getDeliveryHistory', {
      token: localStorage.token,
    })
  },
  computed: {
    ...mapGetters({
      itemsState: 'Items/allItems',
      suppliersState: 'Suppliers/allSuppliers',
    }),
  },
  methods: {
    selectedItems() {
      let selectedItem = this.itemsState.find(
        (selectedItem) => selectedItem.name == this.name
      )
      this.price = selectedItem.price
      this.id = selectedItem.id
      this.quantity = selectedItem.quantity
      // console.log('heyy', this.suppliersState)
    },
    selectedSuppliers() {
      let selectedSupplier = this.suppliersState.find(
        (selectedSupplier) => selectedSupplier.supName == this.supName
      )
      this.supid = selectedSupplier.supid
    },
    calcSubTotal() {
      this.subTotal = this.selectedQuantity * this.price
    },
    addToPendingItems() {
      this.pendingItems.push({
        id: this.id,
        name: this.name,
        selectedQuantity: this.selectedQuantity,
        price: this.price,
        subTotal: this.subTotal,
      })
      this.currentTotal = this.currentTotal * 1 + this.subTotal * 1
      this.grandTotal = this.currentTotal
      this.clearForm()
    },
    deletePendingItem(index) {
      this.pendingItems.splice(index, 1)
    },
    clearForm() {
      ;(this.id = ''),
        (this.name = ''),
        (this.selectedQuantity = ''),
        (this.price = ''),
        (this.subTotal = '')
    },
    clearPending() {
      ;(this.pendingItems = []), (this.grandTotal = '')
    },
    pushPendingItems() {
      this.$store
        .dispatch('Transactions/addNewDelivery', {
          supName: this.supName,
          deliveryDate: this.deliveryDate,
          grandTotal: this.grandTotal,
          itemsList: this.pendingItems,
          token: localStorage.token,
        })
        .then((res) => {
          this.clearPending()
          this.showResult(res.result.message, 'success')
          this.$store.dispatch('Transactions/getDeliveryHistory', {
            token: localStorage.token,
          })
        })
        .catch((err) => {
          console.log('Adding new Trans Error:', err)
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

<style lang="scss" scoped>
form {
  display: flex !important;
  justify-content: center !important;
  .btn-danger {
    padding: 3px 5px 3px 5px;
    font-size: 18px;
  }
}
.tableFooter {
  color: white;
  background-color: #e54f60;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: 30px;
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
}
</style>
