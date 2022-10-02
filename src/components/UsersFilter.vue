<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="form.gender"
            label="Género"
            item-text="value"
            item-value="key"
            hide-details
            outlined
            no-data-text="Datos no disponibles"
            dense
            :menu-props="{ bottom: true, offsetY: true }"
            :items="genderItems"
          >
          </v-select>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model.trim="form.age"
            label="Edad"
            placeholder="Buscar por edad"
            outlined
            dense
            hide-details
            :counter="20"
          />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-autocomplete
              v-model="form.nat"
              label="Nacionalidad"
              placeholder="Buscar por Nacionalidad"
              item-text="value"
              item-value="key"
              hide-details
              outlined
              dense
              no-data-text="Datos no disponibles"
              :menu-props="{ bottom: true, offsetY: true }"
              :items="countries"
            >
            </v-autocomplete>
        </v-col>
        
      </v-row>

      <v-row>
        <v-col
          class="d-flex align-center justify-end ml-auto"
          cols="12"
          sm="6"
          md="4"
        >
          <v-btn text depressed color="grey darken-1" @click="clearFilter">
            Limpiar Filtros
          </v-btn>
          <v-btn
            depressed
            color="rgba(40, 133, 215, .075)"
            class="primary--text ml-1"
            @click="search()"
            >Buscar</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import countriesItems from "@/helpers/countriesItems";

export default {
  name: "UsersFilter",
  data() {
    return {
      form: {
        gender: "",
        age: "",
        nat: "",
      },
      genderItems: [
        {
          key: 'male',
          value: 'Masculino',
        },
        {
          key: 'female',
          value: 'Femenino',
        },
      ],
      natItems: [
      {
          key: 'PE',
          value: 'Perú',
        },
      ],
      countries: countriesItems
    };
  },
  computed: {},
  mounted() {
  
  },
  methods: {
    clearFilter() {
      this.form.gender = "";
      this.form.age = null;
      this.form.nat = "";
      this.search();
    },
    search() {
      let _where = {};
      if (this.form.gender)
        _where['gender'] = this.form.gender;
      if (this.form.age) _where['age'] = Number(this.form.age);
      if (this.form.nat) _where['nat'] = this.form.nat;
      this.$emit("toFilter", _where);
    },
  },
};
</script>
