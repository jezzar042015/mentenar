<script setup lang="ts">
  import { useViewsStore } from './stores/views';
  import { onMounted } from 'vue';
  import { useFollowupsStore } from './stores/followups';
  import { usePreventiveStore } from './stores/preventive';
  import { useInstructionsStore } from './stores/tasks-instructions';
  import { useScheduleStore } from './stores/schedules';
  import { useURLStore } from './stores/url';
  import { useAuthStore } from './stores/auth';
  import { useAccountsStore } from './stores/accounts';
  import AppDashboard from './pages/AppDashboard.vue'
  import FollowupItems from './pages/FollowupItems.vue'
  import PreventiveList from './pages/PreventiveList.vue'
  import TopNavBar from './components/TopNavBar.vue'
  import PreventiveMonthDetails from './pages/PreventiveMonthDetails.vue';
  import FollowupDetails from './pages/FollowupDetails.vue';
  import CalendarView from './pages/CalendarView.vue';
  import MyProfile from './pages/MyProfile.vue';
  import ProfileSignIn from './pages/ProfileSignIn.vue';
  import PendingReimbursables from './pages/PendingReimbursables.vue';
  import CongContributions from './pages/CongContributions.vue';
  import MonthlyExpenses from './pages/MonthlyExpenses.vue';
  import ApprovedExpenses from './pages/ApprovedExpenses.vue';
  import WeeklySchudules from './pages/WeeklySchudules.vue';
  import BankTransactions from './pages/BankTransactions.vue';

  const viewStore = useViewsStore()
  const followup = useFollowupsStore()
  const preventive = usePreventiveStore()
  const instructions = useInstructionsStore()
  const scheds = useScheduleStore()
  const url = useURLStore()
  const auth = useAuthStore()
  const accounts = useAccountsStore()

  const reload = async () => {
    if (viewStore.view == 'followups' || viewStore.view == 'followup-details') await followup.pull()
    if (viewStore.view == 'preventive') await preventive.pullMonth()

    if (viewStore.view == 'home') {
      await followup.pull()
      await preventive.pullMonth()
      await scheds.pull()
    }

    if (viewStore.view == 'profile' && auth.token) {
      await accounts.pull()
    }
  }

  onMounted(async () => {
    await url.parseURL()
    await viewStore.handleViewRequest()
    if (scheds.shouldPull) await scheds.pull()
    if (preventive.shouldPull) await preventive.pullMonth()
    if (followup.shouldPull) await followup.pull()
    if (instructions.data.length === 0) await instructions.fetchAll()
    if (auth.token.length > 0 && accounts.shouldPull) await accounts.pull()
  })
</script>

<template>
  <div class="bg-gray-50 h-screen overflow-hidden font-notosans md:max-w-300 mx-auto min-h-screen">
    <TopNavBar @reload="reload" class="" v-if="viewStore.showHeader" />
    <AppDashboard v-if="viewStore.view == 'home'" />
    <FollowupItems v-if="viewStore.view == 'followups'" />
    <FollowupDetails v-if="viewStore.view == 'followup-details'" />
    <PreventiveList v-if="viewStore.view == 'preventive'" />
    <PreventiveMonthDetails v-if="viewStore.view == 'preventive-monthly'" />
    <CalendarView v-if="viewStore.view == 'calendar'" />
    <MyProfile v-if="viewStore.view == 'profile'" />
    <ProfileSignIn v-if="viewStore.view == 'signin'" />
    <PendingReimbursables v-if="viewStore.view == 'reimbursements'" />
    <CongContributions v-if="viewStore.view == 'contributions'" />
    <MonthlyExpenses v-if="viewStore.view == 'monthly-expenses'" />
    <ApprovedExpenses v-if="viewStore.view == 'approved-expenses'" />
    <WeeklySchudules v-if="viewStore.view == 'schedules'" />
    <BankTransactions v-if="viewStore.view == 'transactions'" />
  </div>
</template>
