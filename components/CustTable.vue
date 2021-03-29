<template>
    <div class="overflow-auto my-4">
    
        <input class="searchBar mb-3" type="search" v-model="filter" placeholder="Type to search..."/>
        <b-table
            id="supplier-table"
            :items="customersState"
            :busy.sync="isBusy"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            @filtered="onFiltered"
            show-empty
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
        >
            <template #cell(action)="data">
                <b-button size="sm" class="mr-2" v-b-modal="'modal-edit'">
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
        this.$store.dispatch("Customer/loadCustomers", {
        // SecretKey: localStorage.SecretKey
    });
    },
    computed: {
    ...mapGetters({
        customersState: "Customer/allCustomers"
    }),
    rows() {
        return this.customersState.length;
    },
    async fetch() {
        this.customersState = await this.$store('customersState')
        .search(this.q)
        .fetch()
    }
  }
}

</script>

<style lang="scss" scoped>

</style>