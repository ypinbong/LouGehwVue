<template>
    <div>
        <div class="TransDetailsContainer my-3">
            <h3>Transaction Details</h3>
            <b-container>
                <b-form class="form-inline">
                    <label for="supplierInput">Supplier:</label>
                    <b-col sm="3" class="form-inline">
                        <b-form-input
                        list="suppliersList"
                        id="supplierInput"
                        placeholder="Enter supplier name"
                        ></b-form-input>
                        <b-form-datalist id="suppliersList">
                            <option
                            v-for="suppliersList in suppliersState"
                            :key="suppliersList.supid"
                            :value="suppliersList.supName"
                            >
                                Name: {{ suppliersList.supName }} | Contact#: {{ suppliersList.supContact }}
                            </option>
                        </b-form-datalist>
                    </b-col>
                    <label>Delivery date:</label>
                    <b-col sm="3">
                        <b-form-input sm="3" type="date"></b-form-input>
                    </b-col>
                </b-form>
            </b-container>
        </div>
        <div class="AddItemsContainer my-3">
            <h3>Add Items</h3>
            <b-container>
                <b-form class="form-inline">
                    <label class="ml-2" for="itemInput">Item:</label>
                    <b-col sm="4" class="form-inline">
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
                                Name: {{ itemsList.name }} | Price: Php {{ itemsList.price }}
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
                        type="text"
                        placeholder=""
                        v-model="quantity"
                        ></b-form-input>
                    </b-col>
                    <b-button variant="danger" @click="addToPending">Add+</b-button>
                </b-form>
            </b-container>
            </div>
    </div>
</template>


<script setup>

import { mapGetters } from "vuex";

export default {
    data(){
        return {
            suppliersList:[],
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
            console.log("heyy", this.suppliersState);
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