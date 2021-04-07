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
                        ></b-form-input>
                        <b-form-datalist id="suppliersList">
                            <option
                            v-for="suppliersList in suppliersState"
                            :key="suppliersList.supid"
                            :value="suppliersList.supName"
                            >
                                ID#: {{suppliersList.supid}} | Name: {{ suppliersList.supName }} | Contact#: {{ suppliersList.supContact }}
                            </option>
                        </b-form-datalist>
                    </b-col>
                    <label>Delivery date:</label>
                    <b-col sm="3">
                        <b-form-input type="date"></b-form-input>
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
                        ></b-form-input>
                        <b-form-datalist id="itemsList">
                            <option
                            v-for="itemsList in itemsState"
                            :key="itemsList.id"
                            :value="itemsList.name"
                            >
                                ID#: {{itemsList.id}} | Name: {{ itemsList.name }} | Price: Php {{ itemsList.price }}
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
                        v-model="quantity"
                        ></b-form-input>
                    </b-col>
                    <b-button variant="danger" @click="addToPending">Add <i class="fas fa-plus"></i></b-button>
                </b-form>
            </b-container>
        </div>
        <div class="PendingItemsTable">
            <table class="table mt-5">
                <thead>
                    <tr>
                        <th >No.</th>
                        <th scope="col">Barcode</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in list" :key="i">
                        <th scope="row">{{ ++i }}</th>
                        <td>{{ item.barcode }}</td>
                        <td>{{ item.Product_name }}</td>
                        <td>{{ item.Quantity }}</td>
                        <td>{{ item.Price }}</td>
                        <td>{{ item.Total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup>

import { mapGetters } from "vuex";

export default {
    data(){
        return {
            suppliersList:[],
            itemsList: [],
            selectedItem: [],
            name:'',
            price:'',
            supid:'',
        }
    },
    beforeCreate() {
        this.$store.dispatch("Items/getItems", {});
        this.$store.dispatch("Suppliers/getSuppliers", {});
    },
    computed: {
        ...mapGetters({
            itemsState: "Items/allItems" ,
            suppliersState: "Suppliers/allSuppliers"
        })
    },
    methods: {
        selectedItems(){
            let selectedItem = this.itemsState.find(
            (selectedItem) => selectedItem.name == this.name
        );
            this.price = selectedItem.price;
            this.id = selectedItem.id;
            console.log("heyy", this.suppliersState);
        },
        selectedSuppliers(){
            let selectedSupplier = this.suppliersState.find(
            (selectedSupplier) => selectedSupplier.supName == this.supName
        );
            this.supid = selectedSupplier.supid;
        }
    }
}
</script>

<style lang="scss" scoped>
form{
    display: flex !important;
    justify-content: center !important;
    .btn-danger{
        padding:3px 5px 3px 5px;
        font-size:18px;
    }
}
</style>