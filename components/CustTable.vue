<template>
    <div class="overflow-auto my-4">
    
    <input class="searchBar mb-3" type="search" v-model="filter" @input="$fetch" placeholder="Type to search..."/>
    <b-table
      :items="CustData"
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
            <b-button size="sm" @click="" class="mr-2">
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

import CustData from '~/content/CustData/custData.json'

    export default {
        data() {
            return {
                CustData:[],
                filter: '',
                perPage: 10,
                currentPage:1,
                // sortBy: 'id',
                // sortDesc: false,
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
        computed:{
            rows() {
                return this.CustData.length
            }
        },
        async fetch() {
            this.CustData = await this.$content('CustData')
            .search(this.q)
            .fetch()
        }
    }

</script>

<style lang="scss" scoped>

</style>