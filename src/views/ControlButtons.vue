<script setup lang="ts">

import RequestButton from '../components/RequestButton.vue';
import router from '../router';
import {
  RemoteControlTeamState,
  RemoteControlRequestType,
  RemoteControlToController_Request
} from '../proto/ssl_gc_rcon_remotecontrol';
import {ApiController} from '../services/ApiController';
import {computed, inject, ref} from 'vue';

const state = ref(RemoteControlTeamState.fromJSON({}));
const api = inject<ApiController>('api')

api?.RegisterStateConsumer((s) => state.value = s)

const canRequestChallengeFlag = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.CHALLENGE_FLAG))
const canRequestEmergencyStop = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.EMERGENCY_STOP))
const canRequestTimeout = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.TIMEOUT))
const canRequestRobotSubstitution = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.ROBOT_SUBSTITUTION))
const emergencyStopRequested = computed(() => state.value.activeRequests.includes(RemoteControlRequestType.EMERGENCY_STOP))
const timeoutRequested = computed(() => state.value.activeRequests.includes(RemoteControlRequestType.TIMEOUT))
const robotSubstitutionRequested = computed(() => state.value.activeRequests.includes(RemoteControlRequestType.ROBOT_SUBSTITUTION))

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
const requestRobotSubstitution = (request: boolean) => api?.Send({
  msg: {
    $case: 'requestRobotSubstitution',
    requestRobotSubstitution: request
  }
})

</script>

<template>
  <div class="control-buttons-container">
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
      :text-requested="`Cancel Emergency Stop (${state.emergencyStopIn} s left)`"
      @request="requestEmergencyStop"
    />
    <RequestButton
      :can-request="canRequestTimeout"
      :requested="timeoutRequested"
      text="Request Timeout"
      text-requested="Cancel Timeout Request"
      :text-additional="`${state.timeoutsLeft} left`"
      @request="requestTimeout"
    />
    <RequestButton
      :can-request="true"
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
      @request="requestRobotSubstitution"
    />
  </div>
</template>

<style scoped>
.control-buttons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1em 1em;
  padding: 1em;
  height: 100%;
  box-sizing: border-box;
}

.two-columns {
  grid-column: 1 / 3;
}
</style>
