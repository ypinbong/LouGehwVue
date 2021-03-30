<template>
    <div class="overflow-auto my-4">
    
    <input class="searchBar mb-3" type="search" v-model="filter" @input="$fetch" placeholder="Type to search..."/>
    <b-table
        :items="ItemData"
        :fields="fields"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :per-page="perPage"
        :current-page="currentPage"
        responsive="sm"
        bg-white text-dark
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

import ItemData from '~/content/ItemData/itemData.json'

    export default {
        data() {
            return {
                ItemData:[],
                filter: '',
                perPage: 10,
                currentPage:1,
                fields: [
                    { key: 'id', label: 'ID', sortable: true },
                    { key: 'name',label: 'Name', sortable: true },
                    { key: 'barcode', label: 'Barcode#', sortable: true },
                    { key: 'description', label: 'Description', sortable: false },
                    { key: 'supplier', label: 'Supplier', sortable: true },
                    { key: 'quantity', label: 'Qty', sortable: true },
                    { key: 'price', label: 'Price', sortable: true },
                    { key: 'action', label: 'Action', sortable: false },
                ],
            }
        },
        computed:{
            rows() {
                return this.ItemData.length
            }
        },
        async fetch() {
            this.ItemData = await this.$content('ItemData')
            .search(this.q)
            .fetch()
        }
    }

</script>

<style lang="scss" scoped>

</style>