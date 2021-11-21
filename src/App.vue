<script setup lang="ts">
import {ApiController} from './services/ApiController';
import {inject, ref} from 'vue';

const errorMessage = ref('');
const api = inject<ApiController>('api')
let errorClearanceTimer: NodeJS.Timeout

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
  <router-view/>
  <div class="error-message" :hidden="errorMessage===''">
    {{ errorMessage }}
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.error-message {
  position: absolute;
  bottom: 0;
  width: auto;
  left: 0;
  right: 0;
  border: double red;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
}
</style>
