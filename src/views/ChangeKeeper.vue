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
  <div>
    <SelectNumber
      :current-number="keeperId"
      :count="16"
      @update:number="changeKeeperId"
    />
  </div>
  <div>
    <button @click="router.push('/')">Cancel</button>
  </div>
</template>

<style scoped>

</style>
