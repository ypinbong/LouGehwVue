<template>
    <div class="overflow-auto my-4">
        <!-- // * ANCHOR - Displaying the table -->
        <input class="searchBar mb-3" type="search" v-model="filter" placeholder="Type to search..."/>
        <b-table
            id="supplier-table"
            :items="customersState"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            show-empty
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
        >
            <template v-slot:cell(action)="row">
                <b-button
                @click="edited(row.item, row.index)"
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
         <!-- //* ANCHOR - MODAL FORM FOR EDITING CUSTOMER DETAILS IN THE TABLE -->
        <b-modal
        id="editingCustomer"
        class="modalContainer" 
        centered title="Fill in customer details" header-class="justify-content-center"
        no-close-on-backdrop
        hide-footer>
            <div>
                <img class="mb-3 col-12 text-center" src="undraw_wall_post_83ul.svg" alt="undraw_wall_post_83ul.svg" width="200" height="120">
            </div>
            <div class="form-group">
                <input
                type="text"
                class="form-control"
                v-model="TempCustVar.editCustName"
                placeholder="Name..."
                required>
            </div>
            <div class="form-group">
                <input type="text"
                class="form-control"
                v-model="TempCustVar.editCustAddress"
                placeholder="Address.."
                required>
            </div>
            <div class="form-group">
                <input type="text"
                class="form-control"
                v-model="TempCustVar.editCustContact"
                placeholder="Contact #..."
                required>
            </div>
            <b-form-group >
                <b-form-select
                class="selectEditBtn"
                id="custStatus"
                v-model="TempCustVar.editCustStatus"
                :options="status"
                aria-describedby="input-2-live-feedback"
                data-vv-as="Status"
                ></b-form-select>
            </b-form-group>
            <!-- //? button inside b-row and b-col to adjust it's size and center it -->
            <b-row align-h="center">
                <b-col cols='6' class="text-center">
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
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
    data() {
        return {
            TempCustVar: {
                editCustName: null,
                editCustAddress: null,
                editCustContact: null,
                editCustStatus: '',
            },
            status: [
                { value: "", text: "Status...", disabled: true},
                { value: "active", text: "Active"},
                { value: "inactive", text: "Inactive"},
            ],

            filter: '',
            perPage: 10,
            currentPage:1,
            sortBy: 'id',
            sortDesc: false,
            fields: [
                { key: 'custid', label: 'ID', sortable: true },
                { key: 'custName', label: 'Name', sortable: true },
                { key: 'custAddress', label: 'Address', sortable: true },
                { key: 'custContact', label: 'Contact#', sortable: false },
                { key: 'custStatus', label: 'Status', sortable: true },
                { key: 'action', label: 'Action', sortable: false },
            ],
        }
    },
    beforeCreate(){
        this.$store.dispatch("Customers/loadCustomers", {
        // SecretKey: localStorage.SecretKey
        });
        },
        computed: {
        ...mapGetters({
            customersState: "Customers/allCustomers"
        }),
        rows() {
            return this.customersState.length;
        },
        async fetch() {
            this.customersState = await this.$store('Customers/customersState')
            .search(this.q)
            .fetch()
        }
    },
    methods: {
        edited(item, index){
            
            // this.Module = { ...data };
            // this.$bvModal.show("modal-edit");
            // console.log("ahsjkdha")
            // console.log(data);

            //this.

            this.$bvModal.show('editingCustomer')

        },
        submitChange(){
            this.$store.dispatch("Customers/editCustomer", {
            custName: this.TempCustVar.editCustName,
            custAddress: this.TempCustVar.editCustAddress,
            custContact: this.TempCustVar.editCustContact,
            custStatus: this.TempCustVar.editCustStatus,
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
    }
}

</script>

<style lang="scss" scoped>

</style>