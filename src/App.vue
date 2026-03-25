<script setup lang="ts">
  import { useViewsStore } from './stores/views';
  import { onMounted } from 'vue';
  import { useFollowupsStore } from './stores/followups';
  import { usePreventiveStore } from './stores/preventive';
  import { useInstructionsStore } from './stores/tasks-instructions';
  import { useScheduleStore } from './stores/schedules';
  import { useURLStore } from './stores/url';
  import AppDashboard from './pages/AppDashboard.vue'
  import FollowupItems from './pages/FollowupItems.vue'
  import PreventiveList from './pages/PreventiveList.vue'
  import TopNavBar from './components/TopNavBar.vue'
  import PreventiveMonthDetails from './pages/PreventiveMonthDetails.vue';
  import FollowupDetails from './pages/FollowupDetails.vue';
  import CalendarView from './pages/CalendarView.vue';
  import MyProfile from './pages/MyProfile.vue';
  import ProfileSignIn from './pages/ProfileSignIn.vue';

  const viewStore = useViewsStore()
  const followup = useFollowupsStore()
  const preventive = usePreventiveStore()
  const instructions = useInstructionsStore()
  const scheds = useScheduleStore()
  const url = useURLStore()

  const reload = async () => {
    if (viewStore.view == 'followups' || viewStore.view == 'followup-details') await followup.pull()
    if (viewStore.view == 'preventive') await preventive.pullMonth()

    if (viewStore.view == 'home') {
      await followup.pull()
      await preventive.pullMonth()
    }
  }

  onMounted(async () => {
    // pull data if not loaded or pull if last pull was a week ago
    await url.parseURL()
    await viewStore.handleViewRequest()
    if (scheds.shouldPull) await scheds.pull()
    if (preventive.shouldPull) await preventive.pullMonth()
    if (followup.shouldPull) await followup.pull()
    if (instructions.data.length === 0) await instructions.fetchAll()
  })
</script>

<template>
  <div class="bg-gray-50 font-notosans md:max-w-300 mx-auto min-h-screen">
    <TopNavBar @reload="reload" class="" v-if="viewStore.showHeader" />
    <AppDashboard v-if="viewStore.view == 'home'" />
    <FollowupItems v-if="viewStore.view == 'followups'" />
    <FollowupDetails v-if="viewStore.view == 'followup-details'" />
    <PreventiveList v-if="viewStore.view == 'preventive'" />
    <PreventiveMonthDetails v-if="viewStore.view == 'preventive-monthly'" />
    <CalendarView v-if="viewStore.view == 'calendar'" />
    <MyProfile v-if="viewStore.view == 'profile'" />
    <ProfileSignIn v-if="viewStore.view == 'signin'" />
  </div>
</template>
