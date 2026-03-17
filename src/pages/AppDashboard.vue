<template>
    <div class="bg-gray-200 p-4">
        <div class="mt-0 mb-10">

            <div class="space-y-4">

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

                <div class="bg-white p-4 rounded-md space-y-4 shadow-xl">
                    <div>
                        <h2 class="text-lg font-semibold">Due this week</h2>
                    </div>

                    <div class="space-y-4 md:grid md:grid-cols-2 md:gap-3">
                        <template v-for="item in followup.overdue" :key="item.task">
                            <DashFollowUpCard :item />
                        </template>

                        <template v-for="item in followup.dueSoon" :key="item.task">
                            <DashFollowUpCard :item />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import DashFollowUpCard from '@/components/DashFollowUpCard.vue';
    import DashPreventiveCard from '@/components/DashPreventiveCard.vue';
    import DashWeeklySchedules from '@/components/DashWeeklySchedules.vue';
    import { useFollowupsStore } from '@/stores/followups';
    import { usePreventiveStore } from '@/stores/preventive';
    import { useScheduleStore } from '@/stores/schedules';

    const followup = useFollowupsStore()
    const pm = usePreventiveStore()
    const scheds = useScheduleStore()
</script>
