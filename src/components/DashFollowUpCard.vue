<template>
    <div @click="loadItemDetail" class="mt-3 px-3 py-2 border border-gray-100 rounded-lg shadow-md">
        <div class="relative mt-5 mb-2">
            <hr class="border-0 border-b-2 border-b-red-500">
            <span class="py-1 px-0 rounded-md text-xs absolute  -translate-y-full">
                Feb 25
            </span>
            <span class="absolute right-0 text-xs -translate-y-full py-1">Follow Up</span>
        </div>

        <div class="flex gap-2 items-center">
            <span class="font-semibold"> {{ item.task }}</span>
        </div>
        <div class="text-sm flex gap-2 items-center mt-2">
            <span class="h-2 w-2 bg-red-500 rounded-full"></span>
            <span>{{ item.assignees }}</span>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { useFollowupsStore } from '@/stores/followups';
    import { useViewsStore } from '@/stores/views';
    import type { FollowupItem } from '@/types/followups';

    const { item } = defineProps<{
        item: FollowupItem
    }>()

    const followup = useFollowupsStore()
    const view = useViewsStore()

    const loadItemDetail = () => {
        followup.activeTask = item.task
        view.setView('followup-details')
    }
</script>
