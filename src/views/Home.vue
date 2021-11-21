<script setup lang="ts">
import ControlButtons from '../components/ControlButtons.vue';
import Keeper from '../components/Keeper.vue';
import {RemoteControlTeamState} from '../proto/ssl_gc_rcon_remotecontrol';
import {ApiController} from '../services/ApiController';
import {inject, ref} from 'vue';
import router from '../router';

const state = ref(RemoteControlTeamState.fromJSON({}));
const api = inject<ApiController>('api')

api?.RegisterStateConsumer((s) => state.value = s)

</script>

<template>
  <div class="control-buttons-container">
    <ControlButtons
      :substitute-bot="state.substituteBot"
      :challenge-flag="state.challengeFlag"
      :timeout="state.timeout"
      :emergency-stop="state.emergencyStop"
      @update:substitute-bot="(e: Event) => api?.SendState({substituteBot: e})"
      @update:challenge-flag="(e: Event) => api?.SendState({challengeFlag: e})"
      @update:timeout="(e: Event) => api?.SendState({timeout: e})"
      @update:emergency-stop="(e: Event) => api?.SendState({emergencyStop: e})"
    />
  </div>
  <div class="keeper-container">
    <Keeper
      :keeper-id="state.keeperId"
      @update:keeperId="router.push('/change-keeper')"
    />
  </div>
</template>

<style scoped>

</style>
