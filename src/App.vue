<script setup lang="ts">
  import { useViewsStore } from './stores/views';
  import AppDashboard from './pages/AppDashboard.vue'
  import FollowupItems from './pages/FollowupItems.vue'
  import PreventiveList from './pages/PreventiveList.vue'
  import TopNavBar from './components/TopNavBar.vue'
  import PreventiveMonthDetails from './pages/PreventiveMonthDetails.vue';

  const viewStore = useViewsStore()
</script>

<template>
  <div class="bg-gray-50 font-notosans">
    <TopNavBar />
    <AppDashboard v-if="viewStore.view == 'home'" />
    <FollowupItems v-if="viewStore.view == 'followups'" />
    <PreventiveList v-if="viewStore.view == 'preventive'" />
    <PreventiveMonthDetails v-if="viewStore.view == 'preventive-monthly'" />
  </div>
</template>
