<script setup lang="ts">
import ErrorMessageBar from './components/ErrorMessageBar.vue';
import StatusBar from './components/StatusBar.vue';
</script>

<template>
  <StatusBar/>
  <router-view/>
  <ErrorMessageBar/>
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
</style>
