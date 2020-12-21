<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
})
</script>

<template>
  <div
    id="app"
    class="flex flex-col h-screen bg-light-background dark:bg-dark-background text-dark-primary dark:text-white"
  >
    <transition name="load" type="out-in">
      <router-view class="h-full w-full pb-10" />
    </transition>
    <router-link
      to="/about"
      class="text-dark-primary dark:text-dark-accent text-center pb-8 absolute bottom-0 w-full"
    >
      About
    </router-link>
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
