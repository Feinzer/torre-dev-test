<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

import skills from '@/assets/data/skills.json'

export default Vue.extend({
  name: 'JobStep2',
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    key: 'skills',
    searchText: '',
    focusedText: false,
    skills,
  }),
  methods: {
    ...mapActions(['addFilter', 'updateFilter']),
    selectFilter(data: any) {
      if (this.selectedSkills)
        this.updateFilter({
          key: this.key,
          value: [...data],
        })
      else this.addFilter({ key: this.key, value: [...data] })
    },
    addSkill(data: any) {
      if (
        !this.selectedSkills ||
        !this.selectedSkills.find((skill: any) => skill.key == data.key)
      ) {
        const filter = this.selectedSkills || []
        filter.push(data)
        this.selectFilter(filter)
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
        setTimeout(() => {
          this.searchText = ''
        }, 200)
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
      else return this.skills
    },
    selectedSkills(): any {
      const index = this.Filters.findIndex(
        (filter: any) => filter.key == this.key,
      )
      if (index >= 0) return this.Filters[index].value
      else return undefined
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
      class="w-full md:w-1/2 flex flex-col justify-between mt-4 lg:mt-12 shadow-md"
    >
      <div
        class="w-full flex flex-row justify-between px-4 py-3 z-30 bg-light-primary dark:bg-dark-primary rounded-lg"
      >
        <input
          v-model="searchText"
          type="text"
          class="min-w-0 bg-transparent flex-grow outline-none"
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
      <transition name="dropdown">
        <div
          v-show="focusedText"
          class="absolute w-full mx-auto md:w-1/2 mt-10 pt-2 bg-light-primary dark:bg-dark-primary flex flex-col rounded-b-lg shadow-md max-h-half overflow-y-auto z-20"
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
      </transition>
    </div>
    <transition-group
      name="skills"
      class="flex flex-col mt-6 lg:mt-0 sm:flex-row sm:flex-wrap justify-start sm:justify-center items-center content-start lg:content-center w-full flex-grow max-h-72 relative overflow-y-auto"
    >
      <div
        v-for="skill in selectedSkills"
        :key="skill.key"
        class="flex skill-item justify-between items-center w-full sm:w-40 whitespace-nowrap bg-accent px-4 py-2 shadow mt-3 sm:mx-2 text-dark-background rounded-full group cursor-pointer transition-all duration-300 z-10"
        @click="removeSkill(skill)"
      >
        <p class="w-9/12 truncate ... overflow-ellipsis">
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
.skills-enter-active,
.skills-leave-active {
  opacity: 0;
  transform: scale(85%);
  position: absolute;
  z-index: 0;
}

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

.max-h-half {
  max-height: 50%;
}
</style>
