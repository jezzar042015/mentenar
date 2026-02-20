<template>
    <div class="">
        <div class="mb-5">
            <h2 class="text-2xl font-semibold">
                Follow Up Items
            </h2>
            <div>KH West Tacloban</div>
        </div>

        <div v-if="followupsStore.fetching">
            <FetchingSpinner />
        </div>

        <div class="flex flex-col space-y-2" v-else>
            <div v-for="f in followupsStore.data" class="p-3 shadow bg-white space-y-1">
                <div class="text-lg text-red-800">{{ f.task }}</div>
                <div class="text-xs">{{ f.remarks }}</div>
                <div class="text-sm">{{ f.assignees }}</div>
                <div class="space-x-2 flex items-center">
                    <span class="text-xs">Due&colon;</span>
                    <span class="text-sm">{{ f.target }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { useFollowupsStore } from '@/stores/followups'
    import { onMounted } from 'vue'
    import FetchingSpinner from '@/components/FetchingSpinner.vue'

    const followupsStore = useFollowupsStore()


    onMounted(async () => {
        await followupsStore.pull()
    })
</script>
