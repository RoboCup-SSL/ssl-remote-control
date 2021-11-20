<script setup lang="ts">
import {ref} from 'vue'

defineProps({
  challengeFlagSet: Boolean,
  emergencyStopPending: Boolean,
  timeoutRequestPending: Boolean,
  robotSubstitutionRequestPending: Boolean,
})

const count = ref(0)
</script>

<template>
  <button type="button" @click="count++">Raise Challenge Flag</button>
  <button type="button" @click="count++">Emergency Stop</button>
  <button type="button" @click="count++">Request Timeout</button>
  <button type="button" @click="count++" :class="{'button-pressed': robotSubstitutionRequestPending}">Substitute Robot</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

.button-pressed {
  background-color: red;
}
</style>
