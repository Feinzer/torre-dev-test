/* eslint-disable @typescript-eslint/no-explicit-any */
import { SEARCH_TYPE } from '@/types/types'

export default {
  state: () => ({ type: '' }),
  mutations: {
    SET_TYPE: (state: any, payload: SEARCH_TYPE) => {
      state.type = payload
    },
  },
  actions: {
    setSearchType: ({ commit }: any, data: SEARCH_TYPE) => {
      commit('SET_TYPE', data)
    },
  },
  getters: {
    SearchType: (state: any) => {
      return state.type
    },
  },
}
