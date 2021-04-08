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
					<!-- // ?ANCHOR - Item Input Search -->
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
                                ID#: {{itemsList.id}} | Name: {{ itemsList.name }} | Price: Php {{ itemsList.price }}.00
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
            <b-table
            id="PendingTable"
            :items="pendingItems"
            show-empty
            :fields="fields"
            :key="customersState.custid"
            fixed
            >
            <template #cell(price)="data">
                Php {{ data.item.price }}.00
            </template>
            <template #cell(subTotal)="data">
                Php {{ data.item.subTotal }}.00
            </template>
            <template v-slot:cell(action)="row">
                <b-button
                @click="edit(row.item, row.index)"
                size="sm"
                class="editBtn mr-2"
                variant="none"
                pill
                >
                    <i class="fas fa-trash-alt"></i>
                </b-button>
            </template>
        </b-table>
        <b-col class="tableFooter">
            <th class="tableFooter__TH" scope="row">Grand Total: </th>
            <td class="tableFooter__TD"> Php {{grandTotal}}.00 </td>
		</b-col>
        </div>
        <b-button
        @click="addPendingToDB"
        size="sm"
        class="my-5"
        variant="danger"
        >
            <i class="fas fa-cash-register"></i> Checkout
        </b-button>
    </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
    data() { 
        return { 
            customersList:[],
            itemsList: [], 
			pendingItems: [],
			custid:'',
			currentTotal: '0',
			grandTotal: '0',
            id:'',
            name:'',
            custName:'',
            quantity:'',
            price:'',
			selectedQuantity: '',
			subTotal: '',
            fields: [
                { key: 'id', label: 'Item ID', sortable: true },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'selectedQuantity', label: 'Qty', sortable: true },
                { key: 'price', label: 'Price', sortable: true },
                { key: 'subTotal', label: 'Sub Total', sortable: true },
                { key: 'action', label: 'Action', sortable: false },
            ],
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
        calcSubTotal() {
			this.subTotal = this.selectedQuantity * this.price;

			console.log("Subtotal", this.subTotal);
		},
		addToPendingItems() {
			this.pendingItems.push({
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
			(this.price = "");
			(this.subTotal = "");
		},
		clearpending() {
			this.pendingItems = "";
		},
        checkoutPendingItems() {
            this.$store.dispatch("Transactions/AddNewDelivery", {
                supName: this.supName,
                deliveryDate: this.deliveryDate,
                grandTotal: this.grandTotal,
                id: this.id,
            })
        }
    }
}

</script>

<style lang="scss" scoped>
form {
    display: flex !important;
    justify-content: center !important;
    .btn-danger{
        padding:3px 5px 3px 5px;
        font-size:18px;
    }
}
.tableFooter {
    color: white;
    background-color: #e54f60;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    height: 30px;
    .tableFooter__TH {
        grid-column: 4;
        margin-top: auto;
        margin-bottom: auto;
    }
    .tableFooter__TD {
        padding-left: 11px;
        font-weight: bold;
        margin-top: auto;
        margin-bottom: auto;
    }
}
</style>