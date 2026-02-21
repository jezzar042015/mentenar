<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { AppView } from './types/views';
  import AppDashboard from './pages/AppDashboard.vue'
  import FollowupItems from './pages/FollowupItems.vue'
  import PreventiveList from './pages/PreventiveList.vue'
  import TopNavBar from './components/TopNavBar.vue'

  const view = ref<AppView>('home')

  const appHeaders = ref<Record<AppView, string>>({
    home: "Kingdom Hall",
    followups: "Follow Up Items",
    preventive: "Preventative Maintenance",
    settings: "Settings"
  })

  const header = computed(() => appHeaders.value[view.value])
  const setView = (v: AppView) => {
    view.value = v
  }
</script>

<template>
  <div class="bg-gray-50 font-notosans">
    <TopNavBar :header :current-view="view" @set="setView"/>
    <AppDashboard v-if="view == 'home'" />
    <FollowupItems v-if="view == 'followups'" />
    <PreventiveList v-if="view == 'preventive'" />
  </div>
</template>
