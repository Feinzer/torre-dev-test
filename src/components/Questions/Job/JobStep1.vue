<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'JobStep1',
  data: () => ({
    question: 'What kind of job are you interested in?',
    answers: [
      {
        key: 'freelance-gigs',
        title: 'Freelance',
      },
      {
        key: 'full-time-employment',
        title: 'Full time',
      },
      {
        key: 'part-time-employment',
        title: 'Part time',
      },
    ],
  }),
  methods: {
    ...mapActions(['addFilter', 'updateFilter']),
    selectFilter(value: string) {
      if (this.Filters[0]) this.updateFilter({ key: 'type', value })
      else this.addFilter({ key: 'type', value })
    },
  },
  computed: {
    ...mapGetters(['Filters']),
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
      class="flex flex-col sm:flex-row justify-center items-center w-full px-8 md:px-0 flex-grow max-h-72"
    >
      <div
        v-for="answer in answers"
        :key="answer.key"
        class="flex flex-col cursor-pointer justify-center w-full sm:w-48 h-24 sm:h-32 lg:py-16 bg-light-primary dark:bg-dark-primary overflow-hidden items-center rounded-lg shadow my-4 sm:my-0 sm:mx-4 lg:mx-8 transform transition-transform duration-200"
        :class="
          Filters[0] && Filters[0].value == answer.key
            ? 'border-2 border-light-accent dark:border-dark-accent'
            : 'hover:scale-105'
        "
        @click="selectFilter(answer.key)"
      >
        <p class="text-lg">
          {{ answer.title }}
        </p>
      </div>
    </div>
  </div>
</template>
