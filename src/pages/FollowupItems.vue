<template>
    <div class="py-5 bg-gray-100 h-screen overflow-auto pb-30">
        <!-- filter -->
        <FollowupFilters @set-filters="setFilter" :active-filter="filter" :count-all="allPendingCount"
            :count-overdue="followupsStore.overdue.length"
            :count-upcoming="followupsStore.dueSoon.length + followupsStore.dueNextWeeks.length" />


        <!-- <div v-if="followupsStore.fetching">
            <FetchingSpinner />
        </div> -->

        <div class="mt-5 flex flex-col pt-2 px-2 pb-10 bg-gray-100 space-y-4 h-fit">

            <div v-if="(filter == 'overdue' || filter == 'all') && followupsStore.overdue.length > 0" class="space-y-4">
                <div class="px-3 text-sm text-gray-800">Overdue</div>
                <div class="space-y-3 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3">
                    <template v-for="f in followupsStore.overdue" :key="f.task">
                        <FollowupItem :f :stat="'overdue'" />
                    </template>
                </div>
            </div>

            <div v-if="(filter == 'due' || filter == 'all') && followupsStore.dueSoon.length > 0" class="space-y-4">
                <div class="px-3 text-sm text-gray-800">Due soon</div>
                <div class="space-y-3 gap-2 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3">
                    <template v-for="f in followupsStore.dueSoon" :key="f.task">
                        <FollowupItem :f :stat="'due'" />
                    </template>
                </div>
            </div>

            <div v-if="(filter == 'due' || filter == 'all') && followupsStore.dueNextWeeks.length > 0"
                class="space-y-4">
                <div class="px-3 text-sm text-gray-800">Due next week</div>
                <div class="space-y-3 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3">
                    <template v-for="f in followupsStore.dueNextWeeks" :key="f.task">
                        <FollowupItem :f :stat="'due-weeks'" />
                    </template>
                </div>
            </div>

            <div v-if="(filter == 'none' || filter == 'all') && followupsStore.noDue.length > 0" class="space-y-4">
                <div class="px-3 text-sm text-gray-800">No due date</div>
                <div class="space-y-3 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3">
                    <template v-for="f in followupsStore.noDue" :key="f.task">
                        <FollowupItem :f :stat="'none'" />
                    </template>
                </div>
            </div>

            <div v-if="(filter == 'completed') && followupsStore.completed.length > 0" class="space-y-4">

                <template v-for="g in followupsStore.groupedCompleted" :key="g.month">
                    <div class="px-6 flex gap-2 items-center text-xl font-semibold">
                        <div>
                            <CalendarIcon class="h-4 w-4" />
                        </div>
                        <div>
                            {{ g.month }}
                        </div>
                    </div>

                    <div class="space-y-3 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3">

                        <template v-for="f in g.items" :key="f.task">
                            <FollowupItem :f :stat="'completed'" />
                        </template>

                    </div>
                </template>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import type { FollowupListFilter } from '@/types/followups'
    import { useFollowupsStore } from '@/stores/followups'
    import { useViewsStore } from '@/stores/views'
    import { ref, computed, watch } from 'vue'
    import FollowupItem from '@/components/FollowupItem.vue'
    import FollowupFilters from '@/components/FollowupFilters.vue'
    import CalendarIcon from '@/icons/CalendarIcon.vue'

    const followupsStore = useFollowupsStore()
    const filter = ref<FollowupListFilter>('all')
    const view = useViewsStore()

    const setFilter = (f: FollowupListFilter) => {
        filter.value = f
    }

    const allPendingCount = computed(() => {
        return followupsStore.dueSoon.length + followupsStore.dueNextWeeks.length + followupsStore.overdue.length + followupsStore.noDue.length
    })

    watch(
        () => view.autoFilter,
        () => {
            if (view.autoFilter) {
                const f = view.autoFilter as FollowupListFilter
                filter.value = f
            }
        },
        {
            immediate: true
        })
</script>
