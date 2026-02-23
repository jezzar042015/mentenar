<script setup lang="ts">
  import { useViewsStore } from './stores/views';
  import AppDashboard from './pages/AppDashboard.vue'
  import FollowupItems from './pages/FollowupItems.vue'
  import PreventiveList from './pages/PreventiveList.vue'
  import TopNavBar from './components/TopNavBar.vue'
  import PreventiveMonthDetails from './pages/PreventiveMonthDetails.vue';
  import { onMounted } from 'vue';
  import { useFollowupsStore } from './stores/followups';
  import { usePreventiveStore } from './stores/preventive';
  import { useInstructionsStore } from './stores/tasks-instructions';
  
  const viewStore = useViewsStore()
  const followup = useFollowupsStore()
  const preventive = usePreventiveStore()
  const instructions = useInstructionsStore()

  onMounted(async () => {
    if (followup.data.length == 0) {
      await followup.pull()
    }

    if (preventive.data.length === 0) {
      await preventive.pullMonth()
    }

    if (instructions.data.length === 0) {
      await instructions.fetchAll()
    }
  })
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
