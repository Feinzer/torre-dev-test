<script lang="ts">
import Vue from 'vue'

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
  mounted() {
    console.log(this.$store.getters)
  },
  computed: {
    jobFilters() {
      return this.$store.getters['Filters']
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
      class="flex flex-col sm:flex-row justify-center mt-6 md:mt-8 lg:mt-32 items-center w-full px-8 md:px-0"
    >
      <div
        v-for="answer in answers"
        :key="answer.key"
        class="flex flex-col cursor-pointer justify-center w-full sm:w-48 h-24 sm:h-32 lg:py-16 bg-light-primary dark:bg-dark-primary overflow-hidden items-center rounded-lg shadow my-4 sm:my-0 sm:mx-4 lg:mx-8 transform transition-transform duration-200"
        :class="
          jobFilters && jobFilters[0].value == answer.key
            ? 'border border-light-accent dark:border-dark-accent'
            : 'hover:scale-105'
        "
      >
        <p class="text-lg">
          {{ answer.title }}
        </p>
      </div>
    </div>
  </div>
</template>
