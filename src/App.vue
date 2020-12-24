<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
})
</script>

<template>
  <div
    id="app"
    class="flex flex-col justify-end min-h-screen text-dark-primary dark:text-white font-mono overflow-hidden"
  >
    <transition name="load">
      <router-view class="absolute h-full w-full pb-10 overflow-hidden" />
    </transition>
  </div>
</template>

<style>
:root {
  @apply bg-light-background;
  @apply dark:bg-dark-background;
}

.load-enter-active,
.load-leave-active {
  transition-property: all;
  transition-duration: 100ms;
}
.load-enter {
  opacity: 0;
}
.load-enter-active {
  transition-delay: 100ms;
}
.load-leave-active {
  opacity: 0;
}
</style>
