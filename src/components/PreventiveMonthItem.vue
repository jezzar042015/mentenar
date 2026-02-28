<template>
    <div @click="loadMonth"
        :class="[itemBorder, itemBg, { 'text-white': isThisMonth }, 'p-4 rounded-sm border-l-8 flex justify-between cursor-pointer']">
        <div class="space-y-1 flex-1">
            <div class="flex items-center gap-3">
                <span class="text-xs bg-red-500 p-1 text-white rounded-md" v-if="isLate">Late</span>
                <span>
                    <CalendarIcon class="h-4 w-4" />
                </span>
                <span>{{ m.month }}</span>
            </div>
            <div class="text-xs gap-2 flex items-center">
                <span class="flex h-2 w-2 rounded-full bg-red-500" v-if="isLate"></span>
                <span class="flex h-2 w-2 rounded-full bg-white" v-else-if="isThisMonth"></span>
                <span class="flex h-2 w-2 rounded-full bg-blue-500" v-else></span>
                <span>
                    {{ m.tasks.length }} tasks
                </span>
            </div>
            <div class="text-xs">
                {{ m.assigned }} Congregation
            </div>
        </div>
        <CircularProgress :completed-count="completedTasks.length" :all-count="m.tasks.length" :color="isLate ? 'red' : 'blue'"/>
    </div>
</template>

<script setup lang="ts">
    import type { PreventiveResponse } from '@/types/preventive';
    import { computed } from 'vue';
    import { useViewsStore } from '@/stores/views';
    import { usePreventiveStore } from '@/stores/preventive';
    import CalendarIcon from '@/icons/CalendarIcon.vue';
    import CircularProgress from './CircularProgress.vue';

    const { m } = defineProps<{
        m: PreventiveResponse
    }>()

    const views = useViewsStore()
    const pm = usePreventiveStore()

    const completedTasks = computed(() => {
        return m.tasks.filter(t => t.completed)
    })

    const loadMonth = () => {
        pm.activeMonth = m.month
        views.setView('preventive-monthly')
    }

    const isLate = computed(() => {
        if (completedTasks.value.length === m.tasks.length) {
            return false
        }

        const today = new Date()
        const monthDate = new Date(m.month + '-01')
        monthDate.setFullYear(2026)
        monthDate.setMonth(monthDate.getMonth() + 1)
        monthDate.setDate(0)
        return monthDate <= today
    })

    const isNextMonth = computed(() => {
        const today = new Date()
        const monthDate = new Date(m.month + '-01')
        monthDate.setFullYear(2026)
        return monthDate.getFullYear() === today.getFullYear() && monthDate.getMonth() === today.getMonth() + 1
    })

    const isThisMonth = computed(() => {
        const today = new Date()
        const monthDate = new Date(m.month + '-01')
        monthDate.setFullYear(2026)
        return monthDate.getFullYear() === today.getFullYear() && monthDate.getMonth() === today.getMonth()
    })

    const itemBg = computed(() => {
        if (isThisMonth.value) return 'bg-sky-600 shadow-lg'
        if (isLate.value) return 'bg-red-50 shadow-sm'
        return 'bg-white shadow-sm'
    })

    const itemBorder = computed(() => {
        if (isThisMonth.value) return 'border-sky-700'
        if (isLate.value) return 'border-red-600'
        return 'border-blue-500'
    })
</script>
