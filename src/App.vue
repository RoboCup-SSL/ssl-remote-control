<script setup lang="ts">
import ControlButtons from './components/ControlButtons.vue';
import Keeper from './components/Keeper.vue';
import {ref} from 'vue';
import {ControllerToRemoteControl, RemoteControlTeamState} from './proto/ssl_gc_rcon_remotecontrol';
import {ControllerReply_StatusCode} from './proto/ssl_gc_rcon';


function determineWebSocketAddress() {
  if (process.env.NODE_ENV === 'development') {
    // use the default backend port
    return 'ws://localhost:8083/api/control';
  }
  // UI and backend are served on the same host+port on production builds
  const protocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
  return protocol + '//' + window.location.hostname + ':' + window.location.port + '/api/control';
}

function connect(address: string) {
  const ws = new WebSocket(address);

  ws.onmessage = function (e) {
    const reply = ControllerToRemoteControl.fromJSON(JSON.parse(e.data));
    if (reply.controllerReply?.statusCode === ControllerReply_StatusCode.OK
      && reply.state) {
      state.value = reply.state;
    }
  };

  ws.onclose = function (e) {
    setTimeout(function () {
      connect(address);
    }, 1000);
  };

  ws.onerror = function (e) {
    ws.close();
  };
}

const state = ref(RemoteControlTeamState.fromJSON({}));
const wsAddress = determineWebSocketAddress();
connect(wsAddress);

</script>

<template>
  <div class="control-buttons-container">
    <ControlButtons
      :robot-substitution-request-pending="state.substituteBot"
      :challenge-flag-set="state.challengeFlag"
      :timeout-request-pending="state.timeout"
      :emergency-stop-pending="state.emergencyStop"
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
