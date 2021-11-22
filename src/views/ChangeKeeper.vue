<script setup lang="ts">
import SelectNumber from '../components/SelectNumber.vue';
import {inject, ref} from 'vue';
import {RemoteControlTeamState} from '../proto/ssl_gc_rcon_remotecontrol';
import {ApiController} from '../services/ApiController';
import router from '../router';

const keeperId = ref(0);
const api = inject<ApiController>('api')
api?.RegisterStateConsumer((s: RemoteControlTeamState) => keeperId.value = s.keeperId)

const changeKeeperId = (id: number) => {
  api?.Send({msg: {$case: 'desiredKeeper', desiredKeeper: id}})
  router.push('/')
}

</script>

<template>
  <div class="num-pad">
    <SelectNumber
      :current-number="keeperId"
      :count="16"
      @update:number="changeKeeperId"
    />
    <button
      id="button-cancel"
      class="button red"
      @click="router.push('/')"
    >
      Cancel
    </button>
  </div>
</template>

<style scoped>
.num-pad {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 1em 1em;
  padding: 1em;
  height: 100%;
  box-sizing: border-box;
}

#button-cancel {
  grid-column: 2 / 4;
}
</style>
