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
            id="deliveryHistoryTable"
            :items="deliveriesState"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            show-empty
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :key="deliveriesState.deliveryTransactionId"
        >
            <template v-slot:cell(action)="row">
                <b-button
                @click="viewItems(row.item, row.index)"
                size="sm"
                class="viewBtn mr-2"
                pill
                >
                    <i class="fas fa-cubes"></i> view items
                </b-button>
            </template>
        </b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
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
            fields: [
                { key: 'deliveryTransactionId', label: 'ID', sortable: true },
                { key: 'grandTotal', label: 'Amount', sortable: true },
                { key: 'supName', label: 'Supplier', sortable: true },
                { key: 'deliveryDate', label: 'Delivery Date', sortable: true },
                { key: 'action', label: 'Action', sortable: false },
            ],
        }
    },
    beforeCreate(){
        this.$store.dispatch("Transactions/getDeliveryHistory", {});
        this.$store.dispatch("Suppliers/getSuppliers", {});
        },
        computed: {
            ...mapGetters({
                deliveriesState: "Transactions/allDeliveries",
                suppliersState: "Suppliers/allSuppliers",
            }),
            rows() {
                return this.deliveriesState.length;
            },
            async fetch() {
                this.deliveriesState = await this.$store('Transactions/deliveriesState')
                .search(this.q)
                .fetch()
            }
        },
    methods: {
        
    }
}

</script>

<style lang="scss" scoped>

</style>