/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'

export default {
  state: () => [],
  mutations: {
    addFilter: (state: any, data: any) => {
      state.push(data)
    },
    updateFilter: (state: any, data: any) => {
      Vue.set(state, data.index, data.filter)
    },
  },
  actions: {
    addFilter: ({ commit }: any, data: any) => {
      commit('addFilter', data)
    },
    updateFilter: ({ commit, state }: any, data: any) => {
      const index = state.findIndex((filter: any) => filter.key == data.key)
      const filter = data
      commit('updateFilter', { index, filter })
    },
  },
  getters: {
    Filters: (state: any) => {
      return state
    },
    GetFilter: (state: any) => (key: string) => {
      const index = state.findIndex((filter: any) => filter.key == key)
      if (index > -1) return state[index].value
      else return undefined
    },
  },
}
