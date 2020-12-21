<script lang="ts">
import Vue from 'vue'

import Stepper from '@/components/Questions/Stepper.vue'

import JobStep1 from '@/components/Questions/Job/JobStep1.vue'
import JobStep2 from '@/components/Questions/Job/JobStep2.vue'
import JobStep3 from '@/components/Questions/Job/JobStep3.vue'

export default Vue.extend({
  name: 'JobSearch',
  components: {
    Stepper,
  },
  data: () => ({
    currentStep: 0,
    steps: [
      {
        title: 'Type',
        component: JobStep1,
      },
      {
        title: 'Type',
        component: JobStep2,
      },
      {
        title: 'Type',
        component: JobStep3,
      },
    ],
  }),
})
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <Stepper v-model="currentStep" :steps="steps.map(step => step.title)">
      <component
        v-for="(step, index) in steps"
        :key="index"
        :is="step.component"
        v-show="currentStep === index"
      />
    </Stepper>
  </div>
</template>
