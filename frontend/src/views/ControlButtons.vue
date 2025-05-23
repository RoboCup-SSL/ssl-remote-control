<script setup lang="ts">

import RequestButton from '../components/RequestButton.vue';
import router from '../router';
import {
  RemoteControlRequestType,
  RemoteControlTeamStateSchema,
  RemoteControlToController_Request,
  RemoteControlToControllerSchema,
} from '../proto/ssl_gc_rcon_remotecontrol_pb';
import {ApiController} from '../services/ApiController';
import {computed, inject, ref} from 'vue';
import {create} from "@bufbuild/protobuf";

const state = ref(create(RemoteControlTeamStateSchema, {}));
const api = inject<ApiController>('api')

api?.RegisterStateConsumer((s) => state.value = s)

const canRequestChallengeFlag = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.CHALLENGE_FLAG))
const canRequestEmergencyStop = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.EMERGENCY_STOP))
const canRequestTimeout = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.TIMEOUT))
const canStopTimeout = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.STOP_TIMEOUT))
const canChangeKeeperId = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.CHANGE_KEEPER_ID))
const canRequestRobotSubstitution = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.ROBOT_SUBSTITUTION))
const canFailBallplacement = computed(() => state.value.availableRequests.includes(RemoteControlRequestType.FAIL_BALLPLACEMENT))
const emergencyStopRequested = computed(() => state.value.activeRequests.includes(RemoteControlRequestType.EMERGENCY_STOP))
const timeoutRequested = computed(() => state.value.activeRequests.includes(RemoteControlRequestType.TIMEOUT))
const robotSubstitutionRequested = computed(() => state.value.activeRequests.includes(RemoteControlRequestType.ROBOT_SUBSTITUTION))
const robotDiff = computed(() => {
  const botSubstitutionsLeftMsg = `${state.value.botSubstitutionsLeft} free left`
  if (state.value.botSubstitutionTimeLeft > 0) {
    return `${botSubstitutionsLeftMsg} (${Math.round(state.value.botSubstitutionTimeLeft)} s)`
  }
  return botSubstitutionsLeftMsg
})
const botSubstitutionRequestedMsg = computed(() => {
  if (state.value.canSubstituteRobot) {
    return 'Finish Substitution'
  }
  return 'Cancel Substitution Request'
})

const requestChallengeFlag = () => router.push('/confirm-challenge-flag')
const requestEmergencyStop = (request: boolean) => api?.Send(create(RemoteControlToControllerSchema, {
  msg: {
    case: 'requestEmergencyStop',
    value: request
  }
}))
const requestTimeout = (request: boolean) => api?.Send(create(RemoteControlToControllerSchema, {
  msg: {
    case: 'requestTimeout',
    value: request
  }
}))
const stopTimeout = () => api?.Send(create(RemoteControlToControllerSchema, {
  msg: {
    case: 'request',
    value: RemoteControlToController_Request.STOP_TIMEOUT
  }
}))
const requestRobotSubstitution = (request: boolean) => api?.Send(create(RemoteControlToControllerSchema, {
  msg: {
    case: 'requestRobotSubstitution',
    value: request
  }
}))
const failBallplacement = () => api?.Send(create(RemoteControlToControllerSchema, {
  msg: {
    case: 'request',
    value: RemoteControlToController_Request.FAIL_BALLPLACEMENT
  }
}))

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
      v-if="canFailBallplacement"
      :can-request="canFailBallplacement"
      :requested="false"
      text="Fail Ballplacement"
      @request="failBallplacement"
    />
    <RequestButton
      v-else
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
      :text-additional="`${state.timeoutsLeft} left (${Math.round(state.timeoutTimeLeft)} s)`"
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
      :can-request="canRequestRobotSubstitution"
      :requested="robotSubstitutionRequested"
      text="Request Substitution"
      :text-requested="botSubstitutionRequestedMsg"
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

</style>
