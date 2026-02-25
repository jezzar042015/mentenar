<template>
    <div class="mx-5 py-1 px-1 flex justify-between shadow rounded-2xl text-sm gap-0 bg-white">
        <div @click="setFilter('all')"
            :class="['px-3 py-1 rounded-2xl flex gap-2 items-center cursor-pointer', activeFilter == 'all' ? 'bg-blue-600 text-white ' : '']">
            <span>All</span>
            <span class="text-xs">{{ countAll }}</span>
        </div>

        <div @click="setFilter('overdue')" v-if="countOverdue > 0"
            :class="['px-3 py-1 rounded-2xl flex gap-2 items-center cursor-pointer', activeFilter == 'overdue' ? 'bg-blue-600 text-white ' : '']">
            <span>Overdue</span>
            <span class="text-xs">{{ countOverdue }}</span>
        </div>

        <div @click="setFilter('due')"
            :class="['px-3 py-1 rounded-2xl flex gap-2 items-center cursor-pointer', activeFilter == 'due' ? 'bg-blue-600 text-white ' : '']">
            <span>Upcoming</span>
            <span class="text-xs">{{ countUpcoming }}</span>
        </div>

        <div @click="setFilter('completed')"
            :class="['px-3 py-1 rounded-2xl flex gap-2 items-center cursor-pointer', activeFilter == 'completed' ? 'bg-blue-600 text-white ' : '']">
            <span>Completed</span>
            <span class="text-xs">{{ followups.completed.length }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useFollowupsStore } from '@/stores/followups';
    import type { FollowupListFilter } from '@/types/followups';

    const { countAll,
        countOverdue,
        countUpcoming,
        activeFilter
    } = defineProps<{
        countAll: number,
        countOverdue: number,
        countUpcoming: number,
        activeFilter: FollowupListFilter
    }>()
    const emits = defineEmits(['set-filters'])

    const followups = useFollowupsStore()

    const setFilter = (f: FollowupListFilter) => {
        emits('set-filters', f)
    }
</script>