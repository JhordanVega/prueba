import Vue from 'vue'
import Vuex from 'vuex'

import * as usersFavorites from "@/store/modules/usersFavorites";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    usersFavorites
  }
})
