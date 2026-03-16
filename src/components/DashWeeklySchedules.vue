<template>
    <div>
        <div class="bg-white p-4 rounded-md space-y-2 shadow-xl">
            <div>
                <h2 class="text-lg font-semibold">Weekly Schedules</h2>
                <h2 class="text-sm">{{ weekSched.week }}</h2>
            </div>
            <hr class="border-0 border-b border-b-gray-300">
            <div class="flex gap-5 items-center">
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
            <hr class="border-0 border-b border-b-gray-300">

            <div class="space-y-3 mt-4">
                <div>Weekly Cleaning Tasks Assignments</div>
                <div class="flex gap-5 items-center">
                    <span>
                        <CleaningMop class="h-10 w-10" />
                    </span>
                    <div class="flex flex-col">
                        <span class="text-gray-600 text-sm">HALL 1 & Outdoors</span>
                        <span class="text-lg font-semibold">
                            {{ weekSched.cleaning.hall1 }}
                        </span>
                    </div>
                </div>
                <hr class="border-0 border-b border-b-gray-300">
                <div class="flex gap-5 items-center">
                    <span>
                        <CleaningMop class="h-10 w-10" />
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
</template>

<script setup lang="ts">
    import CleaningMop from '@/icons/CleaningMop.vue';
    import GarbageIcon from '@/icons/GarbageIcon.vue';
    import type { WeeklyScheduleItem } from '@/types/weekly-schedules';

    const { weekSched } = defineProps<{
        weekSched: WeeklyScheduleItem
    }>()
</script>