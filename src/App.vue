<template>
  <v-app>
    <template>
      <div>
        <v-app-bar
          dense
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>
            <router-link to="/users">
              Usuarios
            </router-link>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <router-link to="/favorites">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon>
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-heart
                  </v-icon>
                </v-btn>
              </template>
              <span>Favoritos</span>
            </v-tooltip>
          </router-link>

          <v-menu
            left
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="n in 5"
                :key="n"
                @click="() => {}"
              >
                <v-list-item-title>Option {{ n }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
      </div>
    </template>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
  a { 
    text-decoration: none;
    color: white !important; 
  }
</style>
