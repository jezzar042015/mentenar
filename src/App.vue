<script setup lang="ts">
  import { ref } from 'vue';
  import type { AppView } from './types/views';
  import AppDashboard from './pages/AppDashboard.vue'
  import FollowupItems from './pages/FollowupItems.vue'
  import PreventiveList from './pages/PreventiveList.vue'

  const view = ref<AppView>('followups')
</script>

<template>
  <div class="p-4 bg-gray-50 font-notosans">
    <AppDashboard v-if="view == 'home'" />
    <FollowupItems v-if="view == 'followups'" />
    <PreventiveList v-if="view == 'preventive'" />
  </div>
</template>
