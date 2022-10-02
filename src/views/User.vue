<template>
    <div class="container">
        <v-card
            elevation="5"
            class="mx-auto my-12 pa-4 card-user"
            max-width="600"
            >
            <v-row class="justify-center align-center">
                <v-col cols="12" sm="4" md="4" class="text-center text-sm-start">
                    <v-avatar
                        size="170"
                        class="mb-2"
                    >
                        <img
                            :src="`${cmptUser.picture.large}`"
                            :alt="`${cmptFullName}`"
                        >
                    </v-avatar>
                    <h3 class="text-center">{{ cmptFullName }}</h3>
                    <div class="text-center">
                        <v-btn
                            icon
                            color="pink"
                            @click="changeFavorite"
                            >
                            <v-icon>{{isFavorite?'mdi-heart':'mdi-heart-outline'}}</v-icon>
                        </v-btn>
                    </div>
                </v-col>
                <v-col cols="12" sm="8" md="8">
                    <p>
                        <v-icon>mdi-cake-variant-outline</v-icon>
                        {{ `${getDate(cmptUser.dob.date)} (${cmptUser.dob.age} años)` }}
                    </p>
                    <p>
                        <v-icon>mdi-email-outline</v-icon>
                        {{ cmptUser.email }}
                    </p>
                    <p>
                        <v-icon>mdi-phone-outline</v-icon>
                        {{ cmptUser.phone }}
                    </p>
                    <p>
                        <v-icon>mdi-cellphone</v-icon>
                        {{ cmptUser.cell }}
                    </p>
                    <p>
                        <v-icon>mdi-map-marker-outline</v-icon>
                        {{ cmptLocation }}
                    </p>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { extractAndFormatDate } from '@/utils/utilsDate'
export default {
  name: "User",
  data: () => ({
    isFavorite: false
  }),
  mounted() {
    if("isFavorite" in this.cmptUser){
        this.isFavorite = this.cmptUser.isFavorite
    }
  },
  computed: {
    cmptUser(){
        return this.$route.params
    },
    cmptFullName(){
        const name = this.cmptUser.name
        return `${name.title} ${name.first} ${name.last}`
    },
    cmptLocation() {
        const location = this.cmptUser.location
        return `${location.street.name} ${location.street.number} - ${location.city} - ${location.country}`
    }
  },
  methods: {
    ...mapMutations({
      addUserFavorite: "usersFavorites/ADD_USER_FAVORITE",
      removeUserFavorite: "usersFavorites/REMOVE_USER_FAVORITE",
    }),
    getDate(date){
        return extractAndFormatDate(date)
    },
    changeFavorite(){
        if(this.isFavorite) {
            this.removeUserFavorite(this.cmptUser)
        }else{
            this.addUserFavorite(this.cmptUser);
        }
        this.isFavorite = !this.isFavorite
    }
  },
}
</script>
<style lang="scss" scoped>
    .card-user { 
        border-radius: 7px; 
    }
</style>