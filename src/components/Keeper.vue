<script setup lang="ts">

defineProps({
  keeperId: Number
})

</script>

<template>
  <label for="change-keeper-id">Keeper Id: {{ keeperId }}</label>
  <button id="change-keeper-id" type="button">Change Keeper Id</button>
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
</style>
