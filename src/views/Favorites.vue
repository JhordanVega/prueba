<template>
  <div class="container">
    <h3 class="mt-3 mb-5">USUARIOS FAVORITOS</h3>
    <div class="text-right mb-5">
      <v-btn
          @click="descargarPdf()"
          :loading="loadingPDFReport"
          color="primary"
          depressed
        >
          <v-icon>mdi-download</v-icon>
          Descargar como csv  
        </v-btn>
    </div>
    
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
import UserService from "@/services/user.service"
import Pagination from "@/components/Pagination"
import { mapState } from "vuex";
import mxUsers from "@/mixins/mxUsers";

export default {
  name: "UsersFavorites",
  components: {
    Pagination,
  },
  mixins: [mxUsers],
  data: () => ({
    loadingPDFReport: false,
  }),
  computed: {
    ...mapState({
        usersFavorites: (state) => state.usersFavorites,
    }),
  },
  methods: {
    getAllUsers() {
      this.pagination.data = this.usersFavorites.usersFavorites
      this.pagination.total = this.usersFavorites.usersFavorites.length
      this.pagination.pages = Math.ceil(this.pagination.total / this.pagination.perPage) 
    },
    descargarPdf() {
      this.loadingPDFReport = true;
      UserService.getCSV()
        .then((r) => {
          const url = window.URL.createObjectURL(new Blob([r.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "usuariosFavoritos.csv");
          document.body.appendChild(link);
          link.click();
        })
        .catch(console.error)
        .finally(() => {
          this.loadingPDFReport = false;
        });
    },
  },
};
</script>

