<template>
    <div>
        <!-- <div class="TransactionDetailsContainer my-3">
            <b-row class="inputContainer">
                <label for="customerInput">Cusotmer's Name:</label>
                <b-col sm="4" class="form-inline">
                    <b-form-input
                    list="customersList"
                    id="customerInput"
                    placeholder="Enter customer name"
                    ></b-form-input>
                    <b-form-datalist id="itemsList">
                        <option
                        v-for="customersList in customersState"
                        :key="customersList.custid"
                        :value="cutomersList.custName"
                        >
                            Name: {{ customersList.custName }} | Contact#: {{ customersList.custContact }}
                        </option>
                    </b-form-datalist>
                </b-col>
            </b-row>
        </div> -->
        <div class="AddItemsContainer my-3">
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
        <!-- <table class="table mt-5">
            <thead>
                <tr>
                    <th scope="col">No.</th>
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
        </table> -->
    </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
    data() { 
        return { 
            customersList:[],
            itemsList: [], 
            selectedItem: [],
            name:'',
            price:'',
        }
    },
    beforeCreate() {
        this.$store.dispatch("Items/getItems", {});
        this.$store.dispatch("Customers/getCustomers", {});
    },
    computed: {
        ...mapGetters({
            itemsState: "Items/allItems" ,
            customersState: "Customers/allCustomers"
        }),
    },
    methods: {
        selectedItems(){
            let selectedItem = this.itemsState.find(
            (selectedItem) => selectedItem.name == this.name
        );
            this.price = selectedItem.price;
            console.log("heyy", this.customersStates);

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