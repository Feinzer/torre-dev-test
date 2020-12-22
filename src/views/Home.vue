<template>
  <div
    class="home h-full flex flex-col justify-center items-center pt-8 px-8 tracking-wide"
  >
    <p class="text-xl text-center pt-2 pb-8 sm:pb-4 md:pb-16">
      What are you looking for?
    </p>
    <div class="flex flex-col sm:flex-row justify-center items-center w-full">
      <router-link
        v-for="link in links"
        :key="link.key"
        class="flex flex-col justify-center py-8 md:py-16 bg-light-primary dark:bg-dark-primary overflow-hidden max-w-xs items-center w-full rounded-lg shadow my-4 sm:mx-8 transform hover:scale-105 transition-transform duration-200"
        :to="link.url"
      >
        <component :is="link.icon" class="w-1/4 mb-6 md:mb-12" />
        <p class="text-lg">
          {{ link.title }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import EmployeeIcon from '@/components/Icons/Employee.vue'
import JobIcon from '@/components/Icons/Job.vue'

export default Vue.extend({
  name: 'Home',
  data: () => ({
    links: [
      {
        key: 'link#0',
        title: 'A Job!',
        url: '/job',
        icon: JobIcon,
      },
      {
        key: 'link#1',
        title: 'An Employee!',
        url: '/user',
        icon: EmployeeIcon,
      },
    ],
  }),
})
</script>
