<template>
  <div class="bodyContent">
    <div class="container py-3" style="min-height: 100vh">
      <div class="container mt-2 mb-2">
        <img
          class="mt-5"
          src="undraw_factory_dy0a.svg"
          alt=""
          width="200"
          height="120"
        />
        <h1 class="text-center mt-3">Suppliers</h1>
        <div>
          <button
            class="btn-danger mt-3 px-3 py-2"
            v-b-modal.addaNewSupplierModal
          >
            Add <i class="fas fa-plus"></i>
          </button>
          <b-modal
            class="modalContainer"
            id="addaNewSupplierModal"
            centered
            title="Fill in supplier details"
            header-class="justify-content-center"
            no-close-on-backdrop
            hide-footer
          >
            <form @submit.prevent>
              <div>
                <img
                  class="mb-3 col-12 text-center"
                  src="undraw_deliveries_131a.svg"
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
                  placeholder="Name..."
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="addNewAddress"
                  placeholder="Address.."
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="addNewContact"
                  placeholder="Contact #..."
                  required
                />
              </div>
              <b-row align-h="center">
                <b-col cols="6" class="text-center">
                  <button
                    @click="addNewSupplier()"
                    class="btn-danger mt-3 py-2"
                  >
                    Add <i class="fas fa-plus"></i>
                  </button>
                </b-col>
              </b-row>
            </form>
          </b-modal>
        </div>
      </div>
      <SupTable />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Suppliers',
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
      addNewAddress: '',
      addNewContact: '',
    }
  },
  beforeCreate() {
    this.$store.dispatch('Suppliers/getSuppliers', {})
  },
  methods: {
    addNewSupplier() {
      this.$store
        .dispatch('Suppliers/addNewSupplier', {
          supName: this.addNewName,
          supAddress: this.addNewAddress,
          supContact: this.addNewContact,
        })
        .then((res) => {
          this.$bvModal.hide('addaNewSupplierModal')
          this.showResult(res.result.message, 'success')
          this.$store.dispatch('Suppliers/getSuppliers', {})
        })
        .catch((err) => {
          console.log(err)
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
  name: 'Suppliers',
}
</script>

<style lang="scss" scoped></style>
