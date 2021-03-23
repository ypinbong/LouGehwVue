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
            
          </div>
          <div>
            <button class="btn-danger mt-3 px-3 py-2" v-b-modal.modal-1>
              Add<span>&plus;</span>
            </button>

            <b-modal class="modalContainer text-center font-size-m" id="modal-1" centered title="Add an Item Form" header-class="justify-content-center ml" no-close-on-backdrop no-close-on-esc hide-footer>
              <form action="" method="post">
                <div>
                  <img class="mb-3 col-12 text-center" src="undraw_empty_cart_co35.svg" alt="" width="200" height="120">
                </div>
                <div class="mx-5">
                <div class="form-group">
                    <input type="text" class="form-control"  placeholder="Item Name...">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control"  placeholder="Barcode #...">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control"  placeholder="Description...">
                </div>
                <div class="form-group">
                    <input type="number" class="form-control"  placeholder="Quantity...">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control"  placeholder="Price...">
                </div>
                <b-row align-h="center">
                  <b-col cols='4' class="text-center">
                <button class="btn-danger mt-3 py-2" v-b-modal.modal-1>
                  Add<span>&plus;</span>
                </button>
                  </b-col>

                </b-row>
                </div>
              </form>
            </b-modal>
          </div>
          <ItemTable />
        </div>
      </div>
    </div>
    
    
</template>

<script>

import ItemTable from "~/components/ItemTable.vue";

    export default {
        layout: "default",
        name: "Shop",
        data() {
        return {
          form: {
            email: '',
            name: '',
          },
        }
      },
      module: {
        ItemTable,
      },
    };
    
</script>

<style lang="scss" scoped>

</style>