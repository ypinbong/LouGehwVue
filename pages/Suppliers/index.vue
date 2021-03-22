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
            
          </div>
          <div>
            <button class="btn-danger mt-3 px-3 py-2" v-b-modal.modal-1>
              Add<span>&plus;</span>
            </button>

            <b-modal class="modalContainerr" id="modal-1" centered title="Fill in supplier details" header-class="justify-content-center" no-close-on-backdrop no-close-on-esc hide-footer>
              <form action="" method="post">
                <div>
                <img class="mb-3 col-12 text-center" src="undraw_deliveries_131a.svg" alt="" width="200" height="120">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control"  placeholder="Name...">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control"  placeholder="Address..">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control"  placeholder="Contact #...">
                </div>
                <button class="btn-danger col-12 text-center mt-3 px-3 py-2" v-b-modal.modal-1>
                  Add<span>&plus;</span>
                </button>
              </form>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        layout: "default",
        name: "Suppliers"
    };
</script>

<style lang="scss" scoped>

</style>