/* eslint-disable @typescript-eslint/no-explicit-any */
import { SEARCH_TYPE } from '@/types/types'

export default {
  state: () => ({ type: '' }),
  mutations: {
    SET_TYPE: (state: any, payload: typeof SEARCH_TYPE) => {
      state.type = payload
    },
  },
  actions: {
    SetSearchType: ({ commit }: any, data: typeof SEARCH_TYPE) => {
      commit('SET_TYPE', data)
    },
  },
  getters: {
    SearchType: (state: any) => {
      return state.type
    },
  },
}
