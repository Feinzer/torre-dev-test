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
    searchTypes: SEARCH_TYPE,
  }),
  async mounted() {
    if (!this.SearchType || !this.Filters) this.$router.push('/')

    const jobType = this.GetFilter('type')
    const skills = this.GetFilter('skills')
    const salary = this.GetFilter('salary')
    const location = this.GetFilter('location')

    location.full = ''
    if (location.city) location.full += `${location.city}, `
    if (location.state) location.full += `${location.state}, `
    if (location.country) location.full += `${location.country}`

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
          maxAmount: Number(salary.salary * 10),
          currency: 'USD$',
          periodicity: salary.period.key,
        },
      })
    if (location && location.remote)
      data.push({ remoter: { term: location.remote } })
    if (location && location.full)
      data.push({ location: { term: location.full } })

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
  computed: {
    ...mapGetters(['Filters', 'GetFilter', 'SearchType']),
    mappedKeys(): any {
      const keys = {} as Record<string, any>
      if (this.SearchType == SEARCH_TYPE.JOB) {
        keys.title = 'objective'
        keys.remote = 'remote'
      } else if (this.SearchType == SEARCH_TYPE.USER) {
        keys.title = 'name'
        keys.remote = 'remoter'
      }
      return keys
    },
  },
  methods: {
    mappedJobType(result: any) {
      if (this.SearchType == SEARCH_TYPE.JOB) {
        return JOB_TYPES.find((type: any) => type.key == result.type)?.title
      } else {
        return JOB_TYPES.find((type: any) => type.key == this.GetFilter('type'))
          ?.title
      }
    },
    mappedLocation(result: any) {
      if (this.SearchType == SEARCH_TYPE.JOB) {
        return result.locations[0] || this.GetFilter('location').country
      } else {
        return result.locationName
      }
    },
  },
})
</script>

<template>
  <div class="flex flex-col w-full h-full items-center pb-12 overflow-y-auto">
    <p class="my-16 text-2xl">Your results!</p>
    <div class="flex flex-col w-full md:w-2/3 px-2">
      <a
        v-for="result in searchResults"
        :key="result.id"
        class="flex flex-row h-64 mb-10 bg-light-primary dark:bg-dark-primary shadow-md rounded-lg thumbnail-outer"
        :href="
          SearchType == searchTypes.JOB
            ? `https://torre.co/jobs/${result.id}`
            : `https://bio.torre.co/en/${result.username}`
        "
      >
        <div
          v-show="SearchType == searchTypes.USER"
          class="w-5/12 h-64 md:h-full overflow-hidden rounded-l-lg max-w-sm"
        >
          <div
            :style="
              `background-image: url(${result.picture ||
                require('@/assets/images/nophoto.png')})`
            "
            class="thumbnail h-full transition-transform duration-300 ease-out bg-no-repeat bg-cover bg-center"
          />
        </div>
        <div class="flex flex-col py-7 justify-between flex-grow w-7/12">
          <div class="flex flex-col px-6">
            <div class="mb-3 flex flex-row justify-between">
              <p class="">{{ result[mappedKeys.title] }}</p>
              <div
                v-show="result[mappedKeys.remote]"
                class="flex flex-row items-center text-sm pl-6"
                title="Remote"
              >
                <svg
                  class="w-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  ></path>
                </svg>
                <p class="pt-0.5 pl-2 md:hidden">Remote</p>
              </div>
            </div>
            <p class="mb-3">{{ mappedJobType(result) }}</p>
            <p class="text-sm">{{ mappedLocation(result) }}</p>
          </div>
          <div class="pl-4 py-2 flex flex-row overflow-hidden w-full">
            <div
              v-for="skill in result.skills"
              :key="skill.name"
              class="bg-accent text-dark-primary rounded-full mx-2 py-1 px-3 truncate w-32 min-w-32 text-center"
            >
              {{ skill.name }}
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.thumbnail-outer:hover .thumbnail {
  transform: scale(1.1);
}

.min-w-32 {
  min-width: 8rem;
}
</style>
