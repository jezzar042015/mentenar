<template>
    <div @click="loadItemDetail"
        class="bg-white mt-3 px-3 py-2 border border-gray-100 rounded-lg shadow-lg cursor-pointer hover:bg-gray-50">
        <div class="relative mt-5 mb-2">
            <hr class="border-0 border-b-2 border-b-red-500">
            <span class="py-1 px-0 rounded-md text-xs absolute  -translate-y-full">
                {{ dueDisplay }}
            </span>
            <span class="absolute right-0 text-xs -translate-y-full py-1">Follow Up</span>
        </div>

        <div class="flex gap-2 items-center">
            <span class="font-semibold"> {{ item.task }}</span>
        </div>
        <div class="text-sm flex gap-2 items-center mt-2">
            <span class="h-2 w-2 bg-red-500 rounded-full"></span>
            <span>{{ item.assignees || 'Not Assigned' }}</span>
        </div>
        <div class="mt-2 flex items-center gap-2">
            <span class="text-red-600 text-sm font-bold">
                {{ completedRate }}%
            </span>
            <span class="flex-1">
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="bg-red-500 h-full" :style="{ width: completedRate + '%' }">
                    </div>
                </div>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useFollowupsStore } from '@/stores/followups';
    import { useViewsStore } from '@/stores/views';
    import type { FollowupItem } from '@/types/followups';

    const { item } = defineProps<{
        item: FollowupItem
    }>()

    const followup = useFollowupsStore()
    const view = useViewsStore()

    const dueDisplay = computed(() => {
        if (!item) return ''
        if (!item.target) return 'Not Set'
        const d = new Date(item.target)
        if (!d) return ''
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ` • ${d.toLocaleDateString('en-US', { weekday: 'short' })}`
    })

    const loadItemDetail = () => {
        followup.activeTask = item.task
        view.setView('followup-details')
    }

    const completedRate = computed(() => {
        if (!item.list || item.list.length === 0) return 0
        const completedCount = item.list.filter(i => i.completed).length
        return Math.round((completedCount / item.list.length) * 100)
    })
</script>
