<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

import skills from '@/assets/data/skills.json'
export default Vue.extend({
  name: 'JobStep2',
  data: () => ({
    question: 'What skills do you consider your strengths?',
    skills,
  }),
  methods: {
    ...mapActions(['addFilter', 'updateFilter']),
    selectFilter(value: string) {
      if (this.Filters[0]) this.updateFilter({ key: 'skill', value })
      else this.addFilter({ key: 'skill', value })
    },
  },
  computed: {
    ...mapGetters(['Filters']),
  },
})
</script>

<template>
  <div
    class="absolute flex flex-col justify-center items-center right-0 left-0 bottom-0 top-0 px-8"
  >
    <p class="text-xl text-center">
      {{ question }}
    </p>
    <div
      class="w-full md:w-1/2 flex flex-row justify-between items-center mt-8 px-4 py-3 bg-light-primary dark:bg-dark-primary rounded-full shadow-md"
    >
      <input type="text" class="min-w-0 bg-transparent flex-grow" />
      <svg
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div
      class="flex flex-col sm:flex-row justify-center items-center w-full px-8 md:px-0 flex-grow max-h-52"
    >
      a
    </div>
  </div>
</template>
