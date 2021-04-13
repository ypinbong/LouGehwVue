<template>
  <div class="bodyContent">
    <div class="container py-3" style="min-height: 100vh">
      <div class="container mt-2 mb-2">
        <img
          class="mt-5"
          src="undraw_add_to_cart_vkjp.svg"
          alt=""
          width="200"
          height="120"
        />
        <h1 class="text-center mt-3">Shop</h1>
        <div>
          <!-- // *ANCHOR - Add a New Item Modal -->
          <button class="btn-danger mt-3 px-3 py-2" v-b-modal.addaNewItemModal>
            Add <i class="fas fa-plus"></i>
          </button>
          <b-modal
            class="modalContainer"
            id="addaNewItemModal"
            centered
            title="Add an Item Form"
            header-class="justify-content-center"
            no-close-on-backdrop
            hide-footer
          >
            <form @submit.prevent>
              <div>
                <img
                  class="mb-3 col-12 text-center"
                  src="undraw_empty_cart_co35.svg"
                  alt=""
                  width="200"
                  height="120"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="addNewName"
                  placeholder="Item Name..."
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="addNewBarcode"
                  placeholder="Barcode #..."
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="addNewDescription"
                  placeholder="Description..."
                  required
                />
              </div>
              <b-form-input
                list="suppliersList"
                id="supplierInput"
                class="form-group"
                placeholder="Enter supplier name"
                v-model="addNewSupplier"
                required
              >
                <label>Supplier</label>
              </b-form-input>
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
              <div class="form-group">
                <input
                  type="number"
                  class="form-control"
                  v-model="addNewQuantity"
                  placeholder="Quantity..."
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="number"
                  class="form-control"
                  v-model="addNewPrice"
                  placeholder="Price..."
                  required
                />
              </div>
              <b-row align-h="center">
                <b-col cols="6" class="text-center">
                  <button @click="addNewItem()" class="btn-danger mt-3 py-2">
                    Add <i class="fas fa-plus"></i>
                  </button>
                </b-col>
              </b-row>
            </form>
          </b-modal>
        </div>
      </div>
      <ItemTable />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Products',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Lou Geh App',
        },
      ],
    }
  },
  data() {
    return {
      addNewName: '',
      addNewBarcode: '',
      addNewDescription: '',
      addNewSupplier: '',
      addNewQuantity: '',
      addNewPrice: '',
    }
  },
  beforeCreate() {
    this.$store.dispatch('Suppliers/getSuppliers', {})
    this.$store.dispatch('Items/getItems', {})
  },
  computed: {
    ...mapGetters({
      suppliersState: 'Suppliers/allSuppliers',
    }),
  },
  methods: {
    async addNewItem() {
      this.$store
        .dispatch('Items/addNewItem', {
          name: this.addNewName,
          barcode: this.addNewBarcode,
          description: this.addNewDescription,
          supName: this.addNewSupplier,
          quantity: this.addNewQuantity,
          price: this.addNewPrice,
        })
        .then((res) => {
          this.$bvModal.hide('addaNewItemModal')
          this.showResult(res.result.message, 'success')
          this.$store.dispatch('Items/getItems', {})
        })
        .catch((err) => {
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
  name: 'Shop',
}
</script>

<style lang="scss" scoped></style>
