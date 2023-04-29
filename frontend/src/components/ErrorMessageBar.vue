<script setup lang="ts">
import {ApiController} from '../services/ApiController';
import {inject, ref} from 'vue';

const initialMessage = 'Not connected yet'
const errorMessage = ref('')
const api = inject<ApiController>('api')
let errorClearanceTimer: NodeJS.Timeout

api?.RegisterStateConsumer(() => {
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
  <div class="error-message">
    {{ errorMessage }}
  </div>
</template>

<style scoped>
.error-message {
  text-align: center;
}
</style>
