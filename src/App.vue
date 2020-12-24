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
    <div
      v-if="$route.path != '/results'"
      class="w-full flex items-center justify-center"
    >
      <router-link to="/about" class="text-dark-primary dark:text-accent pb-4">
        About
      </router-link>
    </div>
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
