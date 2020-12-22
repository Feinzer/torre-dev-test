/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  state: () => ({
    filters: [{ value: 'full-time-employment' }],
  }),
  mutations: {
    addFilter: (state: any, data: any) => {
      state.filters.push(data)
    },
    updateFilter: (state: any, data: any) => {
      state.filters[data.index] = data.filter
    },
  },
  actions: {
    addFilter: ({ commit }: any, data: any) => {
      commit('addFilter', data)
    },
    updateFilter: ({ commit, state }: any, data: any) => {
      const index = state.filters.findIndex(
        (filter: any) => filter.id == data.id,
      )
      const filter = data
      commit('updateFilter', { index, filter })
    },
  },
  getters: {
    Filters: (state: any) => {
      return state.filters
    },
  },
}
