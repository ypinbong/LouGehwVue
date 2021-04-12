<template>
    <div class="overflow-auto my-4">
        <!-- // * ANCHOR - Displaying the table -->
        <input
        class="searchBar mb-3"
        type="search"
        v-model="filter"
        placeholder="Type to search..."
        />
        <b-table
            id="salesHistoryTable"
            :items="salesState"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            show-empty
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :key="salesState.salesTransactionId"
        >
            <template #cell(action)="row">
                <b-button
                @click="row.toggleDetails();orderedItem(row.item); "
                size="sm"
                class="viewBtn mr-2"
                pill
                >
                    <i class="fas fa-eye"></i> 
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} items
                </b-button>
            </template>
            <template #row-details="row">
                <b-table
                id="salesItems"
                :items="salesState[0].itemsListRows"
                :fields="itemsListFields"
                head-variant="light"
                ></b-table>
            </template>
        </b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="salesHistoryTable"
        ></b-pagination>
    </div>
</template>

<script>
// import customersList from 'customers/list'
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
    data() {
        return {
            filter: '',
            perPage: 10,
            currentPage:1,
            sortBy: 'id',
            sortDesc: false,
            itemsListRows: [],
            fields: [
                { key: 'salesTransactionId', label: 'ID', sortable: true },
                { key: 'grandTotal', label: 'Amount', sortable: true },
                { key: 'custName', label: 'Customer', sortable: true },
                { key: 'date', label: 'Transaction Date', sortable: true },
                { key: 'action', label: 'Action', sortable: false },
            ],
            itemsListFields: [
                { key: 'itemsListRows[0].id', label: 'ID' },
                { key: 'itemsListRows.name', label: 'Name' },
                { key: 'itemsListRows.barcode', label: 'Barcode' },
                { key: 'itemsListRows.quantity', label: 'Qty' },
                { key: 'itemsListRows.price', label: 'Price' },
                { key: 'itemsListRows.subTotal', label: 'Sub Total' }
            ]
        }
    },
    beforeCreate(){
        this.$store.dispatch("Transactions/getSalesHistory", {});
        this.$store.dispatch("Customers/getCustomers", {});
        },
        computed: {
            ...mapGetters({
                salesState: "Transactions/allSales",
                customersState: "Customers/allCustomers"
            }),
            rows() {
                return this.salesState.length;
            },
            async fetch() {
                this.salesState = await this.$store('Transactions/salesState')
                .search(this.q)
                .fetch()
                console.log("Some", this.salesState);
            },
        },
     
        
    methods: {
            orderedItem(item) {
      // console.log("here", item.product_orders);
      console.log("item", item.itemsListRows[0].id);


    //   this.ordered.productOrdered = item.product_orders;
    }
        
    }
}

</script>

<style lang="scss" scoped>
    td{
        color: black !important;
    }
</style>