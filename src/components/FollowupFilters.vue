<template>
    <div class="mx-5 py-1 px-1 flex justify-between shadow rounded-2xl text-sm gap-0">
        <div @click="setFilter('all')"
            :class="['px-3 py-1 rounded-2xl flex gap-2 items-center cursor-pointer', activeFilter == 'all' ? 'bg-blue-600 text-white ' : '']">
            <span>All</span>
            <span class="text-xs">{{ countAll }}</span>
        </div>

        <div @click="setFilter('overdue')"
            :class="['px-3 py-1 rounded-2xl flex gap-2 items-center cursor-pointer', activeFilter == 'overdue' ? 'bg-blue-600 text-white ' : '']">
            <span>Overdue</span>
            <span class="text-xs">{{ countOverdue }}</span>
        </div>

        <div @click="setFilter('due')"
            :class="['px-3 py-1 rounded-2xl flex gap-2 items-center cursor-pointer', activeFilter == 'due' ? 'bg-blue-600 text-white ' : '']">
            <span>Upcoming</span>
            <span class="text-xs">{{ countUpcoming }}</span>
        </div>
        <!-- <span class="bg-red-600 text-white px-3 rounded-2xl">No Due</span> -->
    </div>
</template>

<script setup lang="ts">
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

    const setFilter = (f: FollowupListFilter) => {
        emits('set-filters', f)
    }
</script>