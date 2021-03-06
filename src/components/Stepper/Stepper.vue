<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'Steps',
  props: {
    value: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      oldIndex: 0,
    }
  },
  methods: {
    update(index: number) {
      this.oldIndex = this.value
      this.$emit('input', index)
    },
    finish() {
      this.$emit('finish')
    },
  },
  computed: {
    ...mapGetters(['Filters']),
    Completed(): boolean {
      return this.Filters.length == 4
    },
  },
})
</script>

<template>
  <div
    class="flex flex-col h-full sm:pb-4 justify-center w-full md:w-5/6 pt-1"
    :style="
      `--direction: ${value < oldIndex ? '-5rem' : '5rem'};
      --direction-alt: ${value < oldIndex ? '5rem' : '-5rem'};`
    "
  >
    <transition-group
      name="step"
      class="flex justify-center overflow-y-auto overflow-x-hidden h-full relative"
    >
      <slot />
    </transition-group>
    <div
      class="flex flex-row w-full justify-center md:justify-around items-center py-5 max-h-20 lg:mb-20"
    >
      <div
        class="bg-light-primary w-24 dark:bg-dark-primary mr-2 select-none flex justify-center items-center h-10 text-xs font-bold uppercase rounded-lg shadow-md transition-all duration-150"
        :class="
          value == 0
            ? 'shadow-none cursor-default bg-light-background text-dark-background dark:text-white text-opacity-10'
            : 'cursor-pointer'
        "
        @click="value != 0 && update(value - 1)"
        :disabled="value == 0"
      >
        Previous
      </div>
      <div
        class="w-24 mr-2 select-none flex justify-center items-center h-10 text-xs font-bold uppercase rounded-lg shadow-md transition-all duration-150"
        :class="
          value != length - 1
            ? 'bg-light-primary dark:bg-dark-primary cursor-pointer'
            : Completed
            ? 'bg-accent text-dark-primary cursor-pointer'
            : 'shadow-none cursor-default bg-light-primary dark:bg-dark-primary text-dark-background dark:text-white text-opacity-10'
        "
        @click="value != length - 1 ? update(value + 1) : Completed && finish()"
      >
        {{ value == length - 1 ? 'Finish' : 'Next' }}
      </div>
    </div>
  </div>
</template>

<style>
.step-enter-active,
.step-leave-active {
  position: absolute;
  transition-property: all;
  transition-duration: 250ms;
}
.step-enter {
  opacity: 0;
  transform: translateX(var(--direction));
}
.step-leave-active {
  opacity: 0;
  transform: translateX(var(--direction-alt));
}
</style>
