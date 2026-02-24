<template>
    <div @click="loadMonthDetail"
        class="mt-3 px-3 py-2 border border-gray-100 rounded-lg shadow-lg cursor-pointer hover:bg-gray-50">
        <div class="relative mt-5 mb-2">
            <hr :class="[isLate ? 'border-b-red-500' : 'border-b-blue-500', 'border-0 border-b-2']">
            <span class="py-1 px-0 rounded-md text-xs absolute  -translate-y-full">
                {{ target }}
            </span>
            <span v-if="isLate" class="absolute right-0 text-xs -translate-y-full py-0.5 px-2 -mt-1 bg-red-600 text-white rounded-sm">Late</span>
        </div>

        <div class="flex gap-2 items-center">
            <span class="font-semibold">Preventative Maintenance</span>
            <span>&bullet;</span>
            <span class="text-xs">{{ monthItem.tasks.length }} tasks</span>
        </div>
        <div class="text-sm flex gap-2 items-center mt-2">
            <span :class="[isLate ? 'bg-red-500' : 'bg-blue-500', 'h-2 w-2 rounded-full']"></span>
            <span>{{ monthItem.assigned }} Congregation</span>
        </div>

        <div class="mt-2 flex items-center gap-2">
            <span :class="[isLate ? ' text-red-600' : 'text-blue-600', 'text-sm font-bold']">
                {{ completedRate }}%
            </span>
            <span class="flex-1">
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div :class="[isLate ? 'bg-red-500' : 'bg-blue-500', 'h-full']"
                        :style="{ width: completedRate + '%' }">
                    </div>
                </div>
            </span>
        </div>

    </div>
</template>

<script setup lang="ts">
    import type { PreventiveResponse } from '@/types/preventive';
    import { usePreventiveStore } from '@/stores/preventive';
    import { useViewsStore } from '@/stores/views';
    import { computed } from 'vue';

    const pm = usePreventiveStore()
    const view = useViewsStore()

    const { monthItem, isLate = false } = defineProps<{
        monthItem: PreventiveResponse
        isLate?: boolean
    }>()

    const target = computed(() => {
        if (!monthItem.target) return ''
        const now = new Date(monthItem.target);
        const monthString = now.toLocaleString('default', { month: 'short', day: 'numeric' });
        return monthString
    })

    const completedRate = computed(() => {
        if (!monthItem) return 0
        const total = monthItem.tasks.length
        const completed = monthItem.tasks.filter(t => t.completed).length
        return Math.round((completed / total) * 100)
    })

    const loadMonthDetail = () => {
        pm.activeMonth = monthItem.month || ''
        view.setView('preventive-monthly')
    }
</script>