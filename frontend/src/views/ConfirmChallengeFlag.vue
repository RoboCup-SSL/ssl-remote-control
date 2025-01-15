<script setup lang="ts">
import {inject} from 'vue';
import {
  RemoteControlToController_Request,
  RemoteControlToControllerSchema
} from '../proto/ssl_gc_rcon_remotecontrol_pb';
import {ApiController} from '../services/ApiController';
import router from '../router';
import {create} from "@bufbuild/protobuf";

const api = inject<ApiController>('api')

const requestChallengeFlag = () => {
  api?.Send(create(RemoteControlToControllerSchema,
    {
      msg: {
        case: 'request',
        value: RemoteControlToController_Request.CHALLENGE_FLAG
      }
    }
    )
  )
  router.push('/')
}
</script>

<template>
  <div class="num-pad">
    <button
      class="button red"
      @click="router.push('/')"
    >
      Cancel
    </button>
    <button
      class="button green"
      @click="requestChallengeFlag"
    >
      Confirm
    </button>
  </div>
</template>

<style scoped>
.num-pad {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1em 1em;
  padding: 1em;
  height: 100%;
  box-sizing: border-box;
}
</style>
