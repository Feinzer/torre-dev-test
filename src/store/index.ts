import Vue from 'vue'
import Vuex from 'vuex'

import Filters from './filters'
import SearchType from './searchType'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    SearchType,
    Filters,
  },
})
