<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import csc from 'country-state-city'

import CustomSelect from '@/components/Parts/CustomSelect.vue'

export default Vue.extend({
  name: 'JobStep4',
  components: {
    CustomSelect,
  },
  data: () => ({
    key: 'location',
    question: 'From where are you available to work?',
    filter: {
      country: { id: '', name: '' },
      state: { id: '', name: '' },
      city: { id: '', name: '' },
      remote: false,
    },
  }),
  mounted() {
    if (this.locationFilter) {
      if (this.locationFilter.country)
        this.filter.country = this.countriesList.find(
          (country: any) => country.name == this.locationFilter.country,
        )
      if (this.locationFilter.state)
        this.filter.state = this.statesList.find(
          (state: any) => state.name == this.locationFilter.state,
        )
      if (this.locationFilter.city)
        this.filter.city = this.citiesList.find(
          (city: any) => city.name == this.locationFilter.city,
        )
      this.filter.remote = this.locationFilter.remote
    }
  },
  methods: {
    ...mapActions(['addFilter', 'updateFilter']),
    selectFilter(data: any) {
      if (this.locationFilter)
        this.updateFilter({
          key: this.key,
          value: data,
        })
      else this.addFilter({ key: this.key, value: data })
    },
    setLocation() {
      const filter = {
        country: '',
        state: '',
        city: '',
        remote: false,
      }
      if (this.filter.country.name) filter.country = this.filter.country.name
      if (this.filter.state.name) filter.state = this.filter.state.name
      if (this.filter.city.name) filter.city = this.filter.city.name
      filter.remote = this.filter.remote

      this.selectFilter(filter)
    },
  },
  computed: {
    ...mapGetters(['Filters']),
    locationFilter(): any {
      const index = this.Filters.findIndex(
        (filter: any) => filter.key == this.key,
      )
      if (index >= 0) return this.Filters[index].value
      else return undefined
    },
    countriesList: (): any => csc.getAllCountries(),
    statesList(): any {
      return csc.getStatesOfCountry(this.filter.country.id)
    },
    citiesList(): any {
      return csc.getCitiesOfState(this.filter.state.id)
    },
  },
  watch: {
    'filter.country'() {
      this.setLocation()
    },
    'filter.state'() {
      this.setLocation()
    },
    'filter.city'() {
      this.setLocation()
    },
    'filter.remote'() {
      this.setLocation()
    },
  },
})
</script>

<template>
  <div
    class="absolute flex flex-col justify-center items-center right-0 left-0 bottom-0 top-0 mx-8"
  >
    <p class="text-xl text-center">
      {{ question }}
    </p>
    <div
      class="flex flex-col pt-16 justify-start items-start sm:items-center w-full md:px-0 flex-grow max-h-96"
    >
      <label class="input-terms w-full flex justify-center items-center mb-10">
        <p class="mr-2">Remotely:</p>
        <div
          class="flex justify-center shadow w-6 h-6 p-1 items-center rounded-full transition-all duration-100 transform"
          :class="
            filter.remote
              ? 'bg-accent scale-105'
              : 'bg-light-primary dark:bg-dark-primary'
          "
        >
          <input
            type="checkbox"
            name="terms"
            class="hidden"
            v-model="filter.remote"
          />
          <svg
            class="w-6 h-6 opacity-0 text-dark-primary transition-opacity duration-100 pointer-events-none"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </label>
      <CustomSelect
        placeholder="Country"
        label="name"
        v-model="filter.country"
        v-slot="cselect"
        class="w-full sm:w-1/2 z-40 mb-4"
      >
        <div
          v-for="country in countriesList"
          :key="country.id"
          class="py-3 px-4 hover:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-10 select-none last:rounded-b-lg"
          @click="cselect.select(country)"
        >
          {{ country.name }}
        </div>
      </CustomSelect>
      <CustomSelect
        v-if="filter.country.id"
        placeholder="State"
        label="name"
        v-model="filter.state"
        v-slot="cselect"
        class="w-full sm:w-1/2 z-30 mb-4"
      >
        <div
          v-for="state in statesList"
          :key="state.id"
          class="py-3 px-4 hover:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-10 select-none last:rounded-b-lg"
          @click="cselect.select(state)"
        >
          {{ state.name }}
        </div>
      </CustomSelect>
      <CustomSelect
        v-if="filter.state.id"
        placeholder="City"
        label="name"
        v-model="filter.city"
        v-slot="cselect"
        class="w-full sm:w-1/2 z-20"
      >
        <div
          v-for="city in citiesList"
          :key="city.id"
          class="py-3 px-4 hover:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-10 select-none last:rounded-b-lg"
          @click="cselect.select(city)"
        >
          {{ city.name }}
        </div>
      </CustomSelect>
    </div>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition-property: all;
  transition-duration: 200ms;
}
.dropdown-enter,
.dropdown-leave-active {
  opacity: 0;
  transform: translateY(-2rem);
}

.input-terms input:checked + svg {
  opacity: 1;
}
</style>
