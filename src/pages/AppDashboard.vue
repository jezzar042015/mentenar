<template>
    <div class="bg-gray-200 p-4">
        <div class="mt-0 mb-10">

            <div class="space-y-4">

                <div v-if="scheds.thisWeek">
                    <div class="bg-white p-3 rounded-md space-y-2 shadow-xl">
                        <div>
                            <h2 class="font-semibold">Weekly Schedules</h2>
                            <h2>{{ scheds.thisWeek.week }}</h2>
                        </div>
                        <hr class="border-0 border-b border-b-gray-300">
                        <div class="flex gap-5 items-center">
                            <span>
                                <GarbageIcon class="h-15 w-10" />
                            </span>
                            <div class="flex flex-col">
                                <span>Garbage Disposal</span>
                                <span class="text-lg font-bold">
                                    {{ scheds.thisWeek.garbage }} Congregation
                                </span>
                            </div>
                        </div>
                        <hr class="border-0 border-b border-b-gray-300">

                        <div class="space-y-3 mt-4">
                            <div>Weekly Cleaning Tasks Assignments</div>
                            <div class="flex gap-5 items-center">
                                <span>
                                    <CleaningMop class="h-10 w-10" />
                                </span>
                                <div class="flex flex-col">
                                    <span>HALL 1 & Outdoors</span>
                                    <span class="text-lg font-bold">
                                        {{ scheds.thisWeek.cleaning.hall1 }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex gap-5 items-center">
                                <span>
                                    <CleaningMop class="h-10 w-10" />
                                </span>
                                <div class="flex flex-col">
                                    <span>HALL 2 & Outdoors</span>
                                    <span class="text-lg font-bold">
                                        {{ scheds.thisWeek.cleaning.hall2 }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <template v-for="value in pm.lateMonths" :key="value.month">
                    <DashPreventiveCard :monthItem="value" :is-late="true" />
                </template>

                <template v-if="pm.currentMonth && !pm.currentMonthIsCompleted">
                    <DashPreventiveCard :month-item="pm.currentMonth" />
                </template>

                <!-- <template v-for="item in followup.overdue" :key="item.task">
                    <DashFollowUpCard :item />
                </template>

                <template v-for="item in followup.dueSoon" :key="item.task">
                    <DashFollowUpCard :item />
                </template> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import DashFollowUpCard from '@/components/DashFollowUpCard.vue';
    import DashPreventiveCard from '@/components/DashPreventiveCard.vue';
import CleaningMop from '@/icons/CleaningMop.vue';
    import GarbageIcon from '@/icons/GarbageIcon.vue';
    import { useFollowupsStore } from '@/stores/followups';
    import { usePreventiveStore } from '@/stores/preventive';
    import { useScheduleStore } from '@/stores/schedules';

    const followup = useFollowupsStore()
    const pm = usePreventiveStore()
    const scheds = useScheduleStore()
</script>
