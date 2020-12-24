<script lang="ts">
import Vue from 'vue'

import Stepper from '@/components/Stepper/Stepper.vue'

import Step1 from '@/components/Stepper/Steps/Step1.vue'
import Step2 from '@/components/Stepper/Steps/Step2.vue'
import Step3 from '@/components/Stepper/Steps/Step3.vue'
import Step4 from '@/components/Stepper/Steps/Step4.vue'

export default Vue.extend({
  name: 'JobSearch',
  components: {
    Stepper,
  },
  data: () => ({
    currentStep: 0,
    steps: [
      {
        question: 'What kind of job are you interested in?',
        component: Step1,
      },
      {
        question: 'What skills do you consider your strengths?',
        component: Step2,
      },
      {
        question: 'What is your salary expectation?',
        component: Step3,
      },
      {
        question: 'From where are you available to work?',
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
