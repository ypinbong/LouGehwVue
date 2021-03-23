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
    ></b-table>
    <b-pagination
        v-model="currentPage"
        pills
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
                    { key: 'id', sortable: true },
                    { key: 'name', sortable: true },
                    { key: 'barcode', sortable: true },
                    { key: 'description', sortable: false },
                    { key: 'supplier', sortable: true },
                    { key: 'quantity', sortable: true },
                    { key: 'price', sortable: true },
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