<script setup lang="ts">

import RequestButton from '../components/RequestButton.vue';
import router from '../router';
import {
  RemoteControlRequestType,
  RemoteControlTeamState,
  RemoteControlToController_Request,
} from '../proto/ssl_gc_rcon_remotecontrol';
import {ApiController} from '../services/ApiController';
import {computed, inject, ref} from 'vue';

const state = ref(RemoteControlTeamState.fromJSON({}));
const api = inject<ApiController>('api')

api?.RegisterStateConsumer((s) => state.value = s)

const canRequestChallengeFlag = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.CHALLENGE_FLAG))
const canRequestEmergencyStop = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.EMERGENCY_STOP))
const canRequestTimeout = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.TIMEOUT))
const canStopTimeout = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.STOP_TIMEOUT))
const canChangeKeeperId = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.CHANGE_KEEPER_ID))
const canRequestRobotSubstitution = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.ROBOT_SUBSTITUTION))
const emergencyStopRequested = computed(() => state.value.activeRequests.includes(RemoteControlRequestType.EMERGENCY_STOP))
const timeoutRequested = computed(() => state.value.activeRequests.includes(RemoteControlRequestType.TIMEOUT))
const robotSubstitutionRequested = computed(() => state.value.activeRequests.includes(RemoteControlRequestType.ROBOT_SUBSTITUTION))
const robotDiff = computed(() => {
  const diff = state.value.maxRobots - state.value.robotsOnField
  if (diff > 0) {
    return `Add up to ${diff} robots`
  }
  if (diff < 0) {
    return `Remove ${diff} robots`
  }
  return ''
})

const requestChallengeFlag = () => router.push('/confirm-challenge-flag')
const requestEmergencyStop = (request: boolean) => api?.Send({
  msg: {
    $case: 'requestEmergencyStop',
    requestEmergencyStop: request
  }
})
const requestTimeout = (request: boolean) => api?.Send({
  msg: {
    $case: 'requestTimeout',
    requestTimeout: request
  }
})
const stopTimeout = () => api?.Send({
  msg: {
    $case: 'request',
    request: RemoteControlToController_Request.STOP_TIMEOUT
  }
})
const requestRobotSubstitution = (request: boolean) => api?.Send({
  msg: {
    $case: 'requestRobotSubstitution',
    requestRobotSubstitution: request
  }
})

</script>

<template>
  <div class="control-buttons-container buttons-orientation">
    <RequestButton
      :can-request="canRequestChallengeFlag"
      :requested="false"
      text="Raise Challenge Flag"
      :text-additional="`${state.challengeFlagsLeft} left`"
      @request="requestChallengeFlag"
    />
    <RequestButton
      :can-request="canRequestEmergencyStop"
      :requested="emergencyStopRequested"
      text="Emergency Stop"
      :text-requested="`Cancel Emergency Stop (${Math.round(state.emergencyStopIn)} s left)`"
      @request="requestEmergencyStop"
    />
    <RequestButton
      v-if="canStopTimeout"
      :can-request="true"
      :requested="false"
      text="Stop Timeout"
      :text-additional="`${Math.round(state.timeoutTimeLeft)} s left`"
      @request="stopTimeout"
    />
    <RequestButton
      v-else
      :can-request="canRequestTimeout"
      :requested="timeoutRequested"
      text="Request Timeout"
      text-requested="Cancel Timeout Request"
      :text-additional="`${state.timeoutsLeft} left`"
      @request="requestTimeout"
    />
    <RequestButton
      :can-request="canChangeKeeperId"
      :requested="false"
      text="Change Keeper Id"
      :text-additional="`Current: ${state.keeperId}`"
      @request="() => router.push('/change-keeper')"
    />
    <RequestButton
      class="two-columns"
      :can-request="canRequestRobotSubstitution"
      :requested="robotSubstitutionRequested"
      text="Robot Substitution"
      text-requested="Cancel Robot Substitution"
      :text-additional="robotDiff"
      @request="requestRobotSubstitution"
    />
  </div>
</template>

<style scoped>
.control-buttons-container {
  display: grid;
  padding: 1em;
  height: 100%;
  box-sizing: border-box;
}

@media (min-aspect-ratio: 1/1) {
  .buttons-orientation {
    gap: 1em 1em;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  .two-columns {
    grid-column: 1 / 3;
  }
}

@media (max-aspect-ratio: 1/1) {
  .buttons-orientation {
    gap: 1em;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  }
  .two-columns {
  }
}

</style>
