<template>
    <div class="h-screen overflow-auto pb-24">
        <WeeklyCleaningTasks v-if="weeklyModal" />
        <div class="pt-4 px-4 h-fit mb-10 pb-5">
            <div class="mt-0 h-full mb-10 ">

                <div class="space-y-4 mb-10">

                    <template v-if="scheds.thisWeek">
                        <DashWeeklySchedules :week-sched="scheds.thisWeek" />
                    </template>

                    <div class="bg-white p-4 rounded-md space-y-4 shadow-xl md:space-y-0">
                        <div>
                            <h2 class="text-lg font-semibold">Monthly Preventative Maintenance</h2>
                        </div>

                        <div class="flex flex-col space-y-5 md:flex-row md:gap-2 md:space-y-0">
                            <template v-for="value in pm.lateMonths" :key="value.month">
                                <DashPreventiveCard :monthItem="value" :is-late="true" />
                            </template>

                            <template v-if="pm.currentMonth && !pm.currentMonthIsCompleted">
                                <DashPreventiveCard :month-item="pm.currentMonth" />
                            </template>
                        </div>
                    </div>

                    <div class="bg-white px-4 py-4 rounded-md space-y-6 shadow-xl md:grid grid-cols-2 gap-5">
                        <div v-if="followup.overdue.length > 0" class="p-5 shadow-md h-full" @click="gotoTasksOverdues">
                            <div class="flex items-center gap-1">
                                <div>Overdue</div>
                            </div>
                            <div class="font-bold text-6xl text-red-500 flex items-start gap-2">
                                <div> {{ followup.overdue.length }}</div>
                                <div class="text-3xl">task{{ followup.overdue.length > 1 ? 's' : '' }}</div>
                            </div>
                        </div>

                        <div v-if="followup.dueSoon.length > 0" class="p-5 shadow-md h-full" @click="gotoTasksDueSoon">
                            <div class="flex items-center gap-1">
                                <div>Overdue in 7 days</div>
                            </div>
                            <div class="font-bold text-6xl text-orange-500 flex items-start gap-2">
                                <div> {{ followup.dueSoon.length }}</div>
                                <div class="text-3xl">task{{ followup.dueSoon.length > 1 ? 's' : '' }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import DashPreventiveCard from '@/components/DashPreventiveCard.vue';
    import DashWeeklySchedules from '@/components/DashWeeklySchedules.vue';
    import WeeklyCleaningTasks from '@/components/WeeklyCleaningTasks.vue';
    import { useFollowupsStore } from '@/stores/followups';
    import { usePreventiveStore } from '@/stores/preventive';
    import { useScheduleStore } from '@/stores/schedules';
    import { useViewsStore } from '@/stores/views';
    import { ref, watch } from 'vue';

    const followup = useFollowupsStore()
    const pm = usePreventiveStore()
    const scheds = useScheduleStore()
    const view = useViewsStore()

    const weeklyModal = ref(false)

    const gotoTasksOverdues = () => {
        view.setView('followups', 'overdue')
    }

    const gotoTasksDueSoon = () => {
        view.setView('followups', 'due')
    }

    watch(weeklyModal, (val) => {
        document.body.style.overflow = val ? 'hidden' : ''
    })
</script>
