<template>
    <div class="p-3 shadow bg-white space-y-1">
        <div class="text-base text-blue-500">{{ f.task }}</div>
        <div class="space-x-2 flex items-center">
            <span class="text-xs">Due&colon;</span>
            <span class="text-sm">{{ f.target }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { FollowupItem } from '@/types/followups';

    const { f } = defineProps<{
        f: FollowupItem
    }>()
</script>