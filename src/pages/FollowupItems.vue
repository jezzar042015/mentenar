<template>
    <div class="py-5">

        <div v-if="followupsStore.fetching">
            <FetchingSpinner />
        </div>

        <div class="flex flex-col space-y-2 p-2" v-else>
            <template v-for="f in followupsStore.data" :key="f.task">
                <FollowupItem :f />
            </template>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { useFollowupsStore } from '@/stores/followups'
    import { onMounted } from 'vue'
    import FetchingSpinner from '@/components/FetchingSpinner.vue'
    import FollowupItem from '@/components/FollowupItem.vue'

    const followupsStore = useFollowupsStore()


    onMounted(async () => {
        if (followupsStore.data.length == 0) {
            await followupsStore.pull()
        }
    })
</script>
