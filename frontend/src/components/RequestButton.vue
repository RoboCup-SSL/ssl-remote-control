<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
  canRequest: Boolean,
  requested: Boolean,
  text: String,
  textRequested: String,
  textAdditional: String,
})

defineEmits([
  'request',
])

const red = computed(() => !props.canRequest)
const green = computed(() => props.canRequest && !props.requested)
const blue = computed(() => props.canRequest && props.requested)

</script>

<template>
  <button
    class="button"
    :disabled="!canRequest"
    :class="{blue, green, red}"
    @click="$emit('request', !requested)"
  >
    <template v-if="requested">
      {{ textRequested }}
    </template>
    <template v-else>
      {{ text }}
    </template>
    <br v-if="textAdditional">
    {{textAdditional}}
  </button>
</template>

<style scoped>
.button {
  margin: 0.5rem;
}
</style>
