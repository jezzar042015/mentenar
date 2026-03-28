<template>
    <div>
        <div class="bg-white p-4 rounded-md space-y-2 shadow-xl">
            <div @click="gotoWeeklySchedules">
                <h2 class="text-lg font-semibold">Weekly Schedules</h2>
                <h2 class="text-sm">{{ weekSched.week }}</h2>
            </div>
            <hr class="border-0 border-b border-b-gray-300">

            <div class="md:flex justify-between">
                <div class="flex gap-5 items-center md:w-1/3">
                    <span>
                        <GarbageIcon class="h-15 w-10" />
                    </span>
                    <div class="flex flex-col">
                        <span class="text-gray-600 text-sm">Garbage Disposal</span>
                        <span class="text-lg font-semibold">
                            {{ weekSched.garbage }} Congregation
                        </span>
                    </div>
                </div>

                <hr class="border-0 border-b border-b-gray-300 mt-4 md:hidden">

                <div class="space-y-3 mt-4 md:w-2/3">
                    <div class="md:hidden">Weekly Cleaning Tasks Assignments</div>
                    <div class="md:flex space-y-4 md:px-4 md:items-start">
                        <div class="flex gap-5 items-center md:pr-10">
                            <span>
                                <CleaningMop class="h-10 w-10 opacity-50" />
                            </span>
                            <div class="flex flex-col">
                                <span class="text-gray-600 text-sm">HALL 1 & Outdoors</span>
                                <span class="text-lg font-semibold">
                                    {{ weekSched.cleaning.hall1 }}
                                </span>
                            </div>
                        </div>
                        <hr class="border-0 border-b border-b-gray-300 md:hidden">
                        <div class="flex gap-5 items-center">
                            <span>
                                <CleaningMop class="h-10 w-10 opacity-50" />
                            </span>
                            <div class="flex flex-col">
                                <span class="text-gray-600 text-sm">HALL 2 & Outdoors</span>
                                <span class="text-lg font-semibold">
                                    {{ weekSched.cleaning.hall2 }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CleaningMop from '@/icons/CleaningMop.vue';
    import GarbageIcon from '@/icons/GarbageIcon.vue';
    import { useViewsStore } from '@/stores/views';
    import type { WeeklyScheduleItem } from '@/types/weekly-schedules';

    const { weekSched } = defineProps<{
        weekSched: WeeklyScheduleItem
    }>()

    const view = useViewsStore()

    const gotoWeeklySchedules = () => {
        view.setView('schedules')
    }
</script>