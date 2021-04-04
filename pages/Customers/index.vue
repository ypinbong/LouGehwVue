<template>
    <div class="bodyContent">
      <div class="container py-3" style="min-height: 100vh">
        <div class="container mt-2 mb-2">
          <img
            class="mt-5"
            src="undraw_product_tour_foyt.svg"
            alt=""
            width="200"
            height="120"
          />
          <h1 class="text-center mt-3">Customer Database</h1>
          <div>
            
          </div>
          <div>
            <button class="btn-danger mt-3 px-3 py-2" v-b-modal.modal-1>
              Add<span>&plus;</span>
            </button>
            <!-- //* ANCHOR - MODAL FOR ADDING NEW CUSTOMER IN CUSTOMER TABLE -->
            <b-modal class="modalContainer" id="modal-1" centered title="Fill in customer details" header-class="justify-content-center" no-close-on-backdrop hide-footer>
                <div>
                <img class="mb-3 col-12 text-center" src="undraw_Selecting_team_re_ndkb.svg" alt="undraw_Selecting_team_re_ndkb.svg" width="200" height="120">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="custAddName"  placeholder="Name..." required>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="custAddAddress"  placeholder="Address.." required>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="custAddContact"  placeholder="Contact #..." required>
                </div>
                <!-- //* button inside b-row and b-col to adjust it's size and center it -->
                <b-row align-h="center">
                  <b-col cols='6' class="text-center">
                    <!-- //* TRIGGERS `addCustomer()` FUNCTION WHEN THE BUTTON IS CLICKED -->
                    <button @click="addCustomer()"  class="btn-danger mt-3 py-2">
                      Add<span>&plus;</span>
                    </button>
                  </b-col>
                </b-row>
            </b-modal>
          </div>
        </div>
        <CustTable 
        />
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return{
          custAddName: "",
          custAddAddress: "",
          custAddContact: "",
          custAddStatus: "",
        }
      },
      methods: {
          addCustomer(){
              this.$store.dispatch("Customers/addCustomer", {
                custName: this.custAddName,
                custAddress: this.custAddAddress,
                custContact: this.custAddContact,
                custStatus: this.custAddStatus,
              })
              .then(res => {
              // console.log("err", res);
              window.location.reload();
              })
              .catch(err => {
                console.log(err);
                this.showAlert(err.response.data.msg, "danger");
              });
          },
      },
        layout: "default",
        name: "Customers"
    };
</script>

<style lang="scss" scoped>

</style>