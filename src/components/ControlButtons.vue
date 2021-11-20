<script setup lang="ts">

defineProps({
  challengeFlag: Boolean,
  emergencyStop: Boolean,
  timeout: Boolean,
  substituteBot: Boolean,
})

defineEmits([
  'update:challengeFlag',
  'update:emergencyStop',
  'update:timeout',
  'update:substituteBot',
])

</script>

<template>
  <button type="button"
          @click="$emit('update:challengeFlag', !challengeFlag)"
          :class="{'button-pressed': challengeFlag}">
    Raise Challenge Flag
  </button>
  <button type="button"
          @click="$emit('update:emergencyStop', !emergencyStop)"
          :class="{'button-pressed': emergencyStop}">
    Emergency Stop
  </button>
  <button type="button"
          @click="$emit('update:timeout', !timeout)"
          :class="{'button-pressed': timeout}">
    Request Timeout
  </button>
  <button type="button"
          @click="$emit('update:substituteBot', !substituteBot)"
          :class="{'button-pressed': substituteBot}">
    Substitute Robot
  </button>
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
