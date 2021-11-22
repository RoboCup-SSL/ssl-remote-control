<script setup lang="ts">
import ControlButtons from '../components/ControlButtons.vue';
import {
  RemoteControlTeamState,
  RemoteControlRequestType,
  RemoteControlToController_Request
} from '../proto/ssl_gc_rcon_remotecontrol';
import {ApiController} from '../services/ApiController';
import {inject, ref} from 'vue';

const state = ref(RemoteControlTeamState.fromJSON({}));
const api = inject<ApiController>('api')

api?.RegisterStateConsumer((s) => state.value = s)

</script>

<template>
  <ControlButtons
    :can-request-challenge-flag="state.availableRequests.includes(RemoteControlRequestType.CHALLENGE_FLAG)"
    :can-request-emergency-stop="state.availableRequests.includes(RemoteControlRequestType.EMERGENCY_STOP)"
    :can-request-timeout="state.availableRequests.includes(RemoteControlRequestType.TIMEOUT)"
    :can-request-robot-substitution="state.availableRequests.includes(RemoteControlRequestType.ROBOT_SUBSTITUTION)"
    :emergency-stop-requested="state.activeRequests.includes(RemoteControlRequestType.EMERGENCY_STOP)"
    :timeout-requested="state.activeRequests.includes(RemoteControlRequestType.TIMEOUT)"
    :robot-substitution-requested="state.activeRequests.includes(RemoteControlRequestType.ROBOT_SUBSTITUTION)"
    :emergency-stop-in="state.emergencyStopIn"
    :challenge-flags-left="state.challengeFlagsLeft"
    :timeouts-left="state.timeoutsLeft"
    @request:challenge-flag="() => api?.Send({msg: {$case: 'request', request: RemoteControlToController_Request.CHALLENGE_FLAG}})"
    @request:emergency-stop="(e: Boolean) => api?.Send({msg: {$case: 'requestEmergencyStop', requestEmergencyStop: e.valueOf()}})"
    @request:timeout="(e: Boolean) => api?.Send({msg: {$case: 'requestTimeout', requestTimeout: e.valueOf()}})"
    @request:robot-substitution="(e: Boolean) => api?.Send({msg: {$case: 'requestRobotSubstitution', requestRobotSubstitution: e.valueOf()}})"
  />
</template>

<style scoped>
</style>
