<script lang="ts">
import Vue from 'vue'

import Stepper from '@/components/Stepper/Stepper.vue'

import Step1 from '@/components/Stepper/Steps/Step1.vue'
import Step2 from '@/components/Stepper/Steps/Step2.vue'
import Step3 from '@/components/Stepper/Steps/Step3.vue'
import Step4 from '@/components/Stepper/Steps/Step4.vue'

export default Vue.extend({
  name: 'UserSearch',
  components: {
    Stepper,
  },
  data: () => ({
    currentStep: 0,
    steps: [
      {
        question: 'Who are you looking to employ?',
        component: Step1,
      },
      {
        question: 'What skills are you looking for in a person?',
        component: Step2,
      },
      {
        question: 'What is your estimated payment?',
        component: Step3,
      },
      {
        question: 'Where are you looking to employ?',
        component: Step4,
      },
    ],
  }),
  methods: {
    onFinish() {
      this.$router.push('/results')
    },
  },
})
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <Stepper v-model="currentStep" :length="steps.length" @finish="onFinish">
      <component
        v-for="(step, index) in steps"
        :key="index"
        :is="step.component"
        :question="step.question"
        v-show="currentStep === index"
      />
    </Stepper>
  </div>
</template>
