<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
})
</script>

<template>
  <div
    id="app"
    class="flex flex-col h-screen bg-light-background dark:bg-dark-background text-dark-primary dark:text-white font-mono"
  >
    <transition name="load" type="out-in">
      <router-view class="h-full w-full pb-10" />
    </transition>
    <div class="absolute w-full bottom-0 flex items-center justify-center">
      <router-link
        to="/about"
        class="text-dark-primary dark:text-dark-accent pb-8"
      >
        About
      </router-link>
    </div>
  </div>
</template>

<style>
.load-enter-active,
.load-leave-active {
  position: absolute;
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
