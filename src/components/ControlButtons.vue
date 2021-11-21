<script setup lang="ts">

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
  <button
    :disabled="!canRequestChallengeFlag"
    @click="$emit('request:challengeFlag')"
  >
    Raise Challenge Flag ({{ challengeFlagsLeft }} left)
  </button>
  <button
    :disabled="!canRequestEmergencyStop"
    :class="{'button-pressed': emergencyStopRequested}"
    @click="$emit('request:emergencyStop', !emergencyStopRequested)"
  >
    Emergency Stop <span v-if="emergencyStopIn">[{{ emergencyStopIn }} s]</span>
  </button>
  <button
    :disabled="!canRequestTimeout"
    :class="{'button-pressed': timeoutRequested}"
    @click="$emit('request:timeout', !timeoutRequested)"
  >
    Request Timeout ({{ timeoutsLeft }} left)
  </button>
  <button
    :disabled="!canRequestRobotSubstitution"
    :class="{'button-pressed': robotSubstitutionRequested}"
    @click="$emit('request:robotSubstitution', !robotSubstitutionRequested)"
  >
    Substitute Robot
  </button>
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

.button-pressed {
  background-color: red;
}
</style>
