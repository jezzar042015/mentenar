<template>
    <div>
        <div class="p-5 space-y-2">
            <div class="pb-4">
                <div @click="exit" class="flex space-x-0 items-center cursor-pointer">
                    <span>
                        <CaretLeftIcon class="h-5 w-5" />
                    </span>
                    <span>Dashboard</span>
                </div>
                <div class="font-semibold text-xl">
                    Weekly Assignments
                </div>
            </div>

            <template v-for="s in scheds.filteredData" :key="s.weekNum + s.week">
                <WeeklyScheduleItem :s />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import WeeklyScheduleItem from '@/components/WeeklyScheduleItem.vue';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import { useScheduleStore } from '@/stores/schedules';
    import { useViewsStore } from '@/stores/views';
    import { onMounted } from 'vue';

    const view = useViewsStore()
    const scheds = useScheduleStore()

    const exit = () => {
        view.setView('home')
        view.showHeader = true
    }

    onMounted(() => {
        view.showHeader = false
    })
</script>
