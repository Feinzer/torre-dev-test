import Vue from 'vue'
import Vuex from 'vuex'

import Filters from './filters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Filters,
  },
})
