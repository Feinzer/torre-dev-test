<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
})
</script>

<template>
  <div
    id="app"
    class="flex flex-col justify-end h-screen bg-light-background dark:bg-dark-background text-dark-primary dark:text-white font-mono"
  >
    <transition name="load" type="out-in">
      <router-view class="absolute h-full w-full pb-10" />
    </transition>
    <div class="w-full flex items-center justify-center">
      <router-link to="/about" class="text-dark-primary dark:text-accent pb-4">
        About
      </router-link>
    </div>
  </div>
</template>

<style>
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
