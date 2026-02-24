<template>
    <div @click="loadMonthDetail" class="mt-3 px-3 py-2 border border-gray-100 rounded-lg shadow-lg cursor-pointer hover:bg-gray-50">
        <div class="relative mt-5 mb-2">
            <hr class="border-0 border-b-2 border-b-blue-500">
            <span class="py-1 px-0 rounded-md text-xs absolute  -translate-y-full">
                {{ target }}
            </span>
        </div>

        <div class="flex gap-2 items-center">
            <span class="font-semibold">Preventative Maintenance</span>
            <span>&bullet;</span>
            <span class="text-xs">{{ pm.currentMonth?.tasks.length }} tasks</span>
        </div>
        <div class="text-sm flex gap-2 items-center mt-2">
            <span class="h-2 w-2 bg-blue-500 rounded-full"></span>
            <span>{{ pm.currentMonth?.assigned }} Congregation</span>
        </div>

        <div class="mt-2 flex items-center gap-2">
            <span class="text-sm font-bold text-blue-600">
                {{ completedRate }}%
            </span>
            <span class="flex-1">
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500" :style="{ width: completedRate + '%' }"></div>
                </div>
            </span>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { usePreventiveStore } from '@/stores/preventive';
    import { useViewsStore } from '@/stores/views';
    import { computed } from 'vue';

    const pm = usePreventiveStore()
    const view = useViewsStore()

    const target = computed(() => {
        if (!pm.currentMonth?.target) return ''
        const now = new Date(pm.currentMonth.target);
        const monthString = now.toLocaleString('default', { month: 'short', day: 'numeric' });
        return monthString
    })

    const completedRate = computed(() => {
        if (!pm.currentMonth) return 0
        const total = pm.currentMonth.tasks.length
        const completed = pm.currentMonth.tasks.filter(t => t.completed).length
        return Math.round((completed / total) * 100)
    })

    const loadMonthDetail = () => {
        pm.activeMonth = pm.currentMonth?.month || ''
        view.setView('preventive-monthly')
    }
</script>