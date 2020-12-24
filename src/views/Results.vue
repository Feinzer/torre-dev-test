<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import { mapGetters } from 'vuex'
import axios from 'axios'

import { SEARCH_TYPE, JOB_TYPES } from '@/types/types'

export default Vue.extend({
  name: 'ResultsView',
  data: () => ({
    searchResults: [],
    JobTypes: JOB_TYPES,
  }),
  computed: {
    ...mapGetters(['GetFilter', 'SearchType']),
  },
  async mounted() {
    const jobType = this.GetFilter('type')
    const skills = this.GetFilter('skills')
    const salary = this.GetFilter('salary')
    const location = this.GetFilter('location')

    location.full = ''
    if (location.city) location.full += `${location.city}, `
    if (location.state) location.full += `${location.state}, `
    if (location.country) location.full += `${location.city}`

    const data = []
    if (jobType) {
      if (this.SearchType == SEARCH_TYPE.USER)
        data.push({ opento: { term: jobType } })
      else if (this.SearchType == SEARCH_TYPE.JOB)
        data.push({ type: { code: jobType } })
    }
    if (skills)
      skills.forEach((skill: any) => {
        data.push({
          'skill/role': { experience: '1-plus-year', text: skill.title },
        })
      })
    if (salary)
      data.push({
        compensationrange: {
          minAmount: Number(salary.salary),
          maxAmount: Number(salary.salary * 2),
          currency: 'USD$',
          periodicity: salary.period.key,
        },
      })
    if (location && location.remote)
      data.push({ remoter: { term: location.remote } })
    if (location && location.full)
      data.push({ location: { term: 'Venezuela' } })

    let url = ''
    if (this.SearchType == SEARCH_TYPE.JOB)
      url = url = `https://search.torre.co/opportunities/_search/?currency=USD$&page=0&periodicity=${salary.period.key}&lang=en&size=100&aggregate=false&offset=0`
    else if (this.SearchType == SEARCH_TYPE.USER)
      url = `https://search.torre.co/people/_search/?currency=USD$&page=0&periodicity=${salary.period.key}&lang=en&size=100&aggregate=false&offset=0`
    else this.$router.push('/')

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    await axios
      .post(url, {
        and: [...data],
      })
      .then((response: any) => {
        console.log(response)
        self.searchResults = response.data.results
      })
  },
})
</script>

<template>
  <div class="flex flex-col w-full h-full items-center pb-12 overflow-y-auto">
    <p class="my-16 text-2xl">Your results!</p>
    <div class="flex flex-col md:w-1/2">
      <div
        v-for="result in searchResults"
        :key="result.id"
        class="flex flex-col p-4 mb-10 bg-light-primary dark:bg-dark-primary shadow-md rounded-md"
      >
        <p>{{ result.objective }}</p>
        <p>
          {{ JobTypes.find(type => type.key == result.type).title || '' }}
        </p>
        <p>
          {{
            result.organizations.length > 0 ? result.organizations[0].name : ''
          }}
        </p>
      </div>
    </div>
  </div>
</template>
