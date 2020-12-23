<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

import skills from '@/assets/data/skills.json'

export default Vue.extend({
  name: 'JobStep2',
  data: () => ({
    question: 'What skills do you consider your strengths?',
    searchText: '',
    focusedText: false,
    skills,
  }),
  methods: {
    ...mapActions(['addFilter', 'updateFilter']),
    selectFilter(data: any) {
      if (this.Filters[1])
        this.updateFilter({
          key: 'skills',
          value: [...data],
        })
      else this.addFilter({ key: 'skills', value: [...data] })
    },
    addSkill(data: any) {
      if (!this.selectedSkills.find((skill: any) => skill.key == data.key)) {
        const filter = this.selectedSkills || []
        filter.push(data)
        this.selectFilter(filter)
        this.searchText = ''
      }
    },
    removeSkill(data: any) {
      const filter = this.selectedSkills.filter(
        (skill: any) => skill.key != data.key,
      )
      this.selectFilter(filter)
    },
    toggleFocus(value: boolean) {
      setTimeout(() => {
        this.focusedText = value
      }, 150)
    },
  },
  computed: {
    ...mapGetters(['Filters']),
    searchResults(): any {
      if (this.searchText)
        return this.skills.filter(
          (skill: any) =>
            skill.key.toLowerCase().includes(this.searchText.toLowerCase()) ||
            skill.title.toLowerCase().includes(this.searchText.toLowerCase()),
        )
      else return []
    },
    selectedSkills(): any {
      if (this.Filters[1] && this.Filters[1].value) return this.Filters[1].value
      else return []
    },
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
      class="w-full md:w-1/2 flex flex-col justify-between mt-4 lg:mt-12 relative"
      :class="
        searchText && searchResults.length > 0 && focusedText && 'shadow-md'
      "
    >
      <div
        class="w-full flex flex-row justify-between px-4 py-3 z-20 bg-light-primary dark:bg-dark-primary"
        :class="
          searchText && searchResults.length > 0 && focusedText
            ? 'rounded-t-lg'
            : ' rounded-lg shadow-md'
        "
      >
        <input
          v-model="searchText"
          type="text"
          class="min-w-0 bg-transparent flex-grow"
          @focus="toggleFocus(true)"
          @blur="toggleFocus(false)"
        />
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
        v-show="searchText && focusedText"
        class="absolute w-full mt-12 bg-light-primary dark:bg-dark-primary flex flex-col rounded-b-lg shadow-md z-10 max-h-20 lg:max-h-48 overflow-y-auto"
      >
        <div
          v-for="skill in searchResults"
          :key="skill.key"
          class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-10 select-none last:rounded-b-lg cursor-pointer"
          @click="addSkill(skill)"
        >
          {{ skill.title }}
        </div>
      </div>
    </div>
    <transition-group
      name="skills"
      class="flex flex-col mt-6 lg:mt-0 sm:flex-row sm:flex-wrap justify-start sm:justify-center items-center content-start lg:content-center w-full flex-grow max-h-72 relative overflow-y-auto"
    >
      <div
        v-for="skill in selectedSkills"
        :key="skill.key"
        class="flex skill-item justify-between items-center w-full sm:w-40 whitespace-nowrap bg-accent px-4 py-1 shadow mt-3 sm:mx-2 text-dark-background rounded-full group cursor-pointer transition-all duration-300"
        @click="removeSkill(skill)"
      >
        <p class="w-9/12 pt-1 truncate ... overflow-ellipsis">
          {{ skill.title }}
        </p>
        <svg
          class="w-4 h-4 -mr-1 transform group-hover:scale-125 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.skills-enter-active {
  opacity: 0;
}

.skills-leave-to {
  opacity: 0;
}
</style>
