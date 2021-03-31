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
            <template v-slot:cell(action)="row">
                <b-button
                @click="edit(row.item, row.index)"
                size="sm"
                class="mr-2"
                variant="success"
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
    </div>
</template>

<script>
// import customersList from 'customers/list'
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
    props: {
        TempVar: Object
    },
    data() {
        return {
            TempCustVar: {
                custEditName: null,
                custEditAddress: null,
                custEditContact: null,
                custEditStatus: '',
            },
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
            this.customersState = await this.$store('customersState')
            .search(this.q)
            .fetch()
        }
    },
    methods: {
        edit(data){
            
            this.Module = { ...data };
            this.$bvModal.show("modal-edit");
            // console.log("ahsjkdha")
            // console.log(data);
            this.$bvModal.show('modal-edit')

        }
    }
}

</script>

<style lang="scss" scoped>

</style>