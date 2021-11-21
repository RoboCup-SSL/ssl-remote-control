<script setup lang="ts">
import {ApiController} from '../services/ApiController';
import {inject, ref} from 'vue';

const online = ref(false);
const api = inject<ApiController>('api')
let onlineTimer: NodeJS.Timeout

api?.RegisterStateConsumer((s) => {
  online.value = true
  if (onlineTimer) {
    clearTimeout(onlineTimer)
  }
  onlineTimer = setTimeout(() => {
    online.value = false
  }, 1000)
})
</script>

<template>
  <div class="bar">
    <div class="online-state" :class="{online: online, offline: !online}">

    </div>
  </div>
</template>

<style scoped>
.bar {
  position: absolute;
  top: 0;
  width: auto;
  left: 0;
  right: 0;
  margin: 0.5em;
  padding: 0.5em;
  text-align: right;
}
.online-state {
  position: relative;
  float: right;
  width: 1em;
  height: 1em;
  border-radius: 1em;
}
.online-state.online {
  background-color: #42b983;
}
.online-state.offline {
  background-color: red;
}
</style>
