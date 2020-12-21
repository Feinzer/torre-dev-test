<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
})
</script>

<template>
  <div
    id="app"
    class="flex flex-col min-h-screen bg-light-background dark:bg-dark-background dark:text-white"
  >
    <router-view class="flex-grow" />
    <router-link
      to="/about"
      class="text-light-accent dark:text-dark-accent text-center pb-8"
    >
      About
    </router-link>
  </div>
</template>
