<template>
  <div class="container">
    <h3 class="mt-3 mb-5">LISTA DE USUARIOS</h3>
    <div>
      <UsersFilter ref="refDocumentsFilter" @toFilter="toFilter" />
    </div>
    <v-divider></v-divider>
    <div>
      <v-data-table
        item-key="id.value"
        :headers="headers"
        :items="pagination.data"
        :page="query.page"
        :server-items-length="pagination.total"
        :items-per-page="pagination.perPage"
        @update:options="paginate"
        :loading="loadingItems"
        no-data-text="Datos no encontrados"
        loading-text="CARGANDO DATOS..."
        class="dataTable-detallado yi-table yi-table--row-auto"
        hide-default-footer
      >
        <template v-slot:[`item.gender`]="{ item: { gender } }">
          <span>{{ gender | translateGender }}</span>
        </template>

        <template v-slot:[`item.name`]="{ item: { name } }">
          <span>{{ `${name.title} ${name.first} ${name.last}` || "-" }}</span>
        </template>

        <template v-slot:[`item.nat`]="{ item: { nat } }">
          <span>{{ nat | getNationality }}</span>
        </template>

        <template v-slot:[`item.dob`]="{ item: { dob } }">
          <span>{{ dob.date | formatDate }}</span>
        </template>

        <template v-slot:[`item.registered`]="{ item: { registered } }">
          <span>{{ registered.date | formatDate }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">

          <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon
                @click="goToUser(item)"
                >
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                  >
                  mdi-eye
                  </v-icon>
                </v-btn>
              </template>
              <span>Ver usuario</span>
            </v-tooltip>
        </template>
        
      </v-data-table>
      <pagination
        v-model="query"
        :pagination="pagination"
        :length="pagination.pages"
        @page="next"
      ></pagination>
    </div>
  </div>
</template>

<script>
// components
import Pagination from "@/components/Pagination"
import UsersFilter from "@/components/UsersFilter"
// services
import UserService from "@/services/user.service"
// mixins
import mxUsers from "@/mixins/mxUsers";

export default {
  name: "Users",
  components: {
    UsersFilter,
    Pagination,
  },
  mixins: [mxUsers],
  methods: {
    async getAllUsers(query) {
      this.loadingItems = true;
      this.pagination.data = [];
      try {
        const { data } = await UserService.getAll(query);
        this.pagination.data = data.results
        this.pagination.total = 100
        this.pagination.pages = Math.ceil(this.pagination.total / this.pagination.perPage) 
        
      } catch (error) {
        console.log("error =>", error)
      } finally {
        this.loadingItems = false;
      }
    },
  },
};
</script>
