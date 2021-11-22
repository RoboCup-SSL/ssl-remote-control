<script setup lang="ts">

import RequestButton from './RequestButton.vue';
import router from '../router';

defineProps({
  canRequestChallengeFlag: Boolean,
  canRequestEmergencyStop: Boolean,
  canRequestTimeout: Boolean,
  canRequestRobotSubstitution: Boolean,

  emergencyStopRequested: Boolean,
  timeoutRequested: Boolean,
  robotSubstitutionRequested: Boolean,

  emergencyStopIn: Number,
  timeoutsLeft: Number,
  challengeFlagsLeft: Number,
})

defineEmits([
  'request:challengeFlag',
  'request:emergencyStop',
  'request:timeout',
  'request:robotSubstitution',
])

</script>

<template>
  <div class="control-buttons-container">
    <RequestButton
      :can-request="canRequestChallengeFlag"
      :requested="false"
      :text="`Raise Challenge Flag (${challengeFlagsLeft} left)`"
      @request="() => $emit('request:challengeFlag')"
    />
    <RequestButton
      :can-request="canRequestEmergencyStop"
      :requested="emergencyStopRequested"
      text="Emergency Stop"
      :text-requested="`Cancel Emergency Stop (${emergencyStopIn} s left)`"
      @request="(request: Boolean) => $emit('request:emergencyStop', request)"
    />
    <RequestButton
      :can-request="canRequestTimeout"
      :requested="timeoutRequested"
      :text="`Request Timeout (${timeoutsLeft} left)`"
      :text-requested="`Cancel Timeout Request (${timeoutsLeft} left)`"
      @request="(request: Boolean) => $emit('request:timeout', request)"
    />
    <RequestButton
      :can-request="true"
      :requested="false"
      :text="`Change Keeper Id (1)`"
      @request="() => router.push('/change-keeper')"
    />
    <RequestButton
      class="two-columns"
      :can-request="canRequestRobotSubstitution"
      :requested="robotSubstitutionRequested"
      :text="`Robot Substitution`"
      :text-requested="`Cancel Robot Substitution`"
      @request="(request: Boolean) => $emit('request:robotSubstitution', request)"
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
