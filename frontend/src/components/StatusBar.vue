<script setup lang="ts">
import {ApiController} from '../services/ApiController';
import {computed, inject, ref} from 'vue';
import {Team} from "../proto/ssl_gc_common";

const defaultYellowCardsDue: number[] = []
const online = ref(false)
const team = ref(Team.UNKNOWN)
const maxRobots = ref(0)
const numRobots = ref(0)
const diffRobots = ref("")
const yellowCardsDue = ref(defaultYellowCardsDue)
const api = inject<ApiController>('api')
let onlineTimer: NodeJS.Timeout
const onlineStateColor = computed(() => {
  if (!online.value) {
    return '#ff0000'
  } else if (team.value === Team.BLUE) {
    return '#4f84f1'
  } else if (team.value === Team.YELLOW) {
    return '#f7f422'
  }
  return '#42b983'
})

api?.RegisterStateConsumer((s) => {
  online.value = true
  team.value = s.team || Team.UNKNOWN
  maxRobots.value = s.maxRobots
  numRobots.value = s.robotsOnField
  const robotDiff = s.maxRobots - s.robotsOnField
  diffRobots.value = robotDiff <= 0 ? `${robotDiff}` : `+${robotDiff}`
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
  <div class="online-state" :style="{'background-color': onlineStateColor}"/>

  <div class="left-bar">
    <div class="left-bar-element">
      Robots: <strong>{{ numRobots }}</strong> / <strong>{{ maxRobots }}</strong> (<strong>{{ diffRobots }}</strong>)
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
</style>
