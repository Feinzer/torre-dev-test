<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

import CustomSelect from '@/components/Parts/CustomSelect.vue'

export default Vue.extend({
  name: 'JobStep3',
  components: {
    CustomSelect,
  },
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    key: 'salary',
    inputPeriod: {
      key: 'hourly',
      title: '$/hour',
    },
    inputSalary: 5,
    salaryRange: {
      min: 5,
      max: 100,
      step: 1,
    },
    periods: [
      {
        key: 'hourly',
        title: '$/hour',
      },
      {
        key: 'monthly',
        title: '$/month',
      },
      {
        key: 'yearly',
        title: '$/year',
      },
    ],
  }),
  mounted() {
    if (this.currentFilter) {
      if (this.currentFilter.period)
        this.inputPeriod = this.currentFilter.period
      if (this.currentFilter.period)
        this.inputSalary = this.currentFilter.salary
    }
  },
  methods: {
    ...mapActions(['addFilter', 'updateFilter']),
    selectFilter(data: any) {
      if (this.currentFilter)
        this.updateFilter({
          key: this.key,
          value: data,
        })
      else this.addFilter({ key: this.key, value: data })
    },
    setSalary() {
      const filter = this.currentFilter || {}
      filter.period = this.inputPeriod
      filter.salary = this.inputSalary
      this.selectFilter(filter)
    },
  },
  computed: {
    ...mapGetters(['Filters']),
    currentFilter(): any {
      const index = this.Filters.findIndex(
        (filter: any) => filter.key == this.key,
      )
      if (index >= 0) return this.Filters[index].value
      else return undefined
    },
  },
  watch: {
    inputPeriod(newPeriod: any) {
      const ranges: any = {
        hourly: {
          min: 5,
          max: 100,
          step: 1,
        },
        monthly: {
          min: 50,
          max: 10000,
          step: 50,
        },
        yearly: {
          min: 1000,
          max: 100000,
          step: 500,
        },
      }
      const range = ranges[newPeriod.key]
      this.salaryRange = range
      this.inputSalary =
        this.inputSalary > range.max
          ? range.max
          : this.inputSalary < range.min
          ? range.min
          : this.inputSalary
      this.setSalary()
    },
    inputSalary() {
      this.setSalary()
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
      class="flex flex-col sm:flex-row justify-center items-center w-full md:px-0 flex-grow max-h-96"
    >
      <input
        class="mb-16 sm:mb-0 sm:mr-6 w-full sm:flex-grow max-w-xs sm:w-auto bg-transparent"
        v-model="inputSalary"
        type="range"
        :min="salaryRange.min"
        :max="salaryRange.max"
        :step="salaryRange.step"
      />
      <div class="flex flex-row justify-center items-center">
        <p class="mr-6 w-16 text-right">{{ inputSalary }}</p>
        <CustomSelect
          placeholder="Period"
          label="title"
          v-model="inputPeriod"
          v-slot="cselect"
          class="w-36"
        >
          <div
            v-for="period in periods"
            :key="period.key"
            class="py-3 px-4 hover:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-10 select-none last:rounded-b-lg"
            @click="cselect.select(period)"
          >
            {{ period.title }}
          </div>
        </CustomSelect>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='range'] {
  @apply h-10;
  -webkit-appearance: none;
}
input[type='range']:focus {
  @apply outline-none;
}
input[type='range']::-webkit-slider-runnable-track {
  @apply w-full;
  @apply cursor-pointer;
  @apply bg-accent;
}
input[type='range']::-webkit-slider-thumb {
  @apply h-5;
  @apply w-5;
  @apply rounded-full;
  @apply bg-light-primary;
  @apply cursor-pointer;
  -webkit-appearance: none;
}
input[type='range']:focus::-webkit-slider-runnable-track {
  @apply bg-accent;
}
input[type='range']::-moz-range-track {
  @apply w-full;
  @apply h-2;
  @apply cursor-pointer;
  @apply bg-accent;
  @apply rounded-full;
}
input[type='range']::-moz-range-thumb {
  @apply h-5;
  @apply w-5;
  @apply rounded-full;
  @apply bg-light-primary;
  @apply cursor-pointer;
}
input[type='range']::-ms-track {
  @apply w-full;
  @apply h-2;
  @apply cursor-pointer;
}
input[type='range']::-ms-fill-lower {
  @apply bg-accent;
  @apply rounded-full;
}
input[type='range']::-ms-fill-upper {
  @apply bg-accent;
  @apply rounded-full;
}
input[type='range']::-ms-thumb {
  @apply h-5;
  @apply w-5;
  @apply rounded-full;
  @apply bg-light-primary;
  @apply cursor-pointer;
}
input[type='range']:focus::-ms-fill-lower {
  @apply bg-accent;
}
input[type='range']:focus::-ms-fill-upper {
  @apply bg-accent;
}
</style>
