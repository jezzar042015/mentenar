<template>
    <div :class="['p-3 shadow-md bg-white space-y-1 border-l-7 rounded-md', sideBorderColor]">
        <div class="text-base">{{ f.task }}</div>
        <div class="flex text-xs space-x-2 items-center">
            <span v-if="stat == 'overdue'" class="flex h-2 w-2 rounded-full bg-red-500"></span>
            <span v-if="stat == 'due'" class="flex h-2 w-2 rounded-full bg-orange-500"></span>
            <span v-if="stat == 'none'" class="flex h-2 w-2 rounded-full bg-gray-500"></span>
            <template v-if="stat === 'overdue'">
                <span>Overdue</span>
                <span>&bullet;</span>
                <span>{{ overdueDisplay }}</span>
            </template>

            <template v-if="stat === 'due'">
                <span>Due </span>
            </template>

            <template v-if="stat === 'none'">
                <span>No due date set</span>
            </template>
        </div>
        <div class="flex items-center space-x-2 text-xs">
            <span>
                <PersonIcon class="-m-0.5 h-3 w-3" />
            </span>
            <span>{{ assignee }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import PersonIcon from '@/icons/PersonIcon.vue';
    import type { FollowupItem, FollowupListFilter } from '@/types/followups';
    import { computed } from 'vue';

    const { f, stat = 'no due' } = defineProps<{
        f: FollowupItem
        stat: FollowupListFilter
    }>()

    const overdueDays = computed(() => {
        if (!f.target) return 0;

        const today = new Date();
        const target = new Date(f.target);

        today.setHours(0, 0, 0, 0);
        target.setHours(0, 0, 0, 0);

        const diffMs = target.getTime() - today.getTime();
        const daysUntil = Math.round(diffMs / (1000 * 60 * 60 * 24));

        return daysUntil < 0 ? Math.abs(daysUntil) : 0;
    });

    const overdueDisplay = computed(()=> {
        if (overdueDays.value <= 0) return null
        if (overdueDays.value == 1) return "Yesterday"
        if (overdueDays.value > 1) return `in ${overdueDays.value} days`
    })

    const sideBorderColor = computed(() => {
        const theme: Record<string, string> = {
            all: "",
            due: "border-l-orange-600",
            overdue: "border-l-red-600",
            none: "border-l-gray-500",
        }

        return theme[stat] ?? ''
    })

    const assignee = computed(() => {
        return f.assignees ? `Assigned to ${f.assignees}` : "Not assigned"
    })
</script>