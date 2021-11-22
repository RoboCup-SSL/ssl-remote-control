<script setup lang="ts">

defineProps({
  currentNumber: Number,
  count: Number
})

defineEmits([
  'update:number'
])

</script>

<template>
  <button v-for="(_, number) in Array(count)"
          class="button blue"
          :disabled="number===currentNumber"
          @click="$emit('update:number', number)"
  >
    {{number}}
  </button>
</template>

<style scoped>

</style>
