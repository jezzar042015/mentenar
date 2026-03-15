<template>
    <div class="w-15 h-15">
        <div class="w-full h-full rounded-full ">
            <div class="relative w-full h-full flex items-center justify-center">
                <svg class="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="8" />
                    <circle cx="50" cy="50" r="45" fill="none" :stroke="progressColor" stroke-width="8"
                        stroke-dasharray="282.7" :stroke-dashoffset="282.7 - (282.7 * completedCount) / allCount"
                        stroke-linecap="round" transform="rotate(-90 50 50)" class="transition-all duration-300" />
                </svg>
                <div class="absolute text-center text-xs font-semibold">
                    <div v-if="label == 'over'">{{ completedCount }}/{{ allCount }}</div>
                    <div v-if="label == 'percent'">{{ Math.round(completedCount / allCount * 100) }}%</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const { completedCount, allCount, color = 'blue', label = 'over' } = defineProps<{
        completedCount: number
        allCount: number
        color?: 'blue' | 'red' | 'green' | 'amber' | 'orange'
        label?: 'over' | 'percent' | 'none'
    }>()

    const progressColor = computed(() => {
        switch (color) {
            case 'red':
                return '#ef4444'
            case 'green':
                return '#10b981'
            case 'amber':
                return '#ffa431'
            case 'orange':
                return '#ea580c'
            case 'blue':
                return '#155dfc'
            default:
                return '#3b82f6'
        }
    })
</script>