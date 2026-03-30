<template>
    <div>
        <div class="p-5 space-y-2">
            <div class="pb-4">
                <div @click="exit" class="flex space-x-0 items-center">
                    <span>
                        <CaretLeftIcon class="h-5 w-5" />
                    </span>
                    <span>Dashboard</span>
                </div>
                <div class="font-semibold text-xl">
                    Weekly Assignments
                </div>
            </div>

            <div v-for="s in scheds.data" :key="s.weekNum + s.week" class="p-2 border-0 border-b border-b-gray-300">
                <div class="pb-2 text-xl text-cyan-700">{{ s.week }}, {{ s.year }}</div>
                
                <div class="grid grid-cols-2">
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
                            <div class="text-xs w-1/2">Hall 1 & Exteriors</div>
                            <div class="font-semibold text-sm flex-1">{{ s.cleaning.hall1 }}</div>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="text-xs w-1/2">Hall 2 & Exteriors</div>
                            <div class="font-semibold text-sm flex-1">{{ s.cleaning.hall2 }}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import CleaningMop from '@/icons/CleaningMop.vue';
    import GarbageIcon from '@/icons/GarbageIcon.vue';
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
