<script setup lang="ts">
import {ApiController} from '../services/ApiController';
import {inject, ref} from 'vue';

const defaultYellowCardsDue: number[] = []
const online = ref(false)
const maxRobots = ref(0)
const numRobots = ref(0)
const yellowCardsDue = ref(defaultYellowCardsDue)
const api = inject<ApiController>('api')
let onlineTimer: NodeJS.Timeout

api?.RegisterStateConsumer((s) => {
  online.value = true
  maxRobots.value = s.maxRobots
  numRobots.value = s.robotsOnField
  yellowCardsDue.value = s.yellowCardsDue.sort((a: number, b: number) => a - b)
  if (onlineTimer) {
    clearTimeout(onlineTimer)
  }
  onlineTimer = setTimeout(() => {
    online.value = false
  }, 1000)
})

online.value = false
</script>

<template>
  <div class="online-state" :class="{online: online, offline: !online}"/>

  <div class="left-bar">
    <div class="left-bar-element">
      Robots: <strong>{{ numRobots }}</strong> / <strong>{{ maxRobots }}</strong>
    </div>
    <div class="left-bar-element">
      Yellow cards due:
      <span class="yellow-card-time" v-for="yellowCardDue of yellowCardsDue">{{ Math.round(yellowCardDue) }}s</span>
    </div>
  </div>
</template>

<style scoped>
.left-bar {
  width: 80%;
}

.left-bar-element {
  float: left;
  text-align: left;
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
  position: absolute;
  right: 0.5em;
  top: 0.5em;
}

.online-state.online {
  background-color: #42b983;
}

.online-state.offline {
  background-color: red;
}
</style>
