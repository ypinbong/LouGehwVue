<template>
    <div class="mt-4">
        <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
        
        <b-col lg="5" class="my-3">
            <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            >
            <b-input-group size="sm">
                <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
                ></b-form-input>

                <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
            </b-input-group>
            </b-form-group>
        </b-col>

        <b-col sm="7" md="6" class="my-3">
            <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
            ></b-pagination>
        </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
        >
        <template #cell(name)="row">
            {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(actions)="row">
            <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
            Info modal
            </b-button>
            <b-button size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>
        </template>

        <template #row-details="row">
            <b-card>
            <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
            </b-card>
        </template>
        </b-table>

    <!-- Info modal -->
        <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <pre>{{ infoModal.content }}</pre>
        </b-modal>
    </b-container>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        ItemData: [],
        q: ''
      }
    },
    async fetch() {
        this.ItemData = await this.$content('ItemData')
            .fetch()
    }
  }
</script>

<style lang="scss" scoped>

</style>