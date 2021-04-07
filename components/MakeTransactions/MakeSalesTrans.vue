<template>
    <div class="MakeTransContainer">
        <div class="TransDetailsContainer my-3">
            <h3>Sales Details</h3>
            <b-container>
                <b-form class="form-inline">
					<label>ID: </label>
                    <b-col sm="1" class="form-inline">
                        <b-form-input
                        class="form-control"
                        type="text"
                        placeholder="#"
                        v-model="custid"
                        readonly
                        ></b-form-input>
                    </b-col>
					<!-- // ANCHOR - Customer Input search -->
                    <label for="customerInput">Customer's Name:</label>
                    <b-col sm="3" class="form-inline">
                        <b-form-input
                        list="customersList"
                        id="customerInput"
                        placeholder="Enter customer name"
						v-model="custName"
						@change="selectedCustomers"
                        ></b-form-input>
                        <b-form-datalist id="customersList">
                            <option
                            v-for="customersList in customersState"
                            :key="customersList.custid"
                            :value="customersList.custName"
                            >
                                ID#: {{customersList.custid}} | Name: {{ customersList.custName }} | Contact#: {{ customersList.custContact }}
                            </option>
                        </b-form-datalist>
                    </b-col>

                </b-form>
            </b-container>
        </div>
        <div class="AddItemsContainer my-3">
            <h3>Purchased Items</h3>
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
					<!-- // ANCHOR - Item Input Search -->
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
                        v-model="selectedQuantity"
						@input="calcSubTotal"
                        ></b-form-input>
                    </b-col>
                    <b-button variant="danger" @click="addToPendingItems">Add <i class="fas fa-plus"></i></b-button>
                </b-form>
            </b-container>
        </div>
        <div class="PendingItemsTable">
            <table class="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(addedItem, i) in list" :key="i">
                        <th scope="row">{{ ++i }}</th>
                        <td>{{ addedItem.id }}</td>
                        <td>{{ addedItem.name }}</td>
                        <td>{{ addedItem.selectedQuantity }}</td>
                        <td>{{ addedItem.price }}</td>
                        <td>{{ addedItem.subtotal }}</td>
                    </tr>
                </tbody>
				<tfoot>
					<th scope="row">Grand Total: </th>
					<td> {{grandTotal}} </td>
				</tfoot>
            </table>
        </div>
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
			custid:'',
			selectedQuantity: '',
			addedItems: [],
			subTotal: '',
			addedItem: '',
			currentTotal: '0',
			grandTotal: '0',
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
			this.id = selectedItem.id;
            // console.log("heyy", this.customersState);
        },
		selectedCustomers(){
            let selectedCustomer = this.customersState.find(
            (selectedCustomer) => selectedCustomer.custName == this.custName
        );
			this.custid = selectedCustomer.custid;
        },
		addToPendingItems() {
			this.addedItems.push({
				id: this.id,
				name: this.name,
				selectedQuantity: this.selectedQuantity,
				price: this.price,
				subTotal: this.subTotal,
			});
			this.currentTotal = (this.currentTotal*1) + (this.subTotal*1);
			this.grandTotal = this.currentTotal;
			this.clearForm();
		},
		clearForm() {
			(this.id = ""),
			(this.name = ""),
			(this.selectedQuantity = ""),
			(this.price = ""),
			(this.subTotal = "");
		},
		clearpending() {
			this.addedItems = "";
		},
		list() {
			console.log("AddedItems HERE", this.addedItems);
			return this.addedItems;
    	},
		calcSubTotal() {
			this.subTotal = this.selectedQuantity * this.price;
			console.log("Subtotal", this.subTotal);
		},
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