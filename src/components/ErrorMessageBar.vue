<script setup lang="ts">
import {ApiController} from '../services/ApiController';
import {inject, ref} from 'vue';

const initialMessage = 'Not connected yet'
const errorMessage = ref('')
const api = inject<ApiController>('api')
let errorClearanceTimer: NodeJS.Timeout

api?.RegisterStateConsumer((s) => {
  if (errorMessage.value === initialMessage) {
    errorMessage.value = '';
  }
})
errorMessage.value = initialMessage

api?.RegisterErrorConsumer((s) => {
  errorMessage.value = s
  if (errorClearanceTimer) {
    clearTimeout(errorClearanceTimer)
  }
  errorClearanceTimer = setTimeout(() => {
    errorMessage.value = ''
  }, 10000)
})
</script>

<template>
  <div class="error-message" :class="{present: errorMessage !== ''}">
    <span>{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
.error-message {
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  height: 1em;
  border: double transparent;
}
.error-message.present {
  border: double red;
}
</style>
