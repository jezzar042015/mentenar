<template>
    <div :class="['p-3 shadow-md bg-white space-y-1 border-l-7 rounded-md', sideBorderColor]">
        <div class="text-base">{{ f.task }}</div>
        <div class="flex text-xs space-x-2 items-center">
            <span v-if="stat == 'overdue'" class="flex h-2 w-2 rounded-full bg-red-500"></span>
            <span v-if="stat == 'due'" class="flex h-2 w-2 rounded-full bg-orange-500"></span>

            <template v-if="stat === 'overdue'">
                <span>Overdue</span>
                <span>&bullet;</span>
                <span>{{ overdaysDays }} day{{ overdaysDays > 1 ? 's' : '' }}</span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { FollowupItem, FollowupListFilter } from '@/types/followups';
    import { computed } from 'vue';

    const { f, stat = 'no due' } = defineProps<{
        f: FollowupItem
        stat: FollowupListFilter
    }>()

    const isOverdue = computed(() => {
        if (f.target) {
            const daysUntil = Math.floor((new Date(f.target).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            return daysUntil <= 0;
        }
        return false;
    })

    const overdaysDays = computed(() => {
        if (!f.target) return 0;

        const today = new Date();
        const target = new Date(f.target);

        today.setHours(0, 0, 0, 0);
        target.setHours(0, 0, 0, 0);

        const diffMs = target.getTime() - today.getTime();
        const daysUntil = Math.round(diffMs / (1000 * 60 * 60 * 24));

        return daysUntil < 0 ? Math.abs(daysUntil) : 0;
    });

    const sideBorderColor = computed(() => {
        const theme: Record<string, string> = {
            all: "",
            due: "border-l-orange-600",
            overdue: "border-l-red-600",
            none: "",
        }

        return theme[stat] ?? ''
    })
</script>