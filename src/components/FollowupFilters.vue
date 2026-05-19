<template>
    <div class="mx-5 py-1 px-1 flex justify-between md:justify-start shadow rounded-2xl text-sm gap-0 md:gap-4 bg-white">
        <div @click="setFilter('all')"
            :class="['px-3 py-1 rounded-2xl flex gap-2 items-center cursor-pointer', activeFilter == 'all' ? 'bg-amber-400 text-white ' : '']">
            <span>All</span>
            <span class="text-xs px-1 rounded-sm " :class="activeFilter == 'all' ? 'bg-amber-500': 'bg-amber-100 text-black'">{{ countAll }}</span>
        </div>

        <div @click="setFilter('overdue')" v-if="countOverdue > 0"
            :class="['px-3 py-1 rounded-2xl flex gap-2 items-center cursor-pointer', activeFilter == 'overdue' ? 'bg-amber-400 text-white ' : '']">
            <span>Overdue</span>
            <span class="text-xs px-1 rounded-sm " :class="activeFilter == 'overdue' ? 'bg-amber-500': 'bg-amber-100 text-black'">{{ countOverdue }}</span>
        </div>

        <div @click="setFilter('due')"
            :class="['px-3 py-1 rounded-2xl flex gap-2 items-center cursor-pointer', activeFilter == 'due' ? 'bg-amber-400 text-white ' : '']">
            <span>Upcoming</span>
            <span class="text-xs px-1 rounded-sm " :class="activeFilter == 'due' ? 'bg-amber-500': 'bg-amber-100 text-black'">{{ countUpcoming }}</span>
        </div>

        <div @click="setFilter('completed')" v-if="countOverdue == 0"
            :class="['px-3 py-1 rounded-2xl flex gap-2 items-center cursor-pointer', activeFilter == 'completed' ? 'bg-amber-400 text-white ' : '']">
            <span>Completed</span>
            <span class="text-xs px-1 rounded-sm " :class="activeFilter == 'completed' ? 'bg-amber-500': 'bg-amber-100 text-black'">{{ followups.completed.length }}</span>
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
    
    const emits = defineEmits<{
        (e: 'set-filters', f: FollowupListFilter): void
    }>()


    const followups = useFollowupsStore()

    const setFilter = (f: FollowupListFilter) => {
        emits('set-filters', f)
    }
</script>