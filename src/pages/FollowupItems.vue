<template>
    <div class="py-5 bg-gray-100">
        <!-- filter -->
        <FollowupFilters @set-filters="setFilter" :active-filter="filter" :count-all="allPendingCount"
            :count-overdue="followupsStore.overdue.length"
            :count-upcoming="followupsStore.dueSoon.length + followupsStore.dueNextWeeks.length" />


        <div v-if="followupsStore.fetching">
            <FetchingSpinner />
        </div>

        <div class="mt-5 flex flex-col p-2 bg-gray-100 space-y-4" v-else>

            <div v-if="(filter == 'overdue' || filter == 'all') && followupsStore.overdue.length > 0" class="space-y-4">
                <div class="px-3 text-sm text-gray-800">Overdue</div>
                <template v-for="f in followupsStore.overdue" :key="f.task">
                    <FollowupItem :f :stat="'overdue'" />
                </template>
            </div>

            <div v-if="(filter == 'due' || filter == 'all') && followupsStore.dueSoon.length > 0" class="space-y-4">
                <div class="px-3 text-sm text-gray-800">Due soon</div>
                <template v-for="f in followupsStore.dueSoon" :key="f.task">
                    <FollowupItem :f :stat="'due'" />
                </template>
            </div>

            <div v-if="(filter == 'due' || filter == 'all') && followupsStore.dueNextWeeks.length > 0"
                class="space-y-4">
                <div class="px-3 text-sm text-gray-800">Due next week</div>
                <template v-for="f in followupsStore.dueNextWeeks" :key="f.task">
                    <FollowupItem :f :stat="'due-weeks'" />
                </template>
            </div>

            <div v-if="(filter == 'none' || filter == 'all') && followupsStore.noDue.length > 0" class="space-y-4">
                <div class="px-3 text-sm text-gray-800">No due date</div>
                <template v-for="f in followupsStore.noDue" :key="f.task">
                    <FollowupItem :f :stat="'none'" />
                </template>
            </div>

            <div v-if="(filter == 'completed') && followupsStore.completed.length > 0" class="space-y-4">
                <!-- <div class="px-3 text-sm text-gray-800">No due date</div> -->
                <template v-for="f in followupsStore.completed" :key="f.task">
                    <FollowupItem :f :stat="'completed'" />
                </template>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import type { FollowupListFilter } from '@/types/followups'
    import { useFollowupsStore } from '@/stores/followups'
    import { ref, computed } from 'vue'
    import FetchingSpinner from '@/components/FetchingSpinner.vue'
    import FollowupItem from '@/components/FollowupItem.vue'
    import FollowupFilters from '@/components/FollowupFilters.vue'

    const followupsStore = useFollowupsStore()
    const filter = ref<FollowupListFilter>('all')

    const setFilter = (f: FollowupListFilter) => {
        filter.value = f
    }

    const allPendingCount = computed(() => {
        return followupsStore.dueSoon.length + followupsStore.dueNextWeeks.length + followupsStore.overdue.length + followupsStore.noDue.length
    })

</script>
