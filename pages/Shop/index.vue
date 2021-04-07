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
          </div>
          <div>
            <!-- // *ANCHOR - Add a New Item Modal -->
            <button class="btn-danger mt-3 px-3 py-2" v-b-modal.itemModal>
              Add <i class="fas fa-plus"></i>
            </button>
            <b-modal
            class="modalContainer"
            id="itemModal"
            centered title="Add an Item Form"
            header-class="justify-content-center"
            no-close-on-backdrop
            hide-footer>
                <div>
                    <img class="mb-3 col-12 text-center" src="undraw_empty_cart_co35.svg" alt="" width="200" height="120">
                </div>
                <div class="form-group">
                    <input
                    type="text"
                    class="form-control"
                    v-model="addNewName"
                    placeholder="Item Name..."
                    >
                </div>
                <div class="form-group">
                    <input
                    type="text"
                    class="form-control"
                    v-model="addNewBarcode"
                    placeholder="Barcode #..."
                    >
                </div>
                <div class="form-group">
                    <input
                    type="text"
                    class="form-control"
                    v-model="addNewDescription"
                    placeholder="Description..."
                    >
                </div>
                <div class="form-group">
                    <input
                    type="text"
                    class="form-control"
                    v-model="addNewSupplier"
                    placeholder="Supplier ID..."
                    >
                </div>
                <div class="form-group">
                    <input
                    type="number"
                    class="form-control"
                    v-model="addNewQuantity"
                    placeholder="Quantity..."
                    >
                </div>
                <div class="form-group">
                    <input
                    type="number"
                    class="form-control"
                    v-model="addNewPrice"
                    placeholder="Price..."
                    >
                </div>
                <b-row align-h="center">
                  <b-col cols='6' class="text-center">
                    <button @click="addNewItem()" class="btn-danger mt-3 py-2">
                      Add <i class="fas fa-plus"></i>
                    </button>
                  </b-col>
                </b-row>
            </b-modal>
          </div>
          <ItemTable />
        </div>
      </div>    
</template>

<script>
    export default {
        data() {
          return {
            addNewName: "",
            addNewBarcode: "",
            addNewDescription: "",
            addNewSupplier: "",
            addNewQuantity: "",
            addNewPrice: "",
          }
        },
        methods: {
        async addNewItem(){
            this.$store.dispatch("Items/addNewItem", {
              name: this.addNewName,
              barcode: this.addNewBarcode,
              description: this.addNewDescription,
              supid: this.addNewSupplier,
              quantity: this.addNewQuantity,
              price: this.addNewPrice,
            })
            .then(res => {
              window.location.reload();
            })
            .catch(err => {
              this.showAlert(err.response.data.msg, "danger");
              // window.location.reload();
            });

            // try {
            // const res =  await this.$store.dispatch("Items/addNewItem", {
            //   name: this.addNewName,
            //   barcode: this.addNewBarcode,
            //   description: this.addNewDescription,
            //   supid: this.addNewSupplier,
            //   quantity: this.addNewQuantity,
            //   price: this.addNewPrice,
            // })

            // console.log(res);
            // }
            // catch (e) {
            //   console.log("Error: ",e);
            // }
          },
        },
        name: "Shop",
    };
    
</script>

<style lang="scss" scoped>

</style>