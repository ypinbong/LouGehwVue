<template>
    <div class="overflow-auto my-4">
    
    <input class="searchBar mb-3" type="search" v-model="filter" @input="$fetch" placeholder="Type to search..."/>
    <b-table
      :items="TransData"
      :fields="fields"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :per-page="perPage"
      :current-page="currentPage"
      responsive="sm"
      bg-white text-dark
    >
    <template v-slot:cell(transType)="row">
            <a href="/Shop" style="background-color:red;">
                {{ row.item.transType }}
            </a>
    </template>
    </b-table>
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

import TransData from '~/content/TransData/transData.json'

    export default {
        data() {
            return {
                TransData:[],
                filter: '',
                perPage: 10,
                currentPage:1,
                // sortBy: 'id',
                // sortDesc: false,
                fields: [
                    { key: 'id', sortable: true },
                    { key: 'transType', sortable: true },
                    { key: 'transDate', sortable: true },
                ],
            }
        },
        computed:{
            rows() {
                return this.TransData.length
            }
        },
        async fetch() {
            this.TransData = await this.$content('TransData')
            .search(this.q)
            .fetch()
        }
    }

</script>

<style lang="scss" scoped>

</style>