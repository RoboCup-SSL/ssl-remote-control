<script setup lang="ts">
import {ApiController} from '../services/ApiController';
import {inject, ref} from 'vue';

const defaultYellowCardsDue: number[] = []
const online = ref(false)
const maxRobots = ref(0)
const yellowCardsDue = ref(defaultYellowCardsDue)
const api = inject<ApiController>('api')
let onlineTimer: NodeJS.Timeout

api?.RegisterStateConsumer((s) => {
  online.value = true
  maxRobots.value = s.maxRobots
  yellowCardsDue.value = s.yellowCardsDue.sort((a: number, b: number) => a - b)
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
    <div class="left-bar-element">
      Yellow card due:
      <span class="yellow-card-time" v-for="yellowCardDue of yellowCardsDue">{{ Math.round(yellowCardDue) }}s</span>
    </div>
    <div class="right-bar-element online-state" :class="{online: online, offline: !online}"/>
    <div class="right-bar-element">
      Max robots: <strong>{{ maxRobots }}</strong>
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

.right-bar-element {
  float: right;
  margin-left: 1em;
}

.left-bar-element {
  float: left;
  margin-right: 1em;
}

.yellow-card-time {
  margin-right: 0.5em;
  font-weight: bold;
}

.online-state {
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
