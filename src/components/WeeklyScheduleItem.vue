<template>
    <div :class="['p-2 border-0 border-b border-b-gray-300', isThisWeek ? 'bg-cyan-700 text-white rounded-md p-4 shadow-lg' : '']">
        <div :class="['pb-2 text-xl', isThisWeek ? 'text-white' : 'text-cyan-700']">{{ s.week }}, {{ s.year }}</div>

        <div class="grid grid-cols-2 md:grid-cols-4">
            <div class="text-xs flex items-center gap-1">
                <div>
                    <GarbageIcon class="h-4 w-4" />
                </div>
                <div> Garbage Disposal</div>
            </div>
            <div class="font-semibold text-sm">{{ s.garbage }}</div>

        </div>

        <div class="mt-3">
            <div class="text-xs flex items-center gap-2">
                <div>
                    <CleaningMop class="h-4 w-4" />
                </div>
                <div> Weekly Cleaning</div>
            </div>

            <div class="pt-2 space-y-1">
                <div class="flex justify-between items-center">
                    <div class="text-xs w-1/2 md:w-1/4">Hall 1 & Exteriors</div>
                    <div class="font-semibold text-sm flex-1">{{ s.cleaning.hall1 }}</div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-xs w-1/2 md:w-1/4">Hall 2 & Exteriors</div>
                    <div class="font-semibold text-sm flex-1">{{ s.cleaning.hall2 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CleaningMop from '@/icons/CleaningMop.vue';
    import GarbageIcon from '@/icons/GarbageIcon.vue';
    import type { WeeklyScheduleItem } from '@/types/weekly-schedules';
    import { useScheduleStore } from '@/stores/schedules';
    import { computed } from 'vue';

    const { s } = defineProps<{
        s: WeeklyScheduleItem
    }>()

    const sched = useScheduleStore()

    const isThisWeek = computed(() => {
        return s.weekNum == sched.currentWeekNum && s.year == sched.currentYear
    })

</script>