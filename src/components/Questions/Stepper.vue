<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Steps',
  props: {
    value: {
      type: Number,
      required: true,
    },
    steps: {
      type: Array,
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
  },
})
</script>

<template>
  <div
    class="flex flex-col h-2/3 justify-between w-full md:w-2/3"
    :style="
      `--direction: ${value < oldIndex ? '-50%' : '50%'};
      --direction-alt: ${value < oldIndex ? '50%' : '-50%'};`
    "
  >
    <transition-group name="step" class="flex justify-center overflow-y-auto">
      <slot />
    </transition-group>
    <div
      class="flex flex-row w-full justify-center md:justify-around items-center py-5 max-h-20"
    >
      <div
        class="bg-light-primary w-24 dark:bg-dark-primary mr-2 select-none flex justify-center items-center h-10 text-xs font-bold uppercase rounded-lg shadow-lg transition-all duration-150"
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
        class="bg-light-primary w-24 dark:bg-dark-primary mr-2 select-none flex justify-center items-center h-10 text-xs font-bold uppercase rounded-lg shadow-lg transition-all duration-150"
        :class="
          value == steps.length - 1 
            ? 'shadow-none cursor-default bg-light-background text-dark-background dark:text-white text-opacity-10'
            : 'cursor-pointer'
        "
        @click="value != steps.length - 1 && update(value + 1)"
        :disabled="value == steps.length - 1"
      >
        Next
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
