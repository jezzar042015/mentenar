<template>
    <div class="py-5">
        <!-- filter -->
        <FollowupFilters @set-filters="setFilter" :active-filter="filter" :count-all="followupsStore.data.length"
            :count-overdue="followupsStore.overdue.length" :count-upcoming="followupsStore.dueSoon.length" />


        <div v-if="followupsStore.fetching">
            <FetchingSpinner />
        </div>

        <div class="mt-5 flex flex-col p-2 bg-white space-y-4" v-else>

            <div v-if="(filter == 'overdue' || filter == 'all') && followupsStore.overdue.length > 0" class="space-y-2">
                <div class="px-3 text-sm text-gray-800">Overdue</div>
                <template v-for="f in followupsStore.overdue" :key="f.task">
                    <FollowupItem :f :stat="'overdue'" />
                </template>
            </div>

            <div v-if="(filter == 'due' || filter == 'all') && followupsStore.dueSoon.length > 0" class="space-y-2">
                <div class="px-3 text-sm text-gray-800">Due soon</div>
                <template v-for="f in followupsStore.dueSoon" :key="f.task">
                    <FollowupItem :f :stat="'due'" />
                </template>
            </div>

            <div v-if="(filter == 'none' || filter == 'all') && followupsStore.noDue.length > 0" class="space-y-2">
                <div class="px-3 text-sm text-gray-800">No due date</div>
                <template v-for="f in followupsStore.noDue" :key="f.task">
                    <FollowupItem :f :stat="'none'" />
                </template>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import type { FollowupListFilter } from '@/types/followups'
    import { useFollowupsStore } from '@/stores/followups'
    import { onMounted, ref } from 'vue'
    import FetchingSpinner from '@/components/FetchingSpinner.vue'
    import FollowupItem from '@/components/FollowupItem.vue'
    import FollowupFilters from '@/components/FollowupFilters.vue'

    const followupsStore = useFollowupsStore()
    const filter = ref<FollowupListFilter>('all')

    const setFilter = (f: FollowupListFilter) => {
        filter.value = f
    }

    onMounted(async () => {
        if (followupsStore.data.length == 0) {
            await followupsStore.pull()
        }
    })
</script>
