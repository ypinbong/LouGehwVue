<template>
    <div class="overflow-auto my-4">
    
    <input class="searchBar mb-3" type="search" v-model="filter" @input="$fetch" placeholder="Type to search..."/>
    <b-table
      :items="SupData"
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

import SupData from '~/content/SupData/supData.json'

    export default {
        data() {
            return {
                SupData:[],
                filter: '',
                perPage: 10,
                currentPage:1,
                // sortBy: 'id',
                // sortDesc: false,
                fields: [
                    { key: 'supid', label: 'ID', sortable: true },
                    { key: 'supName', label: 'Name', sortable: true },
                    { key: 'supAddress', label: 'Address', sortable: true },
                    { key: 'supContact#', label: 'Contact#', sortable: false },
                    { key: 'supStatus', label: 'Status', sortable: true },
                    { key: 'action', label: 'Action', sortable: false },
                ],
            }
        },
        computed:{
            rows() {
                return this.SupData.length
            }
        },
        async fetch() {
            this.SupData = await this.$content('SupData')
            .search(this.q)
            .fetch()
        }
    }

</script>

<style lang="scss" scoped>

</style>