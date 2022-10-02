<template>
  <v-card class="my-2">
    <v-card-text>
      <v-row align="center">
        <v-col v-if="showResultsPerPage" cols="12" sm="6">
          <v-row justify="start" align="center">
              <div class="d-inline-flex mr-2 pl-3 align-center" style="min-width: 120px;min-height: 40px;">
                Resultados por página:
              </div>
              <div class="d-inline-flex mr-2" style="width: 50px;">
                <v-select
                  v-if="pagination && pagination.perPage"
                  v-model="pagination.perPage"
                  :items="itemsPerPageOptions"
                  hide-details
                  min-height="40"
                  class="my-0 py-0"
                ></v-select>
              </div>
              <div class="d-inline-flex mx-2">
                |
              </div>
            <div class="d-flex align-center" style="min-width: 20px;min-height: 40px;">
              Total:
              <span class="body-2 ml-2 font-weight-black"> {{ pagination.total || '-' }}</span>
            </div>
          </v-row>
        </v-col>
        <v-col cols="12" :sm="`${showResultsPerPage?'6':'12'}`" class="text-right justify-end">
          <v-pagination
            v-model="query.page"
            class="d-inline-flex mt-0 pr-0"
            circle
            light
            :length="lengthPages"
            :total-visible="7"
            @input="handleInputPage"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "Pagination",
  model: { prop: 'query', event: 'change' },
  props: {
    pagination: {
      type: Object,
      default: () => {}
    },
    query: {
      type: Object,
      default: () => {}
    },
    length: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'table'
    },
    showResultsPerPage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    lengthPages() {
      return this.pagination.pages
    },
    itemsPerPageOptions() {
      return [10, 20, 30, 40, 50]
    }
  },
  methods: {
    handleInputPage(e) {
      this.$emit('page', e);
    },
  }
}
</script>