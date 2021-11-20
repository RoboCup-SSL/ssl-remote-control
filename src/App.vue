<script setup lang="ts">
import ControlButtons from './components/ControlButtons.vue';
import Keeper from './components/Keeper.vue';
import {ref} from 'vue';
import {RemoteControlTeamState, RemoteControlToController} from './proto/ssl_gc_rcon_remotecontrol';
import {ApiController} from './ApiController';

function updateState(obj: any) {
  apiController.Send(RemoteControlToController.fromJSON(obj))
}

const apiController = new ApiController()
const state = ref(RemoteControlTeamState.fromJSON({}));
apiController.RegisterStateConsumer((s) => state.value = s)

</script>

<template>
  <div class="control-buttons-container">
    <ControlButtons
      :substitute-bot="state.substituteBot"
      :challenge-flag="state.challengeFlag"
      :timeout="state.timeout"
      :emergency-stop="state.emergencyStop"
      @update:substitute-bot="e => updateState({substituteBot: e})"
      @update:challenge-flag="e => updateState({challengeFlag: e})"
      @update:timeout="e => updateState({timeout: e})"
      @update:emergency-stop="e => updateState({emergencyStop: e})"
    />
  </div>
  <div class="keeper-container">
    <Keeper :keeper-id="state.keeperId"/>
  </div>
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
