<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

import { JOB_TYPES } from '@/types/types'

export default Vue.extend({
  name: 'JobStep1',
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    key: 'type',
    answers: JOB_TYPES,
  }),
  methods: {
    ...mapActions(['addFilter', 'updateFilter']),
    selectFilter(value: string) {
      if (this.selectedType) this.updateFilter({ key: this.key, value })
      else this.addFilter({ key: this.key, value })
    },
  },
  computed: {
    ...mapGetters(['Filters']),
    selectedType(): any {
      const index = this.Filters.findIndex(
        (filter: any) => filter.key == this.key,
      )
      if (index >= 0) return this.Filters[index]
      else return undefined
    },
  },
})
</script>

<template>
  <div
    class="absolute flex flex-col justify-center items-center right-0 left-0 bottom-0 top-0"
  >
    <p class="text-xl text-center px-4">
      {{ question }}
    </p>
    <div
      class="flex flex-col sm:flex-row sm:flex-wrap sm:content-center justify-center items-center w-full px-8 md:px-0 flex-grow max-h-96"
    >
      <div
        v-for="answer in answers"
        :key="answer.key"
        class="flex flex-col text-lg text-center cursor-pointer justify-center w-full sm:w-36 lg:w-48 h-24 sm:h-32 lg:py-16 overflow-hidden items-center rounded-lg shadow my-4 sm:mx-3 lg:mx-6 transform transition-all duration-200"
        :class="
          selectedType && selectedType.value == answer.key
            ? 'bg-accent text-dark-background'
            : 'bg-light-primary dark:bg-dark-primary hover:scale-105'
        "
        @click="selectFilter(answer.key)"
      >
        {{ answer.title }}
      </div>
    </div>
  </div>
</template>
