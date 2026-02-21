<template>
    <div class="p-3 shadow bg-white space-y-1">
        <div :class="['text-base', isOverdue ? 'text-red-400' : 'text-blue-500']">{{ f.task }}</div>
        <div class="space-x-2 flex items-center">
            <span class="text-xs">{{ dueIn }}</span>
            <!-- <span class="text-sm">{{ dueIn }}</span> -->
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { FollowupItem } from '@/types/followups';
    import { computed } from 'vue';

    const { f } = defineProps<{
        f: FollowupItem
    }>()

    const isOverdue = computed(() => {
        if (f.target) {
            const daysUntil = Math.floor((new Date(f.target).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            return daysUntil <= 0; 
        }
        return false;
    })

    const dueIn = computed(() => {
        if (!f.target) return "No due date";

        const today = new Date();
        const target = new Date(f.target);

        // Normalize both to midnight (local time)
        today.setHours(0, 0, 0, 0);
        target.setHours(0, 0, 0, 0);

        const diffMs = target.getTime() - today.getTime();
        const daysUntil = Math.round(diffMs / (1000 * 60 * 60 * 24));

        if (daysUntil < 0) {
            return `Overdue for ${Math.abs(daysUntil)} days`;
        }

        if (daysUntil === 0) {
            return "Due today";
        }

        return `Due in ${daysUntil} days`;
    });
</script>